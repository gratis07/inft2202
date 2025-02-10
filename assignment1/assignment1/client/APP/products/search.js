document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', description: 'Description of Product 4', price: 49.99, image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Product 5', description: 'Description of Product 5', price: 59.99, image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Product 6', description: 'Description of Product 6', price: 69.99, image: 'https://via.placeholder.com/150' },
    ];

    const productsPerPage = 3;
    let currentPage = 1;

    const productList = document.getElementById('product-list');
    const paginationControls = document.getElementById('pagination-controls');

    function displayProducts(page) {
        productList.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = products.slice(start, end);

        if (paginatedProducts.length === 0) {
            productList.innerHTML = '<div class="col-12 text-center"><p>The shop is currently closed.</p></div>';
            return;
        }

        paginatedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary">Add to Cart</button>
                        <button class="btn btn-warning" data-bs-toggle="tooltip" title="Edit" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger delete-btn" data-bs-toggle="tooltip" title="Delete" data-product-id="${product.id}" data-bs-toggle="modal" data-bs-target="#confirmationModal"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });

        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    function setupPagination() {
        paginationControls.innerHTML = '';
        const pageCount = Math.ceil(products.length / productsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary mx-1';
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                displayProducts(currentPage);
            });
            paginationControls.appendChild(button);
        }
    }

    function editProduct(productId) {
        window.location.href = `edit.html?id=${productId}`;
    }

    // Handle Delete Confirmation
    document.body.addEventListener('click', function (event) {
        if (event.target.closest('.delete-btn')) {
            const productId = event.target.closest('.delete-btn').getAttribute('data-product-id');
            document.getElementById('confirmDelete').setAttribute('data-product-id', productId);
        }
    });

    document.getElementById('confirmDelete').addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        console.log(`Deleting product with ID: ${productId}`);
        products.splice(products.findIndex(p => p.id == productId), 1);
        $('#confirmationModal').modal('hide');
        displayProducts(currentPage);
        setupPagination();
    });

    displayProducts(currentPage);
    setupPagination();
});
