<?php
session_start();
include('../database/connect_db.php');

// Get POST data
$user = $_POST['username'];
$pass = $_POST['password'];

$error = '';

try {
    // Prepare and execute SQL statement
    $stmt = $conn->prepare("SELECT id, username, password_hash FROM employees WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $username, $password_hash);
    $stmt->fetch();

    if ($stmt->num_rows == 1) {
        // Verify password
        if (password_verify($pass, $password_hash)) {
            // Set session variables
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            
            // Redirect to the dashboard or home page
            header("Location: ../");
            exit();
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "Invalid username.";
    }

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    $error = "An error occurred. Please try again.";
    error_log($e->getMessage()); // Log the error
}

// Redirect to error page if there was an error
if (!empty($error)) {
    header("Location: login_error.php?error=" . urlencode($error));
    exit();
}
?>
