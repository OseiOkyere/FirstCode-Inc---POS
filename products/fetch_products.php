<?php
include('../database/connect_db.php');

// Fetch products data from the database
$sql = "SELECT id, name, category, unit_price, quantity FROM inventory";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($products);
?>
