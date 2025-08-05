document.addEventListener('DOMContentLoaded', () => {
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

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

    const lastVisitMessageElement = document.getElementById('last-visit-message');
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const displayLastVisitMessage = () => {
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();

        if (lastVisit === null) {
            // First visit
            lastVisitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const lastVisitTime = parseInt(lastVisit, 10);
            const timeDifferenceMs = now - lastVisitTime;
            const daysDifference = Math.round(timeDifferenceMs / MS_PER_DAY);

            if (daysDifference < 1) {
                lastVisitMessageElement.textContent = "Back so soon! Awesome!";
            } else if (daysDifference === 1) {
                lastVisitMessageElement.textContent = "You last visited 1 day ago.";
            } else {
                lastVisitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
            }
        }
        // Always update last visit to current time
        localStorage.setItem('lastVisit', now.toString());
    };

    // --- Items of Interest Dynamic Loading ---
    const itemsOfInterestContainer = document.getElementById('items-of-interest-container');

    const loadItemsOfInterest = async () => {
        try {
            const response = await fetch('data/discover-items.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const items = data.itemsOfInterest;

            itemsOfInterestContainer.innerHTML = '';

            if (items.length === 0) {
                itemsOfInterestContainer.innerHTML = '<p class="text-center">No items of interest to display.</p>';
                return;
            }

            items.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('interest-card');
                itemCard.innerHTML = `
                    <h2>${item.name}</h2>
                    <figure>
                        <img src="images/${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://www.gstatic.com/webp/gallery/1.sm.webp'">
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="learn-more-btn">Learn More</a>
                `;
                itemsOfInterestContainer.appendChild(itemCard);
            });

        } catch (error) {
            console.error('Error loading items of interest:', error);
            itemsOfInterestContainer.innerHTML = '<p class="text-center">Error loading items of interest. Please try again later.</p>';
        }
    };

    displayLastVisitMessage();
    loadItemsOfInterest();
});
