<?php

include ('database/connect_db.php');


$sql = "SELECT sale_id, item_name, category, unit_price, quantity, (unit_price * quantity) AS total_cost FROM sales";
$result = $conn->query($sql);
?>

<div class="sales-section">
                    <h2>Sales</h2>
                    <input type="text" id="search" placeholder="Search by item name">
                    <table>
                        <thead>
                            <tr>
                                <th>Sale ID</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody id="salesTable">
                            <!-- Sales data will be inserted here from JavaScript -->
                        </tbody>
                    </table>
                    <div class="pagination">
                        <button id="prevPage">Previous</button>
                        <span id="pageInfo"></span>
                        <button id="nextPage">Next</button>
                    </div>
                </div>





<script>
        const salesData = <?php echo json_encode($sales_data); ?>;
        let currentPage = 1;
        const rowsPerPage = 10;

        function displayTable(data, rowsPerPage, page) {
            const table = document.getElementById('salesTable');
            table.innerHTML = '';
            page--;

            const start = rowsPerPage * page;
            const end = start + rowsPerPage;
            const paginatedItems = data.slice(start, end);

            for (let i = 0; i < paginatedItems.length; i++) {
                const row = paginatedItems[i];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.sale_id}</td>
                    <td>${row.item_name}</td>
                    <td>${row.category}</td>
                    <td>${row.unit_price}</td>
                    <td>${row.quantity}</td>
                    <td>${row.total_cost}</td>
                `;
                table.appendChild(tr);
            }
        }

        function setupPagination(data, rowsPerPage) {
            const pagination = document.querySelector('.pagination');
            const pageInfo = document.getElementById('pageInfo');

            const totalPages = Math.ceil(data.length / rowsPerPage);

            pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;

            document.getElementById('prevPage').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayTable(data, rowsPerPage, currentPage);
                    pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
                }
            });

            document.getElementById('nextPage').addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayTable(data, rowsPerPage, currentPage);
                    pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
                }
            });
        }

        function searchTable() {
            const filter = document.getElementById('search').value.toLowerCase();
            const filteredData = salesData.filter(row => row.item_name.toLowerCase().includes(filter));
            currentPage = 1;
            displayTable(filteredData, rowsPerPage, currentPage);
            setupPagination(filteredData, rowsPerPage);
        }

        document.getElementById('search').addEventListener('keyup', searchTable);

        // Initial display
        displayTable(salesData, rowsPerPage, currentPage);
        setupPagination(salesData, rowsPerPage);
    </script>