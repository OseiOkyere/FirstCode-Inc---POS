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
        // Initialize sales page functionality
        if (document.getElementById('salesTable')) {
            initializeSalesPage();
        }

        // Initialize products page functionality
        if (document.getElementById('productsTable')) {
            initializeProductsPage();
        }
    }

    // Sales Page Initialization
    function initializeSalesPage() {
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
                displayTable(salesData);
            } else {
                const filteredData = salesData.filter(row => row.item_name.toLowerCase().includes(filter));
                displayTable(filteredData);
            }
        }

        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('keyup', searchTable);
        }

        displayTable(salesData);
    }

    // Products Page Initialization
    function initializeProductsPage() {
        const productsData = Array.from(document.querySelectorAll('#productsTable tbody tr')).map(row => ({
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            category: row.cells[2].textContent,
            unit_price: row.cells[3].textContent,
            quantity: row.cells[4].textContent
        }));

        function displayProducts(data) {
            const tableBody = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';

            data.forEach(product => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.unit_price}</td>
                    <td>${product.quantity}</td>
                    <td>
                        <button class="editBtn" data-id="${product.id}">Edit</button>
                        <button class="deleteBtn" data-id="${product.id}">Delete</button>
                    </td>
                `;
            });
            addEditDeleteEventListeners();
        }

        function searchProducts() {
            const filter = document.getElementById('productSearch').value.toLowerCase();

            if (filter === '') {
                displayProducts(productsData);
            } else {
                const filteredProducts = productsData.filter(product =>
                    product.name.toLowerCase().includes(filter)
                );
                displayProducts(filteredProducts);
            }
        }

        function openEditProductModal(product) {
            document.getElementById('editProductId').value = product.id;
            document.getElementById('editProductName').value = product.name;
            document.getElementById('editProductCategory').value = product.category;
            document.getElementById('editProductUnitPrice').value = product.unit_price;
            document.getElementById('editProductQuantity').value = product.quantity;
            document.getElementById('editProductModal').style.display = 'block';
        }

        function openAddProductModal() {
            document.getElementById('addProductModal').style.display = 'block';
        }

        function closeEditProductModal() {
            document.getElementById('editProductModal').style.display = 'none';
        }

        function closeAddProductModal() {
            document.getElementById('addProductModal').style.display = 'none';
        }

        function addProduct(product) {
            productsData.push(product);
            displayProducts(productsData);
        }

        function deleteProduct(productId) {
            const index = productsData.findIndex(product => product.id == productId);
            if (index !== -1) {
                productsData.splice(index, 1);
                displayProducts(productsData);
            }
        }

        // Event listeners
        document.getElementById('productSearch').addEventListener('keyup', searchProducts);
        document.querySelector('.close').addEventListener('click', closeEditProductModal);

        document.getElementById('addProductBtn').addEventListener('click', openAddProductModal);
        document.querySelectorAll('.close').forEach(button => {
            button.addEventListener('click', closeAddProductModal);
        });

        document.getElementById('editProductForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const productId = document.getElementById('editProductId').value;
            const product = productsData.find(p => p.id == productId);
            if (product) {
                product.name = document.getElementById('editProductName').value;
                product.category = document.getElementById('editProductCategory').value;
                product.unit_price = document.getElementById('editProductUnitPrice').value;
                product.quantity = document.getElementById('editProductQuantity').value;
                displayProducts(productsData);
                closeEditProductModal();
            }
        });

        document.getElementById('addProductForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newProduct = {
                id: productsData.length + 1,  // Assuming IDs are sequential
                name: document.getElementById('newProductName').value,
                category: document.getElementById('newProductCategory').value,
                unit_price: document.getElementById('newProductUnitPrice').value,
                quantity: document.getElementById('newProductQuantity').value
            };
            addProduct(newProduct);
            closeAddProductModal();
        });

        displayProducts(productsData);
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

    // Change active sidebar when clicked
    const allSideMenu = document.querySelectorAll('.sidebar .side-menu li a');
    allSideMenu.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', function () {
            allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
            li.classList.add('active');
        });
    });

    // Load the default page (dashboard.php) on initial load
    fetchPageContent('dashboard.php');
    initializeChart();
});
