import productService from "../product.service.js";

async function product(name) {
    const form = document.createElement('form');
    let description = 'Add product';
    let product = null;
    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');
        //create product form content
        const mb3Name = document.createElement('div');
        mb3Name.classList.add('mb-3');
        let editableInput = `<input type="text" class="form-control" id="name" name="name">`;
        let readonlyInput = `<input type="text" class="form-control" id="name" name="name" value="${product!=null?product.name:""}" readonly>`;
        mb3Name.innerHTML = '<label for="name" class="form-label">product Name</label>' +
            (product!=null ? readonlyInput : editableInput) +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Name);

        const mb3price = document.createElement('div');
        mb3price.classList.add('mb-3');
        mb3price.innerHTML = '<label for="price" class="form-label">product price</label>' +
            `<input type="text" class="form-control" id="price" name="price" value="${product!=null?product.price:""}">` +
            '<p class="text-danger d-none"></p>';
        container.append(mb3price);
        
        const mb3Leg = document.createElement('div');
        mb3Leg.classList.add('mb-3');
        mb3Leg.innerHTML = '<label for="stocks" class="form-label">Number of stocks</label>' +
            '<input type="text" class="form-control" id="stocks" name="stocks">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Leg);
        
        const mb3Eye = document.createElement('div');
        mb3Eye.classList.add('mb-3');
        mb3Eye.innerHTML = '<label for="description" class="form-label">Number of description</label>' +
            '<input type="text" class="form-control" id="description" name="description">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Eye);
        
        const mb3Sound = document.createElement('div');
        mb3Sound.classList.add('mb-3');
        mb3Sound.innerHTML = '<label for="sound" class="form-label">Sound this product makes</label>' +
            '<input type="text" class="form-control" id="sound" name="sound">' +
            '<p class="text-danger d-none"></p>';
        container.append(mb3Sound);        

        const submitBtn = document.createElement('div');
        submitBtn.innerHTML = '<button type="submit" class="btn btn-primary">' +
            'Save product <i class="fa-solid fa-check"></i>' +
            '</button>';
        container.append(submitBtn);        
        ///
        form.append(container);
        return form;
    }
    function validate() {
        let valid = true;
        // validate form
        // test that name is valid
        const name = form.name.value;
        const eleNameError = form.name.nextElementSibling

        if (name == "") {
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "You must name this product!";
            valid = false;
        } else {
            eleNameError.classList.add('d-none');
        }

        // test that price is valid
        const price = form.price.value;
        const elepriceError = form.price.nextElementSibling
        if (price == "") {
            elepriceError.classList.remove('d-none');
            elepriceError.textContent = "What type of product is this?";
            valid = false;
        } else {
            elepriceError.classList.add('d-none');
        }

        const stocks = form.stocks.value;
        const elestocksError = form.stocks.nextElementSibling
        if (stocks == "") {
            elestocksError.classList.remove('d-none');
            elestocksError.textContent = "How many stocks does this product have?";
            valid = false;
        } else if (isNaN(stocks)) {
            elestocksError.classList.remove('d-none');
            elestocksError.textContent = "This must be a number.";
            valid = false;
        } else {
            elestocksError.classList.add('d-none');
        }

        const description = form.description.value; // check that these are numbers
        const sound = form.sound.value;
        // return if the form is valid or not
        return valid
    }    
    // create a handler to deal with the submit event
    async function submit(action) {
        // validate the form
        const valid = validate();
        // do stuff if the form is valid
        if (valid) {
            console.log('were good');

            const formData = new FormData(form);
            const productObject = {};
            formData.forEach((value, key) => {
                if (key === 'description' || key === 'stocks') {
                    productObject[key] = Number(value);
                }
                else {
                    productObject[key] = value;
                }
            });

            const eleNameError = form.name.nextElementSibling
            try {
                if(action=="new"){
                    await productService.saveproduct([productObject]);
                } else {
                    await productService.updateproduct(productObject)
                } 
                eleNameError.classList.add('d-none');
                form.reset();
                window.location = './list.html';
            } catch (error) {
                console.log(error);
                eleNameError.classList.remove('d-none');
                eleNameError.textContent = "This product already exists!";
            }
            // do nothing if it's not
        } else {
            console.log('were not good');
        }
    }
    
    if (!name) {
        // assign a handler to the submit event
        form.addEventListener('submit', function (event) {
            // prevent the default action from happening
            event.preventDefault();
            submit("new");
        });
    }
    else{
        description = 'Update product';
        try{
            let ret = await productService.findproduct(name);
            if(ret.length == 0){
                throw 'No record';
            }
            product = ret[0];
            form.addEventListener('submit', function (event) {
                // prevent the default action from happening
                event.preventDefault();
                submit("update");
            });
        }
        catch(err){
//show err on page
            description = err;
        }
    }

    return {
        description,
        element: createContent()
    }
}

export default product;
