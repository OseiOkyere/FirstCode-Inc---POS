<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Error</title>
    <link rel="stylesheet" href="login.css">
</head>
<body>
    <div class="container">
        <div class="login-card">
            <h3 class="login-title">Login Error</h3>
            <p class="error-message"><?php echo htmlspecialchars($_GET['error']); ?></p>
            <a href="../" class="btn-submit">Go Back</a>
        </div>
    </div>
</body>
</html>
