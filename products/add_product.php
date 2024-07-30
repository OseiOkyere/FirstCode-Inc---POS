
<?php
include('../database/connect_db.php');

$name = $_POST['name'];
$category = $_POST['category'];
$unit_price = $_POST['unit_price'];
$quantity = $_POST['quantity'];

$sql = "INSERT INTO products (name, category, unit_price, quantity) VALUES ('$name', '$category', '$unit_price', '$quantity')";

if ($conn->query($sql) === TRUE) {
    echo "New product added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
