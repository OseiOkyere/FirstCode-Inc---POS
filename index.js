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
        const productsTable = document.getElementById('productsTable');
        const productsData = Array.from(productsTable.querySelectorAll('tbody tr')).map(row => ({
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            category: row.cells[2].textContent,
            unit_price: row.cells[3].textContent,
            quantity: row.cells[4].textContent
        }));

        function displayProducts(data) {
            const tableBody = productsTable.getElementsByTagName('tbody')[0];
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


        function addEditDeleteEventListeners() {
            const editButtons = document.querySelectorAll('.editBtn');
            const deleteButtons = document.querySelectorAll('.deleteBtn');
        
            editButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productId = this.getAttribute('data-id');
                    const product = productsData.find(p => p.id == productId);
                    if (product) {
                        openEditProductModal(product);
                    }
                });
            });
        
            deleteButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const productId = this.getAttribute('data-id');
                    if (confirm('Are you sure you want to delete this product?')) {
                        deleteProduct(productId);
                    }
                });
            });
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
            // Send AJAX request to add_product.php
            fetch('./products/add_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'name': product.name,
                    'category': product.category,
                    'unit_price': product.unit_price,
                    'quantity': product.quantity
                })
            })
            .then(response => response.text())
            .then(result => {
                if (result.includes("New product added successfully")) {
                    // Refresh the products table
                    initializeProductsPage();
                    closeAddProductModal();
                } else {
                    alert("Error adding product: " + result);
                }
            })
            .catch(error => console.error('Error:', error));
        }

        //DELETE PRODUCT
        function deleteProduct(productId) {
            // Send AJAX request to delete_product.php
            fetch('./products/delete_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ 'id': productId })
            })
            .then(response => response.text())
            .then(result => {
                if (result.includes("Product deleted successfully")) {
                    // Refresh the products table
                    initializeProductsPage();
                } else {
                    alert("Error deleting product: " + result);
                }
            })
            .catch(error => console.error('Error:', error));
        }
        

        productsTable.addEventListener('click', (e) => {
            if (e.target.classList.contains('editBtn')) {
                const productId = e.target.getAttribute('data-id');
                const product = productsData.find(p => p.id == productId);
                if (product) {
                    openEditProductModal(product);
                }
            }
        
            if (e.target.classList.contains('deleteBtn')) {
                const productId = e.target.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(productId);
                }
            }
        });
        

        // Event listeners
        document.getElementById('productSearch').addEventListener('keyup', searchProducts);
        document.querySelectorAll('#editProductModal .close').forEach(button => {
            button.addEventListener('click', closeEditProductModal);
        });
        document.querySelectorAll('#addProductModal .close').forEach(button => {
            button.addEventListener('click', closeAddProductModal);
        });

        document.getElementById('addProductBtn').addEventListener('click', openAddProductModal);


        //EDIT PRODUCT
        document.getElementById('editProductForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const editedProduct = {
                id: document.getElementById('editProductId').value,
                name: document.getElementById('editProductName').value,
                category: document.getElementById('editProductCategory').value,
                unit_price: document.getElementById('editProductUnitPrice').value,
                quantity: document.getElementById('editProductQuantity').value
            };
        
            // Send AJAX request to edit_product.php
            fetch('products/edit_products.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(editedProduct)
            })
            .then(response => response.text())
            .then(result => {
                if (result.includes("Product updated successfully")) {
                    // Refresh the products table
                    initializeProductsPage();
                    closeEditProductModal();
                } else {
                    alert("Error updating product: " + result);
                }
            })
            .catch(error => console.error('Error:', error));
        });

        

        document.getElementById('addProductForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newProduct = {
                name: document.getElementById('newProductName').value,
                category: document.getElementById('newProductCategory').value,
                unit_price: document.getElementById('newProductUnitPrice').value,
                quantity: document.getElementById('newProductQuantity').value
            };
            addProduct(newProduct);
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
