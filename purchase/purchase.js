document.addEventListener('DOMContentLoaded', () => {

document.getElementById('productSearch').addEventListener('focus', () => {
    let products = [];
    let cart = [];

    function fetchProducts(query) {
        $.ajax({
            url: 'search_products.php',
            type: 'GET',
            data: { query: query },
            dataType: 'json',  // Specify that we're expecting JSON
            success: function(data) {
                products = data;  // No need to parse if the server sends JSON
                displayProductList(products);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching products:", textStatus, errorThrown);
                // Optionally, display an error message to the user
            }
        });
    }

    function displayProductList(products) {
        const productList = $('#productList');
        productList.empty();
        products.forEach(product => {
            productList.append(`<li class="list-group-item" data-id="${product.id}" data-name="${product.name}" data-price="${product.unit_price}">
                ${product.name} - $${product.unit_price}
            </li>`);
        });
    }

    $('#productSearch').on('keyup', function() {
        const query = $(this).val();
        if (query.length > 0) {
            fetchProducts(query);
        } else {
            $('#productList').empty();
        }
    });


    $('#productList').on('click', 'li', function() {
        const productId = $(this).data('id');
        const productName = $(this).data('name');
        const productPrice = $(this).data('price');
        addToCart(productId, productName, productPrice);
    });


    function addToCart(id, name, price) {
        const existingProduct = cart.find(product => product.id === id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }


    function renderCart() {
        const cartItems = $('#cartItems');
        cartItems.empty();
        let totalAmount = 0;

        cart.forEach(product => {
            const totalCost = product.price * product.quantity;
            totalAmount += totalCost;

            cartItems.append(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td><input type="number" class="form-control quantity" data-id="${product.id}" value="${product.quantity}" min="1"></td>
                    <td>$${totalCost.toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-item" data-id="${product.id}">Remove</button></td>
                </tr>
            `);
        });

        $('#totalAmount').text(`$${totalAmount.toFixed(2)}`);
    }



    $('#cartItems').on('change', '.quantity', function() {
        const productId = $(this).data('id');
        const quantity = parseInt($(this).val());

        const product = cart.find(product => product.id === productId);
        if (product) {
            product.quantity = quantity;
            renderCart();
        }
    });



    $('#cartItems').on('click', '.remove-item', function() {
        const productId = $(this).data('id');
        cart = cart.filter(product => product.id !== productId);
        renderCart();
    });


    $('#sellBtn').on('click', function() {
        $.ajax({
            url: 'process_sale.php',
            type: 'POST',
            data: { cart: JSON.stringify(cart) },
            success: function(response) {
                alert(response);
                cart = [];
                renderCart();
            }
        });
    });
});


});