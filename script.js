/**
 * Core Gate Lock Mechanism:
 * Hides entrance passport panel, clears navigation classes and displays original library dashboard.
 */
function unlockTheGates() {
    const body = document.body;
    body.classList.remove('gate-closed');
    body.classList.add('gate-open');
    
    // Auto-routes into active original section space (Creation Page)
    navigateTo('screen-creation');
}

/**
 * Screen Route Switcher Logic
 */
function navigateTo(screenId) {
    // Hide all tab containers safely
    const allPages = document.querySelectorAll('.sanctuary-page');
    allPages.forEach(page => {
        page.classList.remove('active-screen');
    });
    
    // Uncover target layout tree viewport
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active-screen');
    }

    // Refresh nodes dynamically within the footer track matrix 
    const nodes = document.querySelectorAll('.slider-nav-node');
    nodes.forEach(node => node.classList.remove('active-node'));
    
    // Array indices match mapping order inside HTML slider layout track
    if (screenId === 'screen-creation') nodes[0].classList.add('active-node');
    if (screenId === 'screen-chapter1') nodes[1].classList.add('active-node');
    if (screenId === 'screen-notes')    nodes[2].classList.add('active-node');

    window.scrollTo(0, 0);
}

/**
 * Theme Context Controller System Engine
 */
document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body;
    const dayButton = document.getElementById('dayToggle');
    const nightButton = document.getElementById('nightToggle');
    const waxSealElement = document.getElementById('waxSeal');

    if (dayButton && nightButton) {
        dayButton.addEventListener('click', () => {
            bodyElement.setAttribute('data-theme', 'day');
            dayButton.classList.add('active');
            nightButton.classList.remove('active');
        });

        nightButton.addEventListener('click', () => {
            bodyElement.setAttribute('data-theme', 'night');
            nightButton.classList.add('active');
            dayButton.classList.remove('active');
        });
    }

    // Interactive Action Triggers for the 3D Wax Seal Stamp
    if (waxSealElement) {
        waxSealElement.addEventListener('click', () => {
            alert('The 3D wax seal breaks cleanly... Your entry is recorded.');
        });
    }
});
