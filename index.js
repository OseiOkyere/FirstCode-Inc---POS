//index.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and load page content
    function fetchPageContent(pageUrl) {
        const currentWindow = document.getElementById('currentWindow');
        if (currentWindow) {
            fetch(pageUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    console.log('Page content loaded successfully');
                    currentWindow.innerHTML = html;
                    initializePageScripts(); // Initialize scripts after content load
                })
                .catch(error => console.error('Error loading page:', error));
        } else {
            console.error('#currentWindow not found.');
        }
    }

    // Function to initialize or re-run JavaScript code for the page
    function initializePageScripts() {
        // Fetch sales data from the table rows
        const salesData = Array.from(document.querySelectorAll('#salesTable tr')).map(row => ({
            sale_id: row.cells[0].textContent,
            item_name: row.cells[1].textContent,
            category: row.cells[2].textContent,
            unit_price: row.cells[3].textContent,
            quantity: row.cells[4].textContent,
            total_cost: row.cells[5].textContent,
            purchase_datetime: row.cells[6].textContent
        }));

        function displayTable(data) {
            const table = document.getElementById('salesTable');
            table.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.sale_id}</td>
                    <td>${row.item_name}</td>
                    <td>${row.category}</td>
                    <td>${row.unit_price}</td>
                    <td>${row.quantity}</td>
                    <td>${row.total_cost}</td>
                    <td>${row.purchase_datetime}</td>
                `;
                table.appendChild(tr);
            });
        }

        function searchTable() {
            const filter = document.getElementById('search').value.toLowerCase();

            if (filter === '') {
                // No filter: show all data
                displayTable(salesData);
            } else {
                // Apply filter
                const filteredData = salesData.filter(row => row.item_name.toLowerCase().includes(filter));
                displayTable(filteredData);
            }
        }

        // Initialize search functionality
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('keyup', searchTable);
        }

        // Initial display
        displayTable(salesData);

        
    }

    // Function to initialize or re-render the chart
    function initializeChart() {
        fetch('fetch_sales_data.php')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.date);
                const dataValues = data.map(item => parseFloat(item.total));

                const ctx = document.getElementById('salesChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Sales',
                            data: dataValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching sales data:', error));
    }

    // Set up event listeners for sidebar links
    const sideMenuLinks = document.querySelectorAll('.side-menu.top li a');
    if (sideMenuLinks.length > 0) {
        sideMenuLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const pageToLoad = this.getAttribute('data-page');
                console.log(`Loading page: ${pageToLoad}`);
                fetchPageContent(pageToLoad);
            });
        });
    } else {
        console.warn('No sidebar links found.');
    }

    //Change active sidebar when clicked
    const allSideMenu = document.querySelectorAll('.sidebar .side-menu li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            // Remove 'active' class from all menu items
            allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
            // Add 'active' class to the clicked menu item
            li.classList.add('active');
        });
    });


    // Load the default page (dashboard.php) on initial load
    fetchPageContent('dashboard.php');
    // Initialize chart after content load
    initializeChart();
});
