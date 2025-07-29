// js/thankyou.js - Logic for the thank you page
// This script displays the submitted form data on the thank you page
document.addEventListener('DOMContentLoaded', () => {
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamically set last modification date
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Display Submitted Form Data ---
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('display-name').textContent =
        `${urlParams.get('firstName') || ''} ${urlParams.get('lastName') || ''}`;
    document.getElementById('display-email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('display-phone').textContent = urlParams.get('mobilePhone') || 'N/A';
    document.getElementById('display-business-name').textContent = urlParams.get('businessName') || 'N/A';

    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        try {
            // Parse ISO string and format for display
            const date = new Date(timestamp);
            document.getElementById('display-timestamp').textContent = date.toLocaleString();
        } catch (e) {
            document.getElementById('display-timestamp').textContent = 'Invalid Date';
            console.error('Error parsing timestamp:', e);
        }
    } else {
        document.getElementById('display-timestamp').textContent = 'N/A';
    }
});
