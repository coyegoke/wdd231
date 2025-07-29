document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // --- Modal Logic ---
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const modals = document.querySelectorAll('.modal');

    // Open Modal
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalId = event.target.dataset.modalTarget;
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.style.display = 'flex';
            }
        });
    });

    // Close Modal when clicking the 'x' button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close Modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Check if the click was directly on the modal background
                modal.style.display = 'none';
            }
        });
    });

    // --- Membership Card Animation ---
    const animatedCards = document.querySelectorAll('.membership-card.animated-card');
    animatedCards.forEach((card, index) => {
        // Add 'show' class with a staggered delay
        setTimeout(() => {
            card.classList.add('show');
        }, index * 150); // 150ms delay between each card
    });
});
