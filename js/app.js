/* ============================================
   MYGrocery - Shared Application Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    seedDemoAccount();
    initNavigation();
    initContactForm();
});

/* ---------- Seed Demo Account ---------- */
function seedDemoAccount() {
    try {
        var users = MYG.getUsers();
        var exists = users.find(function(u) { return u.email === 'jacksuoc@gmail.com'; });
        if (!exists) {
            users.push({
                id: 'user-demo-001',
                name: 'Jacks',
                username: 'jacks',
                email: 'jacksuoc@gmail.com',
                age: 24,
                password: 'admin12345',
                joinedAt: new Date().toISOString()
            });
            MYG.saveUsers(users);
        }
    } catch(e) {}
}

/* ---------- Mobile Navigation ---------- */
function initNavigation() {
    var hamburger = document.querySelector('.hamburger');
    var nav = document.querySelector('.main-nav');
    if (!hamburger || !nav) return;
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
        });
    });
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
        }
    });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearContactErrors();
        var valid = validateContactForm();
        if (valid) {
            var successMsg = document.getElementById('form-success');
            if (successMsg) { successMsg.classList.add('show'); }
            form.reset();
            setTimeout(function() {
                if (successMsg) { successMsg.classList.remove('show'); }
            }, 5000);
        }
    });
}

function validateContactForm() {
    var valid = true;
    var name = document.getElementById('contact-name');
    var email = document.getElementById('contact-email');
    var subject = document.getElementById('contact-subject');
    var message = document.getElementById('contact-message');
    if (name && !name.value.trim()) {
        showFieldError('name-error', 'Please enter your name.');
        valid = false;
    }
    if (email && !email.value.trim()) {
        showFieldError('email-error', 'Please enter your email address.');
        valid = false;
    } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showFieldError('email-error', 'Please enter a valid email address.');
        valid = false;
    }
    if (subject && !subject.value.trim()) {
        showFieldError('subject-error', 'Please enter a subject.');
        valid = false;
    }
    if (message && !message.value.trim()) {
        showFieldError('message-error', 'Please enter your message.');
        valid = false;
    } else if (message && message.value.trim().length < 10) {
        showFieldError('message-error', 'Message must be at least 10 characters.');
        valid = false;
    }
    return valid;
}

function showFieldError(id, msg) {
    var el = document.getElementById(id);
    if (el) {
        el.textContent = msg;
        el.classList.add('show');
    }
}

function clearContactErrors() {
    document.querySelectorAll('.field-error').forEach(function(el) {
        el.classList.remove('show');
        el.textContent = '';
    });
    var successMsg = document.getElementById('form-success');
    if (successMsg) successMsg.classList.remove('show');
}
