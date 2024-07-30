document.addEventListener('DOMContentLoaded', function() {
  const allSideMenu = document.querySelectorAll('.sidebar .side-menu li a');
  const currentWindow = document.getElementById('currentWindow');

  allSideMenu.forEach(item => {
      item.addEventListener('click', function(event) {
          event.preventDefault();
          const page = this.getAttribute('data-page');

          // Remove 'active' class from all menu items
          allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
          // Add 'active' class to the clicked menu item
          this.parentElement.classList.add('active');

          // Load the content of the clicked page
          if (page) {
              fetch(page)
                  .then(response => response.text())
                  .then(data => {
                      currentWindow.innerHTML = data;
                  })
                  .catch(error => console.error('Error loading page:', error));
          }
      });
  });

  // Load the default page (Dashboard) on initial load
  document.querySelector('.sidebar .side-menu li.active a').click();
});




//Sales Search JS
const searchInput = document.getElementById('search');
const salesTable = document.getElementById('salesTable');

searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase();
    const rows = salesTable.getElementsByTagName('tr');

    Array.from(rows).forEach(function(row) {
        const itemName = row.getElementsByTagName('td')[1];
        if (itemName) {
            const textValue = itemName.textContent || itemName.innerText;
            row.style.display = textValue.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
        }
    });
});





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