function fetchPageContent(pageUrl) {
    const currentWindow = document.getElementById('currentWindow');
    
    if (currentWindow) { // Ensure the target container exists
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                console.log('Page content loaded successfully'); // Debugging statement
                currentWindow.innerHTML = html; // Load the fetched content into #currentWindow
                
                // After loading, initialize or re-run JavaScript code
                initializePageScripts();
            })
            .catch(error => console.error('Error loading page:', error));
    } else {
        console.error('#currentWindow not found.');
    }
}

function initializePageScripts() {
    // Your JavaScript code to initialize the sales page
    // For example:
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', searchTable);
    }
    
    // Assuming you have a `salesData` defined somewhere or fetched separately
    const salesData = []; // Your sales data here
    let currentPage = 1;
    const rowsPerPage = 10;
    
    function displayTable(data, rowsPerPage, page) {
        // Your displayTable function implementation
    }

    function setupPagination(data, rowsPerPage) {
        // Your setupPagination function implementation
    }

    function searchTable() {
        // Your searchTable function implementation
    }
    
    // Initial display
    displayTable(salesData, rowsPerPage, currentPage);
    setupPagination(salesData, rowsPerPage);
}



document.addEventListener('DOMContentLoaded', function() {
    const sideMenuLinks = document.querySelectorAll('.side-menu.top li a');

    if (sideMenuLinks.length > 0) { // Check if links were found
        sideMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default anchor behavior
                const pageToLoad = this.getAttribute('data-page'); // Get the PHP page to load
                
                console.log(`Loading page: ${pageToLoad}`); // Debugging statement
                fetchPageContent(pageToLoad);
            });
        });
    } else {
        console.warn('No sidebar links found.');
    }
});

