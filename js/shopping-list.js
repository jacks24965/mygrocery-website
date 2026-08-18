/* ============================================
   MYGrocery - Shared Shopping List Module
   Uses localStorage for cross-page persistence
   Per-user data scoping
   ============================================ */

var MYG = MYG || {};

/* ---------- Auth (Front-end Demo) ---------- */
MYG.USERS_KEY = "mygrocery_users";
MYG.SESSION_KEY = "mygrocery_session";

MYG.getUsers = function() {
    try { var r = localStorage.getItem(MYG.USERS_KEY); return r ? JSON.parse(r) : []; } catch(e) { return []; }
};

MYG.saveUsers = function(users) {
    try { localStorage.setItem(MYG.USERS_KEY, JSON.stringify(users)); } catch(e) {}
};

MYG.getSession = function() {
    try { var r = localStorage.getItem(MYG.SESSION_KEY); return r ? JSON.parse(r) : null; } catch(e) { return null; }
};

MYG.setSession = function(data) {
    try { localStorage.setItem(MYG.SESSION_KEY, JSON.stringify(data)); } catch(e) {}
};

MYG.clearSession = function() {
    try { localStorage.removeItem(MYG.SESSION_KEY); } catch(e) {}
};

/* ---------- Per-User Storage Keys ---------- */
MYG.getListKey = function() {
    var session = MYG.getSession();
    var userId = (session && session.loggedIn && session.userId) ? session.userId : 'default';
    return 'mygrocery_current_list_' + userId;
};

MYG.getArchiveKey = function() {
    var session = MYG.getSession();
    var userId = (session && session.loggedIn && session.userId) ? session.userId : 'default';
    return 'mygrocery_archives_' + userId;
};

/* ---------- Shopping List CRUD ---------- */

MYG.getShoppingList = function() {
    try {
        var raw = localStorage.getItem(MYG.getListKey());
        if (!raw) return [];
        var parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(function(item) {
            return item && typeof item.name === 'string' && item.name.trim() !== '' &&
                   typeof item.price === 'number' && !isNaN(item.price) &&
                   typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0;
        });
    } catch (e) { return []; }
};

MYG.saveShoppingList = function(list) {
    try { localStorage.setItem(MYG.getListKey(), JSON.stringify(list)); } catch (e) {}
};

MYG.addToShoppingList = function(item) {
    var list = MYG.getShoppingList();
    if (!item || !item.name || typeof item.quantity !== 'number') return list;

    var existing = null;
    if (item.id) existing = list.find(function(i) { return i.id === item.id; });
    if (!existing) existing = list.find(function(i) { return i.name.toLowerCase() === item.name.toLowerCase(); });

    if (existing) {
        existing.quantity += item.quantity;
        if (item.pricePerUnit) existing.pricePerUnit = item.pricePerUnit;
        if (item.baseUnit) existing.baseUnit = item.baseUnit;
        existing.price = Math.round(item.price * 100) / 100;
    } else {
        var newItem = {
            id: item.id || ('manual-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5)),
            name: item.name,
            price: Math.round(item.price * 100) / 100,
            pricePerUnit: item.pricePerUnit || item.price,
            unit: item.unit || '',
            baseUnit: item.baseUnit || 'pcs',
            category: item.category || 'Other',
            quantity: item.quantity,
            quantityType: item.quantityType || 'item',
            taxRate: typeof item.taxRate === 'number' && !isNaN(item.taxRate) && item.taxRate >= 0 ? item.taxRate : 0,
            discount: typeof item.discount === 'number' && !isNaN(item.discount) && item.discount >= 0 ? item.discount : 0
        };
        if (item.quantityType === 'egg-package') {
            newItem.purchaseType = item.purchaseType || 'single';
            newItem.purchaseMultiplier = item.purchaseMultiplier || 1;
        }
        if (item.quantityType === 'size-qty') {
            newItem.selectedSize = item.selectedSize || '1L';
            newItem.sizeMultiplier = item.sizeMultiplier || 1.0;
        }
        if (item.quantityType === 'fixed-package') {
            newItem.packageSize = item.packageSize || 1;
            newItem.packageUnit = item.packageUnit || 'pcs';
        }
        list.push(newItem);
    }
    MYG.saveShoppingList(list);
    return list;
};

MYG.removeFromShoppingList = function(id) {
    var list = MYG.getShoppingList().filter(function(i) { return i.id !== id; });
    MYG.saveShoppingList(list);
    return list;
};

MYG.updateQuantity = function(id, quantity) {
    var list = MYG.getShoppingList();
    if (quantity <= 0) {
        list = list.filter(function(i) { return i.id !== id; });
    } else {
        var item = list.find(function(i) { return i.id === id; });
        if (item) {
            item.quantity = quantity;
            if (item.baseUnit === 'kg') {
                item.price = Math.round(item.pricePerUnit * quantity * 100) / 100;
            } else if (item.quantityType === 'egg-package') {
                var mult = item.purchaseMultiplier || 1;
                item.price = Math.round(item.pricePerUnit * quantity * mult * 100) / 100;
            } else if (item.quantityType === 'size-qty') {
                var sm = item.sizeMultiplier || 1.0;
                item.price = Math.round(item.pricePerUnit * sm * quantity * 100) / 100;
            } else {
                item.price = Math.round(item.pricePerUnit * quantity * 100) / 100;
            }
        }
    }
    MYG.saveShoppingList(list);
    return list;
};

MYG.updateItemField = function(id, field, value) {
    var list = MYG.getShoppingList();
    var item = list.find(function(i) { return i.id === id; });
    if (item) {
        item[field] = value;
        if (field === 'purchaseType' || field === 'selectedSize') {
            var product = null;
            if (typeof PRODUCT_CATALOG !== 'undefined') {
                product = PRODUCT_CATALOG.find(function(p) { return p.id == id; });
            }
            if (product && product.quantityType === 'egg-package') {
                item.purchaseMultiplier = value === 'Case (15)' ? 15 : 1;
                item.price = Math.round(item.pricePerUnit * item.quantity * item.purchaseMultiplier * 100) / 100;
            } else if (product && product.quantityType === 'size-qty') {
                item.sizeMultiplier = product.sizeMultipliers ? (product.sizeMultipliers[value] || 1.0) : 1.0;
                item.price = Math.round(item.pricePerUnit * item.sizeMultiplier * item.quantity * 100) / 100;
            }
        }
    }
    MYG.saveShoppingList(list);
    return list;
};

MYG.clearShoppingList = function() {
    MYG.saveShoppingList([]);
};

MYG.getShoppingListCount = function() {
    var count = 0;
    MYG.getShoppingList().forEach(function(item) { count += item.quantity; });
    return count;
};

/* ---------- Calculation Helpers ---------- */

MYG.calculateItemLineTotal = function(item) {
    var p = parseFloat(item.pricePerUnit) || parseFloat(item.price) || 0;
    var q = parseFloat(item.quantity) || 0;
    var gross = p * q;
    if (item.quantityType === 'egg-package' && item.purchaseMultiplier) {
        gross = p * q * item.purchaseMultiplier;
    }
    if (item.quantityType === 'size-qty' && item.sizeMultiplier) {
        gross = p * item.sizeMultiplier * q;
    }
    if (item.baseUnit === 'kg') {
        gross = p * q;
    }
    // No item-level discount applied
    return Math.round(gross * 100) / 100;
};

MYG.calculateSubtotal = function(list) {
    if (!list || !list.length) return 0;
    var subtotal = 0;
    list.forEach(function(item) { subtotal += MYG.calculateItemLineTotal(item); });
    return Math.round(subtotal * 100) / 100;
};

MYG.calculateTotalDiscount = function(list) {
    if (!list || !list.length) return 0;
    var total = 0;
    list.forEach(function(item) {
        var gross = MYG.calculateItemLineTotal(item);
        var disc = parseFloat(item.discount) || 0;
        if (disc > 0) {
            total += gross * (disc / (100 - disc));
        }
    });
    return Math.round(total * 100) / 100;
};

MYG.calculateTax = function(subtotal, taxRate) {
    var s = parseFloat(subtotal), t = parseFloat(taxRate);
    if (isNaN(s) || isNaN(t) || s < 0 || t < 0) return 0;
    return Math.round(s * (t / 100) * 100) / 100;
};

MYG.calculateTotal = function(subtotal, taxAmount) {
    var s = parseFloat(subtotal) || 0, t = parseFloat(taxAmount) || 0;
    return Math.round((s + t) * 100) / 100;
};

/* ---------- Saved Calculations CRUD ---------- */

MYG.getSavedCalculations = function() {
    try {
        var raw = localStorage.getItem(MYG.getArchiveKey());
        if (!raw) return [];
        var parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
};

MYG.saveCalculation = function(calc) {
    var calcs = MYG.getSavedCalculations();
    calcs.unshift(calc);
    try { localStorage.setItem(MYG.getArchiveKey(), JSON.stringify(calcs)); } catch (e) {}
    return calcs;
};

MYG.deleteCalculation = function(id) {
    var calcs = MYG.getSavedCalculations().filter(function(c) { return c.id !== id; });
    try { localStorage.setItem(MYG.getArchiveKey(), JSON.stringify(calcs)); } catch (e) {}
    return calcs;
};

MYG.clearAllCalculations = function() {
    try { localStorage.setItem(MYG.getArchiveKey(), JSON.stringify([])); } catch (e) {}
};

MYG.createCalcEntry = function(items, globalDiscount, globalTaxRate) {
    var grossTotal = 0;
    items.forEach(function(item) {
        var lineGross = item.pricePerUnit * item.quantity;
        if (item.quantityType === 'egg-package' && item.purchaseMultiplier) {
            lineGross = item.pricePerUnit * item.quantity * item.purchaseMultiplier;
        }
        if (item.quantityType === 'size-qty' && item.sizeMultiplier) {
            lineGross = item.pricePerUnit * item.sizeMultiplier * item.quantity;
        }
        if (item.baseUnit === 'kg') {
            lineGross = item.pricePerUnit * item.quantity;
        }
        grossTotal += lineGross;
    });
    grossTotal = Math.round(grossTotal * 100) / 100;

    var gd = parseFloat(globalDiscount) || 0;
    var globalDiscountAmt = Math.round(grossTotal * (gd / 100) * 100) / 100;
    var afterGlobalDiscount = Math.round((grossTotal - globalDiscountAmt) * 100) / 100;
    var gt = parseFloat(globalTaxRate) || 0;
    var taxAmount = Math.round(afterGlobalDiscount * (gt / 100) * 100) / 100;
    var total = Math.round((afterGlobalDiscount + taxAmount) * 100) / 100;

    var now = new Date();
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    return {
        id: now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + '-' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0') + String(now.getSeconds()).padStart(2,'0'),
        month: months[now.getMonth()] + ' ' + now.getFullYear(),
        createdAt: now.toISOString(),
        items: items.map(function(item) {
            return {
                name: item.name,
                pricePerUnit: parseFloat(item.pricePerUnit) || parseFloat(item.price) || 0,
                quantity: item.quantity,
                unit: item.unit || '',
                baseUnit: item.baseUnit || 'pcs',
                quantityType: item.quantityType || 'item',
                taxRate: item.taxRate || 0,
                discount: 0,
                lineTotal: MYG.calculateItemLineTotal(item),
                purchaseType: item.purchaseType || null,
                purchaseMultiplier: item.purchaseMultiplier || null,
                selectedSize: item.selectedSize || null,
                sizeMultiplier: item.sizeMultiplier || null,
                packageSize: item.packageSize || null,
                packageUnit: item.packageUnit || null
            };
        }),
        grossTotal: grossTotal,
        itemDiscount: 0,
        globalDiscount: globalDiscountAmt,
        totalDiscount: globalDiscountAmt,
        taxRate: gt,
        taxAmount: taxAmount,
        total: total
    };
};

/* ---------- Utility ---------- */

MYG.escapeHtml = function(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(String(text)));
    return div.innerHTML;
};

MYG.formatDate = function(isoString) {
    var d = new Date(isoString);
    return d.toLocaleDateString('en-MY', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

/* ---------- Navigation Helper ---------- */
MYG.renderNav = function(activePage) {
    var session = MYG.getSession();
    var isLoggedIn = session && session.loggedIn;

    // Main navigation links
    var mainLinks = '';
    mainLinks += '<li><a href="index.html" class="nav-link' + (activePage === 'home' ? ' active' : '') + '">&#127968; Home</a></li>';
    mainLinks += '<li><a href="list.html" class="nav-link' + (activePage === 'list' ? ' active' : '') + '">&#128722; Grocery List</a></li>';
    mainLinks += '<li><a href="calculator.html" class="nav-link' + (activePage === 'calculator' ? ' active' : '') + '">&#129518; Calculator</a></li>';
    mainLinks += '<li><a href="saved.html" class="nav-link' + (activePage === 'saved' ? ' active' : '') + '">&#128194; Saved</a></li>';
    mainLinks += '<li><a href="about.html" class="nav-link' + (activePage === 'about' ? ' active' : '') + '">&#128218; About</a></li>';
    mainLinks += '<li><a href="contact.html" class="nav-link' + (activePage === 'contact' ? ' active' : '') + '">&#128231; Contact</a></li>';

    // User links (right side)
    var userLinks = '';
    if (isLoggedIn) {
        userLinks += '<li><a href="profile.html" class="nav-link nav-user-link' + (activePage === 'profile' ? ' active' : '') + '">&#128100; Profile</a></li>';
        userLinks += '<li><a href="#" class="nav-link nav-logout-link" id="nav-logout">&#128682; Logout</a></li>';
    } else {
        userLinks += '<li><a href="login.html" class="nav-link nav-user-link' + (activePage === 'login' ? ' active' : '') + '">&#128274; Login</a></li>';
    }

    var mainNavLists = document.querySelectorAll('.nav-main-links');
    for (var i = 0; i < mainNavLists.length; i++) { mainNavLists[i].innerHTML = mainLinks; }

    var userNavLists = document.querySelectorAll('.nav-user-links');
    for (var j = 0; j < userNavLists.length; j++) { userNavLists[j].innerHTML = userLinks; }

    var logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            MYG.clearSession();
            window.location.href = 'index.html';
        });
    }
};


