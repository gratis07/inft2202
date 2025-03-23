import productservice from "../product.service.js";

async function product(name) {
    const form = document.createElement('form');
    let description = 'Add product';
    let product = null;

    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        // Create product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product != null ? product.name : ""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">Product Name</label>' +
            (product != null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3price = document.createElement('div');
        mb3price.classList.add('mb-3');
        mb3price.innerHTML = '<label for="price" class="form-label">Product Price</label>' +
            `<input type="text" class="form-control" id="price" name="price" value="${product != null ? product.price : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3price);

        const mb3Stock = document.createElement('div');
        mb3Stock.classList.add('mb-3');
        mb3Stock.innerHTML = '<label for="stock" class="form-label">Number of Stock</label>' +
            `<input type="text" class="form-control" id="stock" name="stock" value="${product != null ? product.stock : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Stock);

        const mb3Description = document.createElement('div');
        mb3Description.classList.add('mb-3');
        mb3Description.innerHTML = '<label for="description" class="form-label">Product Description</label>' +
            `<input type="text" class="form-control" id="description" name="description" value="${product != null ? product.description : ""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Description);

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save product <i class="fa-solid fa-check"></i>' +
            '</button>';
        container.append(submitBtn);

        form.append(container);
        return form;
    }

    function validate() {
        let valid = true;

        // Validate name
        const name = form.name.value;
        const eleNameError = form.name.nextElementSibling;
        if (name === "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }

        // Validate price
        const price = form.price.value;
        const elePriceError = form.price.nextElementSibling;
        if (price === "") {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "You must specify a price!";
            valid = false;
        } else if (isNaN(price)) {
            elePriceError.classList.remove('d-none');
            elePriceError.textContent = "Price must be a number.";
            valid = false;
        } else {
            elePriceError.classList.add('d-none');
        }

        // Validate stock
        const stock = form.stock.value;
        const eleStockError = form.stock.nextElementSibling;
        if (stock === "") {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "You must specify the stock quantity!";
            valid = false;
        } else if (isNaN(stock)) {
            eleStockError.classList.remove('d-none');
            eleStockError.textContent = "Stock must be a number.";
            valid = false;
        } else {
            eleStockError.classList.add('d-none');
        }

        // Validate description
        const description = form.description.value;
        const eleDescriptionError = form.description.nextElementSibling;
        if (description === "") {
            eleDescriptionError.classList.remove('d-none');
            eleDescriptionError.textContent = "You must provide a description!";
            valid = false;
        } else {
            eleDescriptionError.classList.add('d-none');
        }

        return valid;
    }

    async function submit(action) {
        const valid = validate();
        if (valid) {
            console.log('Form is valid');

            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'description' || key === 'stock') {
                    productObject[key] = Number(value);
                } else {
                    productObject[key] = value;
                }
            });

            const eleNameError = form.name.nextElementSibling;
            try {
                if (action === "new") {
                    await productservice.saveproduct([productObject]);
                } else {
                    await productservice.updateproduct(productObject);
                }
                eleNameError.classList.add('d-none');
                form.reset();
                window.location = './list.html';
            } catch (error) {
                console.error('Error:', error);
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "An error occurred. Please try again.";
            }
        } else {
            console.log('Form is not valid');
        }
    }

    if (!name) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submit("new");
        });
    } else {
        description = 'Update product';
        try {
            let ret = await productservice.findproduct(name);
            if (ret.length === 0) {
                throw 'No record';
            }
            product = ret[0];
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                submit("update");
            });
        } catch (err) {
            description = err;
            const eleMessage = document.createElement('div');
            eleMessage.classList.add('alert', 'alert-danger', 'text-center');
            eleMessage.textContent = description;
            form.append(eleMessage);
        }
    }

    return {
        description,
        element: createContent()
    };
}

export default product;