
<?php
include('../database/connect_db.php');

$id = $_POST['id'];
$name = $_POST['name'];
$category = $_POST['category'];
$unit_price = $_POST['unit_price'];
$quantity = $_POST['quantity'];

$sql = "UPDATE inventory SET name='$name', category='$category', unit_price='$unit_price', quantity='$quantity' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo "Product updated successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
