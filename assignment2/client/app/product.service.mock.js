/*
 *  Service constructor
 */
function productService() {

    // if there is no entry for products in local storage
    if (!localStorage.getItem('products')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // create a new entry in local storage and put an empty array in it        
        localStorage.setItem('products', JSON.stringify([]))
    }
}
/*
 *
 */
productService.prototype.getproducts = function () {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('products'));
}
productService.prototype.getproductPage = function ({ page = 1, perPage = 15 }) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // this will always be set, because we did it in the constructor
            let records = JSON.parse(localStorage.getItem('products'));
            let pagination = {
                page: page,
                perPage: perPage,
                pages: Math.ceil(records.length / perPage)
            }
            //for test purpose
            if (pagination.page == 2) {
                reject("No Serivce");
            }
            let start = (pagination.page - 1) * perPage;
            let end = start + perPage;
            resolve({
                records: records.slice(start, end),
                pagination
            });
        }, 500);
    });
}
/*
 *
 */
productService.prototype.getproductPage = async function({ page = 1, perPage = 8 }) {
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/products?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        const data = await res.json(); // Get the JSON data
        console.log(data); // Log the entire response to the console to inspect it
        return data;
    } catch (err) {
        return false;
    }
}


/*
 *
 */
productService.prototype.findproduct = function (productName) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (productName == 'name 0') {
                reject('No service');
            }
            else {
                const products = self.getproducts();
                const product = products.find(a => a.name == productName);
                if (!product) {
                    resolve([]);
                }
                resolve([product]);
            }
        }, 250);
    });
}
/*
 *
 */
productService.prototype.updateproduct = function (product) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(() => {
            if (product.name == 'name 0') {
                reject('No service');
            }
            else {
                const products = self.getproducts();
                const idx = products.findIndex(a => a.name == product.name);
                if (idx === -1) {
                    resolve(false);
                }
                products[idx] = product;
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }
        }, 250);
    });
}
/*
 *
 */
productService.prototype.deleteproduct = function (name) {
    return new Promise((resolve, reject) => {
        const self = this;
        setTimeout(function () {
            if (name == 'name 0') {
                reject('No service');
            }
            else {
                const products = self.getproducts();
                const idx = products.findIndex(a => a.name == name);
                if (idx === -1) {
                    resolve(false);
                }
                products.splice(idx, 1);
                localStorage.setItem('products', JSON.stringify(products));
                resolve(true);
            }
        }, 250);
    });
}

export default new productService();