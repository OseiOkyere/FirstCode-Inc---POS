<?php

session_start();

//Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: ./login/login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="index.css" />
    <link rel="stylesheet" href="./dashboard/dashboard.css" />
    <link rel="stylesheet" href="./sales/sales.css" />
    <link rel="stylesheet" href="./products/products.css">
    <script src="chart.js"></script>
    <script src="./products/products.js"></script>
    <script src="./js/jquery-3.5.1.min.js"></script>
    <script src="./purchase/purchase.js"></script>
    

    <!-- Local Libraries -->
    <script src="./chart.js"></script>
     <link href="./boxicons-2.1.4/boxicons-2.1.4/css/boxicons.min.css" rel="stylesheet"/> 
    <link rel="stylesheet" href="./boxicons.min.css"> 
    <script src="js/jquery-3.5.1.min.js"></script>

       <!-- Online Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <title>POS - HomePage</title>

</head>
<body>
    <section class="sidebar">
        <a href="#" class="Logo">
            <i class="bx bxs-cart"></i>
            <span>Inventory Sales System</span>
        </a>
        <ul class="side-menu top">
            <li class="active">
                <a href="#" data-page="./dashboard/dashboard.php"><i class="bx bxs-dashboard"></i><span class="text">Dashboard</span></a>
            </li>
            <li>
                <a href="#" data-page="./sales/sales.php"><i class="bx bx-transfer"></i><span class="text">Sales / Invoices</span></a>
            </li>
            <li>
                <a href="#" data-page="./products/products.php"><i class="bx bx-receipt bx-flip-horizontal"></i><span class="text">Inventory</span></a>
            </li>
            <li>
                <a href="#" data-page="./purchase/purchase.php"><i class="bx bx-cart-add"></i><span class="text">Sell</span></a>
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
                <h1>Point of Sale</h1>
            </div>
            <div class="current-window" id="currentWindow">
                <!-- Dynamic content will be loaded here -->
            </div>
        </main>
        <br>
        <br>
        <!-- Footer -->
        <footer>
            <p>&copy; 2024 First Code Inc. All rights reserved.</p>
            
        <a href="https://github.com/KwameGilbert" target="_blank"><i class='bx bxl-github'></i></a>
        <a href="https://github.com/KwameGilbert" target="_blank"><i class='bx bxl-instagram'></i></a>
        <a href="https://github.com/KwameGilbert" target="_blank"><i class="bx bxl-facebook"></i></a>
        <a href="https://github.com/KwameGilbert" target="_blank"><i class="bx bxl-twitter"></i></a>
        </footer>
       
    </section>
    <script src="./purchase/purchase.js"></script>
    <script src="./index.js"></script>
</body>
</html>

