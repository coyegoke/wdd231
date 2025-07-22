// js/script.js

document.addEventListener('DOMContentLoaded', () => {
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

    // Directory Page Specific Logic
    const membersContainer = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');

    if (membersContainer && gridViewBtn && listViewBtn) {
        const fetchMembers = async () => {
            try {
                const response = await fetch('data/members.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const members = await response.json();
                displayMembers(members.members, 'grid'); // Default to grid view, access 'members' array
            } catch (error) {
                console.error('Error fetching members:', error);
                membersContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
            }
        };

        const displayMembers = (members, viewType) => {
            membersContainer.innerHTML = ''; // Clear existing content
            membersContainer.className = ''; // Clear existing classes
            membersContainer.classList.add(viewType === 'grid' ? 'grid-view' : 'list-view');

            members.forEach(member => {
                const memberElement = document.createElement('div');
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
                membersContainer.appendChild(memberElement);
            });
        };

        gridViewBtn.addEventListener('click', () => {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            fetchMembers(); // Re-fetch to ensure data is fresh and re-render with grid view
        });

        listViewBtn.addEventListener('click', () => {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            fetchMembers(); // Re-fetch to ensure data is fresh and re-render with list view
        });

        // Initial fetch and display
        fetchMembers();
    }
});
