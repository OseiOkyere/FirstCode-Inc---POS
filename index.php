<?php

/* 
session_start();

Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ./login/login.php");
    exit();
}

*/

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="POS.css" />
    <link rel="stylesheet" href="dashboard.css" />
    <link rel="stylesheet" href="sales.css" />
    <link rel="stylesheet" href="./products/products.css">
    <script src="chart.js"></script>
    <script src="./products/products.js"></script>
    <script src="./js/jquery-3.5.1.min.js"></script>
    <script src="./purchase/purchase.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/> 
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <title>HomePage</title>
</head>
<body>
    <section class="sidebar">
        <a href="#" class="Logo">
            <i class="bx bxs-color"></i>
            <span>POS</span>
        </a>
        <ul class="side-menu top">
            <li class="active">
                <a href="#" data-page="dashboard.php"><i class="bx bxs-dashboard"></i><span class="text">Dashboard</span></a>
            </li>
            <li>
                <a href="#" data-page="sales.php"><i class="bx bx-transfer"></i><span class="text">Sales</span></a>
            </li>
            <li>
                <a href="#" data-page="./products/products.php"><i class="bx bx-receipt bx-flip-horizontal"></i><span class="text">Product</span></a>
            </li>
            <li>
                <a href="#" data-page="./purchase/purchase.php"><i class="bx bx-cart-add"></i><span class="text">Purchases</span></a>
            </li>
        
            <li>
                <div>
                <a href="logout.php" data-page="logout.php"><i class="bx bx-log-out"></i><span class="text">Logout</span></a>
                </div>
            </li>
        </ul>
    </section>
    <section id="content">
        <main>
            <div class="titleHead">
                <h1>POS sections</h1>
            </div>
            <div class="current-window" id="currentWindow">
                <!-- Dynamic content will be loaded here -->
            </div>
        </main>
        <!-- Footer -->
        <footer>
            <p>&copy; 2024 First Code Inc. All rights reserved.</p>

            <a class="socialIcons">
                    <i class='bx bxl-facebook-circle' ></i>
                    <i class='bx bxl-youtube' ></i>
                    <i class='bx bxl-twitter' ></i>
                    <i class='bx bxl-tiktok' ></i>
                    </a>


        </footer>
    </section>
    <script src="./purchase/purchase.js"></script>
    <script src="index.js"></script>
</body>
</html>

