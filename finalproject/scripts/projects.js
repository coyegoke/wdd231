// project-loader.js - ES Module for dynamic project content.

// This module handles:
// 1. Fetching project data from a JSON file.
// 2. Dynamic generation of project cards.
// 3. Opening and closing a modal dialog with project details.
// 4. Array method usage for data processing.
// 5. Template literals for HTML creation.

// Function to fetch project data from the local JSON file.
export async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        return []; // Return an empty array on error
    }
}

// Function to create a single project card element.
function createProjectCard(project) {
    // Template literal for a clean, semantic HTML structure.
    return `
        <div class="project-card" data-project-id="${project.id}">
            <img src="${project.image_url}" alt="${project.name} screenshot" loading="lazy" class="project-card-image">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.tagline}</p>
            </div>
        </div>
    `;
}

// Function to render projects on a specific page.
async function renderProjects(containerId, limit = null) {
    const projectsContainer = document.getElementById(containerId);
    if (!projectsContainer) return;

    // Show a loading message while fetching data
    projectsContainer.innerHTML = '<p class="loading-message">Loading projects...</p>';

    const allProjects = await fetchProjects();
    
    // Use an array method (slice) to limit the projects for the homepage.
    const projectsToRender = limit ? allProjects.slice(0, limit) : allProjects;

    // Use forEach and template literals to dynamically generate project cards.
    projectsContainer.innerHTML = projectsToRender.map(project => createProjectCard(project)).join('');

    // If on the projects page, attach event listeners for the modal.
    if (containerId === 'projects-container') {
        attachModalListeners(projectsToRender);
    }
}

// Function to attach click listeners for the modal on project cards.
function attachModalListeners(projects) {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Use forEach to iterate through project cards and attach event listeners.
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.dataset.projectId, 10);
            
            // Use an array method (find) to get the details of the clicked project.
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                displayModal(project, modal);
            }
        });
    });

    modalCloseBtn.addEventListener('click', () => {
        modal.close();
    });

    // Close modal when clicking outside the content.
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

// Function to display project details in the modal dialog.
function displayModal(project, modal) {
    const modalDetails = document.getElementById('modal-project-details');
    
    // Use a template literal to create the dynamic modal content.
    modalDetails.innerHTML = `
        <img src="${project.image_url}" alt="${project.name} screenshot" class="modal-image">
        <h3>${project.name}</h3>
        <p><strong>Client:</strong> ${project.client}</p>
        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
        <p>${project.description}</p>
    `;
    
    modal.showModal(); // Use the native HTML <dialog> method.
}

// Run the appropriate function based on the current page.
const currentPage = window.location.pathname.split('/').pop();

if (currentPage === 'projects.html') {
    renderProjects('projects-container');
} else if (currentPage === 'index.html' || currentPage === '') {
    renderProjects('projects-preview-container', 3); // Limit to 3 projects on the homepage.
}
