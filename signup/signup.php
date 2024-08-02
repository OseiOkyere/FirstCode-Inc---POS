<?php
    if(isset($_GET['error'])){
        $error = $_GET['error'];
    }else{
        $error = " ";
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="signup.css">
</head>
<body>
    <div class="container">
        <div class="signup-card">
            <center><?php echo $error ?></center>
            <h3 class="signup-title">Sign Up</h3>
            <form id="signupForm" method="POST" action="signup_process.php">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirm Password:</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                </div>
                <button type="submit" class="btn-submit">Sign Up</button>
                <p class="message" id="message"></p>
            </form>

            <p class="message">Already have an account? <a href="../login/login.html">Log In</a></p>
        </div>
    </div>
    <script src="signup.js"></script>
</body>
</html>
  