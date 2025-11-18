// AXA Portal Demo JavaScript

// DOM Elements
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const logoutBtns = document.querySelectorAll('#logout-btn');
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Login functionality
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (username === 'demo' && password === 'demo123') {
            // Store login state in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            
            // Hide error message after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // If not on login page and not logged in, redirect to login
    if (!window.location.pathname.includes('index.html') && isLoggedIn !== 'true') {
        window.location.href = 'index.html';
    }
    
    // If on login page and already logged in, redirect to dashboard
    if (window.location.pathname.includes('index.html') && isLoggedIn === 'true') {
        window.location.href = 'dashboard.html';
    }
}

// Logout functionality
logoutBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        // Redirect to login page
        window.location.href = 'index.html';
    });
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Initialize user data
function initializeUserData() {
    const username = localStorage.getItem('username') || 'demo';
    
    // Update user name in all pages
    const userNames = document.querySelectorAll('#user-name, #header-user-name, #welcome-user-name, #profile-name, #profile-fullname');
    userNames.forEach(element => {
        if (element) {
            element.textContent = 'Demo User';
        }
    });
    
    // Update profile data
    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) profileEmail.textContent = 'demo.user@example.com';
    
    const profilePhone = document.getElementById('profile-phone');
    if (profilePhone) profilePhone.textContent = '08123456789';
    
    const profileDob = document.getElementById('profile-dob');
    if (profileDob) profileDob.textContent = '1 Januari 1985';
    
    const profileAddress = document.getElementById('profile-address');
    if (profileAddress) profileAddress.textContent = 'Jl. Contoh No. 123, Kelurahan Demo, Kecamatan Test, Jakarta Selatan, DKI Jakarta, 12345';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeUserData();
});
