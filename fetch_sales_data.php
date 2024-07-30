<?php
include('database/connect_db.php');

// Fetch sales data for the current month
$sqlMonthlyData = "SELECT DATE_FORMAT(purchase_datetime, '%Y-%m-%d') AS date, SUM(unit_price * quantity) AS total FROM sales WHERE MONTH(purchase_datetime) = MONTH(CURDATE()) AND YEAR(purchase_datetime) = YEAR(CURDATE()) GROUP BY DATE(purchase_datetime)";
$resultMonthlyData = $conn->query($sqlMonthlyData);

$chartData = array();
while ($row = $resultMonthlyData->fetch_assoc()) {
    $chartData[] = $row;
}

// Return JSON encoded data
header('Content-Type: application/json');
echo json_encode($chartData);
?>
