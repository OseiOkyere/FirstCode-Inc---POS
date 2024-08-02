<?php
include('../database/connect_db.php');

// Update SQL query to include purchase_datetime and join with products table
$sql = "SELECT 
            s.sale_id, 
            p.name AS item_name, 
            p.category, 
            p.unit_price, 
            s.quantity, 
            s.purchase_datetime, 
            s.total_cost 
        FROM sales s
        JOIN products p ON s.product_id = p.id ORDER BY s.purchase_datetime DESC";

$result = $conn->query($sql);

$sales_data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $sales_data[] = $row;
    }
}
?>

<div class="sales-section">
    <h2>Sales</h2>
    <input type="text" id="search" placeholder="Search by item name">
    <table>
        <thead>
            <tr>
                <th>Sale ID</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Unit Price (¢)</th>
                <th>Quantity</th>
                <th>Total Cost (¢)</th>
                <th>Purchase Date & Time</th> <!-- New column header -->
            </tr>
        </thead>

        <tbody id="salesTable">
            <?php foreach ($sales_data as $row): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['sale_id']); ?></td>
                    <td><?php echo htmlspecialchars($row['item_name']); ?></td>
                    <td><?php echo htmlspecialchars($row['category']); ?></td>
                    <td><?php echo '¢' . htmlspecialchars($row['unit_price']); ?></td>
                    <td><?php echo htmlspecialchars($row['quantity']); ?></td>
                    <td><?php echo '¢' . htmlspecialchars($row['total_cost']); ?></td>
                    <td><?php echo htmlspecialchars($row['purchase_datetime']); ?></td> <!-- New column data -->
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
