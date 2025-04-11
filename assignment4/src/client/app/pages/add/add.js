
import tmplAdd from './add.ejs';
import productService from '../../services/product.service.js'

var productId = null;
export default async () => {
    const strAdd = tmplAdd();
    onInit();
    document.getElementById('app').innerHTML = strAdd;
    onRender();
}

function onInit() {
  const urlParams = new URLSearchParams(window.location.search);
  productId = urlParams.get('id');
}

function onRender() {
  const form = document.getElementById('product-form');
  const formHeading = document.getElementById('form-heading');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (productId) {
    // Edit mode
    formHeading.textContent = 'Edit Product';
    formSubmitBtn.textContent = 'Update Product';

    // Fetch product details and populate the form
    productService.findProduct(productId).then(product => {
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-stock').value = product.stock;
      document.getElementById('product-description').value = product.description;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateProductForm(form)) {
        const updatedProduct = {
          name: form['product-name'].value,
          price: parseFloat(form['product-price'].value),
          stock: parseInt(form['product-stock'].value),
          description: form['product-description'].value,
        };

        productService.updateProduct(productId, updatedProduct).then(() => {
          window.location.href = 'list';
        }).catch(error => {
          showMessage(error.message);
        });
      }
    });
  } else {
    // Add mode
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateProductForm(form)) {
        const product = {
          name: form['product-name'].value,
          price: parseFloat(form['product-price'].value),
          stock: parseInt(form['product-stock'].value),
          description: form['product-description'].value,
        };

        productService.addProduct(product).then(() => {
          window.location.href = 'list';
        }).catch(error => {
          showMessage(error.message);
        });
      }
    });
  }
}

export function validateProductForm(form) {
  let isValid = true;

  // Validate product name
  const name = form['product-name'].value;
  const nameError = form['product-name'].nextElementSibling;
  if (!name) {
    nameError.textContent = 'Please enter the product name.';
    nameError.classList.remove('d-none');
    isValid = false;
  } else {
    nameError.classList.add('d-none');
  }

  // Validate product price
  const price = form['product-price'].value;
  const priceError = form['product-price'].nextElementSibling;
  if (!price || isNaN(price) || parseFloat(price) < 0) {
    priceError.textContent = 'Please enter a valid product price.';
    priceError.classList.remove('d-none');
    isValid = false;
  } else {
    priceError.classList.add('d-none');
  }

  // Validate product stock
  const stock = form['product-stock'].value;
  const stockError = form['product-stock'].nextElementSibling;
  if (!stock || isNaN(stock) || parseInt(stock) < 0) {
    stockError.textContent = 'Please enter a valid stock quantity.';
    stockError.classList.remove('d-none');
    isValid = false;
  } else {
    stockError.classList.add('d-none');
  }

  // Validate product description
  const description = form['product-description'].value;
  const descriptionError = form['product-description'].nextElementSibling;
  if (!description) {
    descriptionError.textContent = 'Please enter the product description.';
    descriptionError.classList.remove('d-none');
    isValid = false;
  } else {
    descriptionError.classList.add('d-none');
  }

  return isValid;
}

function showMessage(message) {
  const messageBox = document.createElement('div');
  messageBox.className = 'alert alert-danger';
  messageBox.textContent = message;
  document.body.prepend(messageBox);
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
}


 