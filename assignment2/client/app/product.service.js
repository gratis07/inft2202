/*
 *  Since we are using the regular function keyword, 
 *   we can export our service instance up here.
 */
export default new productService({
    host: 'https://inft2202-server.onrender.com/',
    //host: 'http://localhost:3091',
    user: 'your student id'
});

/*
 *  Constructor
 */
function productService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        'Content-Type': 'application/json',
        user
    });
}

/*
 *
 */
productService.prototype.findproduct = async function(name) {
    const url = new URL(`/api/products/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}
/*
 *
 */
productService.prototype.getproductPage = async function({ page = 1, perPage = 8 }) 
{
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/products?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
productService.prototype.saveproduct = async function(products) 
{
    const url = new URL(`/api/products`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(products)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
productService.prototype.updateproduct = async function(product) 
{
    const url = new URL(`/api/products`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'PUT',
        body: JSON.stringify(product)
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
productService.prototype.deleteproduct = async function(name) {
    const url = new URL(`/api/products/${name}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'DELETE',
    });
    try {
        const res = await fetch(req);
        if (res.status === 204) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}