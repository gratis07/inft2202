
document.addEventListener('DOMContentLoaded', function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('product-table-body');

    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No products found.</td></tr>';
    } else {
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${product.description}</td>
                <td>
                    <a href="create.html?id=${product.id}" class="btn btn-sm btn-warning">Edit</a>
                    <button onclick="deleteProduct('${product.id}')" class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
});

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    window.location.reload(); // Refresh the page to reflect changes
}


const productsPerPage = 5; // Number of products per page
let currentPage = 1;

function renderTable(productsToShow) {
    const tableBody = document.getElementById('product-table-body');
    tableBody.innerHTML = '';
    productsToShow.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.description}</td>
            <td><button class="btn btn-info">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function renderPagination(totalProducts) {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    pagination.innerHTML = ''; // Clear pagination

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) pageItem.classList.add('active');
        pageItem.innerHTML = `
            <a class="page-link" href="#">${i}</a>
        `;
        pageItem.addEventListener('click', function() {
            currentPage = i;
            updatePage();
        });
        pagination.appendChild(pageItem);
    }
}