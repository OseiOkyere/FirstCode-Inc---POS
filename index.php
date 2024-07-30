<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="POS.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>HomePage</title>
</head>
<body>
    <section class="sidebar">
        <a href="#" class="Logo">
            <i class='bx bxs-color'></i>
            <span>POS</span>
        </a>
        <ul class="side-menu top">
            <li class="active">
                <a href="#" data-page="dashboard.php"><i class='bx bxs-dashboard'></i><span class="text">Dashboard</span></a>
            </li>
            <li>
                <a href="#" data-page="sales.php"><i class='bx bx-transfer'></i><span class="text">Sales</span></a>
            </li>
            <li>
                <a href="#" data-page="products.php"><i class='bx bx-receipt bx-flip-horizontal'></i><span class="text">Product</span></a>
            </li>
            <li>
                <a href="#" data-page="purchases.php"><i class='bx bx-cart-add'></i><span class="text">Purchases</span></a>
            </li>
            <li>
                <a href="#" data-page="settings.php"><i class='bx bx-cog'></i><span class="text">Settings</span></a>
            </li>
            <li>
                <a href="#" data-page="logout.php"><i class='bx bx-log-out bx-flip-horizontal'></i><span class="text">Logout</span></a>
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
    </section>
    <script src="POS.js"></script>
</body>
</html>
