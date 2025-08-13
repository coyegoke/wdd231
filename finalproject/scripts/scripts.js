// scripts.js - This script contains general site functionality,

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Toggles the mobile navigation menu.
     * @param {HTMLElement} menuToggle - The button that toggles the menu.
     * @param {HTMLElement} primaryNavigation - The navigation menu itself.
     */
    function setupMobileMenu(menuToggle, primaryNavigation) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNavigation.setAttribute('data-visible', !isExpanded);
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNavigation = document.querySelector('#primary-navigation');

    // Only set up the menu if the elements exist
    if (menuToggle && primaryNavigation) {
        setupMobileMenu(menuToggle, primaryNavigation);
    }

    // Dynamically updates the footer with the current year and last modification date.
    function updateFooter() {
        const copyrightYearElement = document.querySelector('#copyright-year');
        if (copyrightYearElement) {
            copyrightYearElement.textContent = new Date().getFullYear();
        }

        const lastModifiedElement = document.querySelector('#last-modified');
        if (lastModifiedElement) {
            lastModifiedElement.textContent = document.lastModified;
        }
    }

    // Call the function to update the footer on page load
    updateFooter();

});
