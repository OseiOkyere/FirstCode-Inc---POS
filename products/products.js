document.addEventListener('DOMContentLoaded', () => {
    const productSearchInput = document.getElementById('productSearch');
    const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    const addProductBtn = document.getElementById('addProductBtn');
    const editProductModal = document.getElementById('editProductModal');
    const editProductForm = document.getElementById('editProductForm');
    const closeModalBtn = document.querySelector('.close');

    // Function to display products in the table
    function displayProducts() {
        const rows = productsTable.rows;
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = '';
        }
    }

    // Function to search products
    function searchProducts() {
        const filter = productSearchInput.value.toLowerCase();
        const rows = productsTable.rows;
        for (let i = 0; i < rows.length; i++) {
            const productName = rows[i].cells[1].textContent.toLowerCase();
            if (productName.includes(filter)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }

    // Function to open the edit product modal
    function openEditProductModal(product) {
        document.getElementById('editProductId').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductCategory').value = product.category;
        document.getElementById('editProductUnitPrice').value = product.unit_price;
        document.getElementById('editProductQuantity').value = product.quantity;
        editProductModal.style.display = 'block';
    }


    // Function to add event listeners to edit and delete buttons
    function addEditDeleteEventListeners() {
        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const row = button.closest('tr');
                const product = {
                    id: row.cells[0].textContent,
                    name: row.cells[1].textContent,
                    category: row.cells[2].textContent,
                    unit_price: row.cells[3].textContent,
                    quantity: row.cells[4].textContent
                };
                openEditProductModal(product);
            });
        });


        const deleteButtons = document.querySelectorAll('.deleteBtn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    }

    // Function to close the edit product modal
    function closeEditProductModal() {
        editProductModal.style.display = 'none';
    }

    
    // Function to delete a product (dummy function, to be replaced with actual implementation)
    function deleteProduct(productId) {
        const row = document.querySelector(`button[data-id="${productId}"]`).closest('tr');
        row.remove();
    }

    // Event listener for search input
    productSearchInput.addEventListener('keyup', searchProducts);

    // Event listener for add product button
    addProductBtn.addEventListener('click', () => {
        // Code to show a modal or a form to add a product
    });

    // Event listener for close button on modal
    closeModalBtn.addEventListener('click', closeEditProductModal);

    // Event listener for submitting the edit product form
    editProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productId = document.getElementById('editProductId').value;
        const row = document.querySelector(`button[data-id="${productId}"]`).closest('tr');
        row.cells[1].textContent = document.getElementById('editProductName').value;
        row.cells[2].textContent = document.getElementById('editProductCategory').value;
        row.cells[3].textContent = document.getElementById('editProductUnitPrice').value;
        row.cells[4].textContent = document.getElementById('editProductQuantity').value;
        closeEditProductModal();
    });

    // Add event listeners to edit and delete buttons after initial load
    addEditDeleteEventListeners();
});
