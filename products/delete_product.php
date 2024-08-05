// delete_product.php
<?php
include('../database/connect_db.php');

$id = $_POST['id'];

$sql = "DELETE FROM inventory WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo "Product deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
