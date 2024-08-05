<?php
include('../database/connect_db.php');

$query = $_GET['query'];
$sql = "SELECT * FROM inventory WHERE name LIKE '%$query%'";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);
$conn->close();
?>
