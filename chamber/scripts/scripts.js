// js/script.js - Specific logic for the directory.html page, including global functions

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Functionality (Moved from main.js) ---
    // Dynamically set copyright year
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

    // --- Directory Page Specific Logic ---
    // Get references to the view toggle buttons and the display container
    const gridbutton = document.querySelector("#grid-view-btn");
    const listbutton = document.querySelector("#list-view-btn");
    const display = document.querySelector("#members-container"); // This is our 'article' equivalent

    let membersData = []; // Store fetched members data globally for easy access

    // Function to fetch member data from JSON
    const fetchMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            membersData = data.members; // Store the fetched members array
            // Determine initial view based on active button
            if (gridbutton.classList.contains('active')) {
                displayMembers(membersData, 'grid');
            } else {
                displayMembers(membersData, 'list');
            }
        } catch (error) {
            console.error('Error fetching members:', error);
            display.innerHTML = '<p>Error loading member data. Please try again later.</p>';
        }
    };

    // Function to display members based on the view type (grid or list)
    const displayMembers = (members, viewType) => {
        display.innerHTML = ''; // Clear existing content
        display.classList.remove("grid-view", "list-view"); // Remove existing view classes
        display.classList.add(viewType === 'grid' ? "grid-view" : "list-view"); // Add the new view class

        members.forEach(member => {
            const memberElement = document.createElement('div');
            // Apply specific class for individual member item based on the overall view
            memberElement.classList.add(viewType === 'grid' ? 'member-card' : 'member-list-item');

            // Determine membership level text
            let membershipLevelText = '';
            if (member.membershipLevel === 1) {
                membershipLevelText = 'Member';
            } else if (member.membershipLevel === 2) {
                membershipLevelText = 'Silver Member';
            } else if (member.membershipLevel === 3) {
                membershipLevelText = 'Gold Member';
            }

            memberElement.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" onerror="this.onerror=null;this.src='https://placehold.co/100x100/e67e22/ffffff?text=Logo'">
                <div class="member-details">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p class="membership-level">${membershipLevelText}</p>
                    <p>${member.description || ''}</p>
                </div>
            `;
            display.appendChild(memberElement);
        });
    };

    // Event listener for Grid View button
    if (gridbutton) {
        gridbutton.addEventListener("click", () => {
            display.classList.add("grid-view");
            display.classList.remove("list-view");
            gridbutton.classList.add('active');
            listbutton.classList.remove('active');
            displayMembers(membersData, 'grid'); // Re-render with grid view
        });
    }

    // Event listener for List View button
    if (listbutton) {
        listbutton.addEventListener("click", showList); // Using a named function as per sample

        function showList() {
            display.classList.add("list-view");
            display.classList.remove("grid-view");
            listbutton.classList.add('active');
            gridbutton.classList.remove('active');
            displayMembers(membersData, 'list'); // Re-render with list view
        }
    }

    // Initial fetch and display of members when the page loads
    fetchMembers();
});
