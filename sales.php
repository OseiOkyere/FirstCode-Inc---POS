<?php
include('database/connect_db.php');

// Update SQL query to include purchase_datetime
$sql = "SELECT sale_id, item_name, category, unit_price, quantity, purchase_datetime, (unit_price * quantity) AS total_cost FROM sales";
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
                <th>Unit Price ($)</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Purchase Date & Time</th> <!-- New column header -->
            </tr>
        </thead>
        <tbody id="salesTable">
            <?php foreach ($sales_data as $row): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['sale_id']); ?></td>
                    <td><?php echo htmlspecialchars($row['item_name']); ?></td>
                    <td><?php echo htmlspecialchars($row['category']); ?></td>
                    <td><?php echo '$' . htmlspecialchars($row['unit_price']); ?></td>
                    <td><?php echo htmlspecialchars($row['quantity']); ?></td>
                    <td><?php echo '$' . htmlspecialchars($row['total_cost']); ?></td>
                    <td><?php echo htmlspecialchars($row['purchase_datetime']); ?></td> <!-- New column data -->
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
