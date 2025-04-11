import axios from 'axios';
import tmplList from './list.ejs';

export default async (route) => {
    const strList = tmplList();
    document.getElementById('app').innerHTML = strList;
    await onInit();
    onRender();
};

async function onInit() {
    await fetchAndRenderProducts();
}

async function fetchAndRenderProducts(page = 1, perPage = 5) {
    try {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block'; // Show spinner

        const response = await axios.get(`/api/products?page=${page}&perPage=${perPage}`);
        const { products, totalPages } = response.data;

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear existing products

        // Render products dynamically
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4';

            productCard.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <p class="card-text">Stock: ${product.stock}</p>
                        <p class="card-text">Description: ${product.description}</p>
                        <div class="d-flex w-100">
                            <a href="/add?id=${product._id}" class="text-primary me-2">Update</a>
                            <a href="javascript:void(0)" class="text-danger delete-btn" data-id="${product._id}">Delete</a>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });

        spinner.style.display = 'none'; // Hide spinner

        // Update pagination buttons
        document.getElementById('prev-page').style.display = page > 1 ? 'block' : 'none';
        document.getElementById('next-page').style.display = page < totalPages ? 'block' : 'none';
    } catch (error) {
        console.error('Error fetching products:', error);
        showError('Failed to load products.');
    }
}

function onRender() {
    let currentPage = 1;

    // Handle previous page
    document.getElementById('prev-page').addEventListener('click', async (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage -= 1;
            await fetchAndRenderProducts(currentPage, getPerPage());
            highlightCurrentPage(currentPage);
        }
    });

    // Handle next page
    document.getElementById('next-page').addEventListener('click', async (event) => {
        event.preventDefault();
        currentPage += 1;
        await fetchAndRenderProducts(currentPage, getPerPage());
        highlightCurrentPage(currentPage);
    });

    // Handle perPage change
    document.getElementById('perPage').addEventListener('change', async (event) => {
        const perPage = parseInt(event.target.value, 10);
        currentPage = 1; // Reset to the first page
        await fetchAndRenderProducts(currentPage, perPage);
        highlightCurrentPage(currentPage);
    });

    // Handle product deletion
    document.getElementById('product-list').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productId = event.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this product?')) {
                await deleteProduct(productId);
                await fetchAndRenderProducts(currentPage, getPerPage());
            }
        }
    });
}

async function deleteProduct(productId) {
    try {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block'; // Show spinner during delete action
        await axios.delete(`/api/products/${productId}`);
        spinner.style.display = 'none'; // Hide spinner
    } catch (error) {
        console.error('Error deleting product:', error);
        showError('Error deleting product.');
    }
}

function getPerPage() {
    return parseInt(document.getElementById('perPage').value, 10);
}

function highlightCurrentPage(page) {
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Page ${page}`;
    }
}

function showError(message) {
    const messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}
