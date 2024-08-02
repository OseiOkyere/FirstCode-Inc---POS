<?php
//dashboard.php


include('../database/connect_db.php');

// Fetch total sales data for today, yesterday, and this month
$sqlToday = "SELECT SUM(total_cost) AS total FROM sales WHERE DATE(purchase_datetime) = CURDATE()";
$resultToday = $conn->query($sqlToday);
$totalSalesToday = $resultToday->fetch_assoc()['total'];

$sqlYesterday = "SELECT SUM(total_cost) AS total FROM sales WHERE DATE(purchase_datetime) = CURDATE() - INTERVAL 1 DAY";
$resultYesterday = $conn->query($sqlYesterday);
$totalSalesYesterday = $resultYesterday->fetch_assoc()['total'];

$sqlMonth = "SELECT SUM(total_cost) AS total FROM sales WHERE MONTH(purchase_datetime) = MONTH(CURDATE()) AND YEAR(purchase_datetime) = YEAR(CURDATE())";
$resultMonth = $conn->query($sqlMonth);
$totalSalesMonth = $resultMonth->fetch_assoc()['total'];
?>


<div class="dashboard">
    <div class="cards">
    
        <div class="card" id="totalSalesToday">
        <i class='bx bx-line-chart'></i>
            <div>
                <h3>Total Sales Today</h3>
                <p id="salesToday">$<?php echo number_format($totalSalesToday, 2); ?></p>
        </div>
        </div>

        <div class="card" id="totalSalesYesterday">
        <i class='bx bx-bar-chart-alt-2'></i>
            <div>
                <h3>Total Sales Yesterday</h3>
            
            <p id="salesYesterday">$<?php echo number_format($totalSalesYesterday, 2); ?></p>
        </div>
        </div>
        <div class="card" id="totalSalesMonth">
        <i class='bx bx-calendar-check'></i>
            <div><h3>Total Sales This Month</h3>
            
            <p id="salesMonth">$<?php echo number_format($totalSalesMonth, 2); ?></p></div>
        </div> 
    </div>


    <div class="chart-container">
        <canvas id="salesChart"></canvas>
        <br> <br>
       
        <strong><center>Monthly Sales Chart</center></strong>
    </div>
</div>
