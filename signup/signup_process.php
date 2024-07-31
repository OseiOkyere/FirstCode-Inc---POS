<?php

include('../database/connect_db.php');

// Get POST data
$user = $_POST['username'];
$email = $_POST['email'];
$pass = $_POST['password'];
$confirm_pass = $_POST['confirm_password'];

// Check if passwords match
if ($pass !== $confirm_pass) {
    header("Location: signup.php?error=Passwords do not match");
    exit();
}

// Check if username already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    header("Location: signup.php?error=Username already taken");
    exit();
}

$stmt->close();

// Hash the password
$password_hash = password_hash($pass, PASSWORD_BCRYPT);

// Insert user into database
$stmt = $conn->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $user, $email, $password_hash);

if ($stmt->execute()) {
    $_SESSION['user_id'] = $conn->insert_id;
    $_SESSION['username'] = $user;
    header("Location: ../");
} else {
    header("Location: signup.php?error=Error creating account");
}

$stmt->close();
$conn->close();
?>