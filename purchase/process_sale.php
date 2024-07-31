<?php
include('../database/connect_db.php');

$cart = json_decode($_POST['cart'], true);
if (!empty($cart)) {
    $date = date('Y-m-d H:i:s');
    
    // Start transaction
    $conn->begin_transaction();

    try {
        foreach ($cart as $product) {
            $product_id = $product['id'];
            $quantity = $product['quantity'];
            $total_cost = $product['price'] * $quantity;

            // Check available quantity
            $sql_check = "SELECT quantity FROM products WHERE id = '$product_id'";
            $result_check = $conn->query($sql_check);
            if ($result_check->num_rows == 0) {
                throw new Exception("Product ID $product_id does not exist.");
            }

            $row = $result_check->fetch_assoc();
            $available_quantity = $row['quantity'];

            if ($quantity > $available_quantity) {
                // If requested quantity exceeds available quantity
                echo "Cannot sell more than the available stock. Available quantity: $available_quantity.";
                // Rollback transaction and exit
                $conn->rollback();
                exit;
            }

            // Insert into sales table
            $sql_insert = "INSERT INTO sales (product_id, quantity, total_cost, purchase_datetime) VALUES ('$product_id', '$quantity', '$total_cost', '$date')";
            if (!$conn->query($sql_insert)) {
                throw new Exception("Error inserting sale: " . $conn->error);
            }

            // Update quantity in products table
            $sql_update = "UPDATE products SET quantity = quantity - $quantity WHERE id = '$product_id'";
            if (!$conn->query($sql_update)) {
                throw new Exception("Error updating product quantity: " . $conn->error);
            }
        }

        // Commit transaction
        $conn->commit();
        echo "Sale processed successfully.";
    } catch (Exception $e) {
        // Rollback transaction if any error occurs
        $conn->rollback();
        echo "Transaction failed: " . $e->getMessage();
    }
} else {
    echo "Cart is empty.";
}

$conn->close();
?>
