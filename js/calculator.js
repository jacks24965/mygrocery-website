/* ============================================
   MYGrocery - Calculator Page Logic
   Uses shared MYG shopping-list module
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    MYG.renderNav('calculator');
    var addItemBtn = document.getElementById('btn-add-item');
    var calcBtn = document.getElementById('btn-calculate');
    var resetBtn = document.getElementById('btn-reset');
    var saveBtn = document.getElementById('btn-save-calc');

    if (addItemBtn) addItemBtn.addEventListener('click', addItem);
    if (calcBtn) calcBtn.addEventListener('click', calculateTotal);
    if (resetBtn) resetBtn.addEventListener('click', resetCalculator);
    if (saveBtn) saveBtn.addEventListener('click', saveCalculation);

    ['calc-item-name', 'calc-price', 'calc-quantity'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter') addItem(); });
    });

    window.addEventListener('storage', function() { renderTable(); });
    renderTable();
});

function addItem() {
    var nameEl = document.getElementById('calc-item-name');
    var priceEl = document.getElementById('calc-price');
    var qtyEl = document.getElementById('calc-quantity');
    var taxEl = document.getElementById('calc-item-tax');
    var unitTypeEl = document.getElementById('calc-unit-type');

    var name = nameEl.value.trim();
    var price = parseFloat(priceEl.value);
    var qtyStr = qtyEl.value.trim();
    var taxRate = parseFloat(taxEl ? taxEl.value : 0) || 0;
    var unitType = unitTypeEl ? unitTypeEl.value : 'pcs';
    var errorDiv = document.getElementById('calc-error');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');

    try {
        if (!name) throw new Error('Item name is required.');
        if (isNaN(price) || price <= 0) throw new Error('Please enter a valid price greater than RM0.');
        if (!qtyStr) throw new Error('Quantity is required.');
        var quantity = parseFloat(qtyStr);
        if (isNaN(quantity) || quantity <= 0) throw new Error('Quantity must be a positive number.');
        if (unitType === 'pcs' && quantity !== Math.floor(quantity)) throw new Error('Quantity for piece items must be a whole number (no decimals).');
        if (taxRate < 0 || taxRate > 100) throw new Error('Item tax rate must be between 0% and 100%.');

        var pricePerUnit = price;
        var totalPrice = unitType === 'kg' ? Math.round(price * quantity * 100) / 100 : price * quantity;
        var unitLabel = unitType === 'kg' ? formatWeight(quantity, 'kg') : quantity + ' pcs';

        MYG.addToShoppingList({
            name: name,
            price: totalPrice,
            pricePerUnit: pricePerUnit,
            unit: unitLabel,
            baseUnit: unitType,
            category: 'Manual',
            quantity: quantity,
            quantityType: 'item',
            taxRate: taxRate
        });
        renderTable();
        nameEl.value = '';
        priceEl.value = '';
        qtyEl.value = '';
        if (taxEl) taxEl.value = '0';
        nameEl.focus();
    } catch (error) {
        showError('calc-error', error.message);
    }
}

function removeItem(id) {
    MYG.removeFromShoppingList(id);
    renderTable();
    var resultDiv = document.getElementById('calc-result');
    if (resultDiv) resultDiv.innerHTML = '';
}

function changeItemQty(id, delta) {
    var list = MYG.getShoppingList();
    var item = list.find(function(i) { return i.id === id; });
    if (!item) return;
    var step = item.baseUnit === 'kg' ? 0.5 : 1;
    var newQty = Math.round((item.quantity + delta * step) * 100) / 100;
    if (item.quantityType === 'fixed-package') {
        newQty = Math.round(item.quantity + delta);
    }
    if (newQty < (item.baseUnit === 'kg' ? 0.01 : 1)) newQty = item.baseUnit === 'kg' ? 0.01 : 1;
    MYG.updateQuantity(id, newQty);
    renderTable();
}

function updateItemQtyFromInput(id, value) {
    var list = MYG.getShoppingList();
    var item = list.find(function(i) { return i.id === id; });
    var newVal = parseFloat(value);
    if (isNaN(newVal) || newVal <= 0) return;
    if (item && item.quantityType === 'fixed-package') {
        newVal = Math.round(newVal);
        if (newVal < 1) newVal = 1;
    }
    newVal = Math.round(newVal * 100) / 100;
    MYG.updateQuantity(id, newVal);
    renderTable();
}

function renderTable() {
    var list = MYG.getShoppingList();
    var tbody = document.getElementById('calc-tbody');
    var tableWrap = document.getElementById('calc-table-wrap');
    var emptyState = document.getElementById('calc-empty');

    if (list.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (tableWrap) tableWrap.style.display = 'none';
        return;
    }
    if (emptyState) emptyState.style.display = 'none';
    if (tableWrap) tableWrap.style.display = 'block';

    tbody.innerHTML = '';
    list.forEach(function(item) {
        var tr = document.createElement('tr');
        var lineTotal = MYG.calculateItemLineTotal(item);
        tr.innerHTML =
            '<td data-label=\"Item\"><strong>' + MYG.escapeHtml(item.name) + '</strong></td>' +
            '<td data-label=\"Unit\">' + MYG.escapeHtml(item.unit || '') + '</td>' +
            '<td data-label=\"Price/Unit\">' + formatPrice(parseFloat(item.pricePerUnit) || parseFloat(item.price) || 0) + '</td>' +
            '<td data-label=\"Qty\"><input type=\"number\" class=\"qty-input\" data-id=\"' + item.id + '\" value=\"' + item.quantity + '\" step=\"' + (item.baseUnit === 'kg' ? 'any' : '1') + '\" min=\"' + (item.baseUnit === 'kg' ? '0.01' : '1') + '\" style=\"width:60px;padding:0.3rem;border:1px solid var(--border);border-radius:4px;text-align:center;\"></td>' +
            '<td data-label=\"Tax\">' + (parseFloat(item.taxRate) || 0) + '%</td>' +
            '<td data-label=\"Line Total\"><strong>' + formatPrice(lineTotal) + '</strong></td>' +
            '<td data-label=\"Action\"><button class=\"btn btn-danger btn-sm\" onclick=\"removeItem(\'' + item.id + '\')\">Remove</button></td>';
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.qty-input').forEach(function(input) {
        input.addEventListener('change', function() { updateItemQtyFromInput(this.getAttribute('data-id'), this.value); });
    });
}

function calculateTotal() {
    var list = MYG.getShoppingList();
    var resultDiv = document.getElementById('calc-result');
    var errorDiv = document.getElementById('calc-error');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');

    try {
        if (list.length === 0) throw new Error('No items to calculate. Add items first.');

        var taxRateEl = document.getElementById('calc-tax-rate');
        var discRateEl = document.getElementById('calc-global-discount');

        var globalTaxRate = parseFloat(taxRateEl ? taxRateEl.value : 6) || 0;
        if (globalTaxRate < 0) throw new Error('Sales tax rate must be 0% or higher.');

        var globalDiscount = parseFloat(discRateEl ? discRateEl.value : 0) || 0;
        if (globalDiscount < 0 || globalDiscount > 100) throw new Error('Global discount must be between 0% and 100%.');

        var grossTotal = 0;
        list.forEach(function(item) {
            var gross = MYG.calculateItemLineTotal(item);
            grossTotal += gross;
        });
        grossTotal = Math.round(grossTotal * 100) / 100;

        var globalDiscountAmt = Math.round(grossTotal * (globalDiscount / 100) * 100) / 100;
        var afterGlobalDiscount = Math.round((grossTotal - globalDiscountAmt) * 100) / 100;
        var taxAmount = Math.round(afterGlobalDiscount * (globalTaxRate / 100) * 100) / 100;
        var total = Math.round((afterGlobalDiscount + taxAmount) * 100) / 100;

        var html = '<div class=\"results-card\"><h3>Calculation Summary</h3>';
        html += '<div class=\"results-row\"><span>Subtotal</span><span>' + formatPrice(grossTotal) + '</span></div>';
        if (globalDiscountAmt > 0) html += '<div class=\"results-row\" style=\"color:#dc3545;\"><span>Global Discount (' + globalDiscount + '%)</span><span>- ' + formatPrice(globalDiscountAmt) + '</span></div>';
        html += '<div class=\"results-row subtotal\"><span>Subtotal (after discount)</span><span>' + formatPrice(afterGlobalDiscount) + '</span></div>';
        html += '<div class=\"results-row\"><span>Sales Tax (' + globalTaxRate + '%)</span><span>' + formatPrice(taxAmount) + '</span></div>';
        html += '<div class=\"results-row total\"><span>Final Total</span><span>' + formatPrice(total) + '</span></div>';
        html += '</div>';
        if (resultDiv) resultDiv.innerHTML = html;
    } catch (error) {
        showError('calc-error', error.message);
    }
}

function resetCalculator() {
    MYG.clearShoppingList();
    var fields = ['calc-item-name', 'calc-price', 'calc-quantity', 'calc-item-tax'];
    fields.forEach(function(id) { var el = document.getElementById(id); if (el) el.value = (id.indexOf('tax') > -1) ? '0' : ''; });
    var taxEl = document.getElementById('calc-tax-rate'); if (taxEl) taxEl.value = '6';
    var discEl = document.getElementById('calc-global-discount'); if (discEl) discEl.value = '0';
    var resultDiv = document.getElementById('calc-result'); if (resultDiv) resultDiv.innerHTML = '';
    hideError('calc-error');
    renderTable();
}

function saveCalculation() {
    var list = MYG.getShoppingList();
    var errorDiv = document.getElementById('calc-error');
    var successDiv = document.getElementById('calc-success');
    errorDiv.textContent = ''; errorDiv.classList.remove('show');
    if (successDiv) { successDiv.classList.remove('show'); successDiv.textContent = ''; }
    try {
        if (list.length === 0) throw new Error('Cannot save an empty shopping list. Add items first.');
        var taxRate = parseFloat(document.getElementById('calc-tax-rate').value) || 0;
        var globalDiscount = parseFloat(document.getElementById('calc-global-discount').value) || 0;
        var entry = MYG.createCalcEntry(list, globalDiscount, taxRate);
        MYG.saveCalculation(entry);
        if (successDiv) {
            successDiv.textContent = 'Calculation saved successfully! View it in Saved Calculations.';
            successDiv.classList.add('show');
            setTimeout(function() { successDiv.classList.remove('show'); }, 5000);
        }
    } catch (error) { showError('calc-error', error.message); }
}

function showError(id, msg) { var el = document.getElementById(id); if (el) { el.textContent = msg; el.classList.add('show'); } }
function hideError(id) { var el = document.getElementById(id); if (el) { el.textContent = ''; el.classList.remove('show'); } }