<?php
include('../database/connect_db.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Page</title>
    <link rel="stylesheet" href="../bootstrap.min.css">
   
    <style>
        .product-list {
            max-height: 300px;
            overflow-y: auto;
        }
        .row{
            
    display: flex;
    justify-content: space-evenly;
    align-items: baseline;
    margin-top: 80px;

        }
        .col-md-4{
            width: 40%;
        }

        #sellBtn{
            background-color: green;
            
        }
</style>

</head>
<body>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <h3>Search Products</h3>
            <input type="text" id="productSearch" class="form-control" placeholder="Search for products...">
            <ul id="productList" class="list-group product-list mt-2"></ul>
        </div>
        <div class="col-md-8">
            <h3>Cart</h3>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="cartItems">
                    <!-- Cart items will be added here dynamically -->
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="text-right">Total Amount</td>
                        <td id="totalAmount">$0.00</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button id="sellBtn" class="btn btn-success">Sell</button>
        </div>
    </div>
</div>
<script src="purchase.js"></script>
<script src="../js/jquery-3.5.1.min.js"></script>
<script>
  
</script>
</body>
</html>
