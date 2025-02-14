document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        formTitle.textContent = 'Edit Product';
        submitButton.textContent = 'Update';
        // Load existing product data for editing
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id === productId);
        if (product) {
            form.name.value = product.name;
            form.price.value = product.price;
            form.stock.value = product.stock;
            form.description.value = product.description;
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                id: productId || Date.now().toString(), // Use existing ID or generate a new one
                name: form.name.value,
                price: parseFloat(form.price.value),
                stock: parseInt(form.stock.value),
                description: form.description.value
            };

            console.log('Form Data:', formData);

            // Save or update product
            saveProduct(formData);

            // Redirect to search.html
            window.location.href = 'search.html';
        }
    });

    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea');

        fields.forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.add('is-valid');
            }
        });

        return isValid;
    }

    function saveProduct(product) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const existingProductIndex = products.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            // Update existing product
            products[existingProductIndex] = product;
        } else {
            // Add new product
            products.push(product);
        }

        // Save to local storage
        localStorage.setItem('products', JSON.stringify(products));
    }
});