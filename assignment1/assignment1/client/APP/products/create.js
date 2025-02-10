document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');
    const submitButton = document.getElementById('submit-button');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        formTitle.textContent = 'Edit Product';
        submitButton.textContent = 'Update';
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                name: form.name.value,
                price: parseFloat(form.price.value),
                stock: parseInt(form.stock.value),
                description: form.description.value
            };

            console.log('Form Data:', formData);

            if (productId) {
                // Update existing product
                updateProduct(productId, formData);
            } else {
                // Create new product
                createProduct(formData);
            }
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

    function createProduct(product) {
        // Simulate product creation
        console.log('Creating product:', product);
        // Redirect to search.html after successful creation
        window.location.href = 'search.html';
    }

    function updateProduct(id, product) {
        // Simulate product update
        console.log(`Updating product with ID ${id}:`, product);
        // Redirect to search.html after successful update
        window.location.href = 'search.html';
    }
});