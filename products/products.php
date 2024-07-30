<?php
include('../database/connect_db.php');

// Fetch products data from the database
$sql = "SELECT id, name, category, unit_price, quantity FROM products";
$result = $conn->query($sql);
?>

<div class="products-page">
    <div class="search-container">
        <input type="text" id="productSearch" placeholder="Search products...">
        <button id="addProductBtn">Add Product</button>
    </div>
    <table id="productsTable">
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Unit Price</th>
                <th>Quantity Available</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>{$row['id']}</td>";
                    echo "<td>{$row['name']}</td>";
                    echo "<td>{$row['category']}</td>";
                    echo "<td>{$row['unit_price']}</td>";
                    echo "<td>{$row['quantity']}</td>";
                    echo "<td>
                            <button class='editBtn' data-id='{$row['id']}'>Edit</button>
                            <button class='deleteBtn' data-id='{$row['id']}'>Delete</button>
                          </td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='6'>No products found</td></tr>";
            }
            ?>
        </tbody>
    </table>
</div>

<!-- Modal for editing products -->
<div id="editProductModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Edit Product</h2>
        <form id="editProductForm">
            <input type="hidden" id="editProductId">
            <label for="editProductName">Product Name</label>
            <input type="text" id="editProductName">
            <label for="editProductCategory">Category</label>
            <input type="text" id="editProductCategory">
            <label for="editProductUnitPrice">Unit Price</label>
            <input type="text" id="editProductUnitPrice">
            <label for="editProductQuantity">Quantity Available</label>
            <input type="text" id="editProductQuantity">
            <button type="submit">Save</button>
        </form>
    </div>
</div>

<!-- Modal for adding products -->
<div id="addProductModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Add Product</h2>
        <form id="addProductForm">
            <label for="newProductName">Product Name</label>
            <input type="text" id="newProductName" required>
            <label for="newProductCategory">Category</label>
            <input type="text" id="newProductCategory" required>
            <label for="newProductUnitPrice">Unit Price</label>
            <input type="number" id="newProductUnitPrice" required>
            <label for="newProductQuantity">Quantity Available</label>
            <input type="number" id="newProductQuantity" required>
            <button type="submit">Add Product</button>
        </form>
    </div>
</div>

<?php
$conn->close();
?>
