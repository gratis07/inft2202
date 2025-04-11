export const API_URL = 'http://inft2202.paclan.net/api';
export const API_KEY = '667307d670ac5daabdfcb619';

import axios from 'axios';

function ProductService(host, apikey) {
    this.host = host;
    this.apikey = apikey;
};
const productService = {
    async addProduct(product) {
        try {
            const response = await axios.post('/api/products', product);
            return response.data;
        } catch (error) {
            throw new Error('Error adding product: ' + error.response?.data?.message || error.message);
        }
    },

    async updateProduct(productId, updatedProduct) {
        try {
            const response = await axios.put(`/api/products/${productId}`, updatedProduct);
            return response.data;
        } catch (error) {
            throw new Error('Error updating product: ' + error.response?.data?.message || error.message);
        }
    },

    async findProduct(productId) {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching product: ' + error.response?.data?.message || error.message);
        }
    }
};

export default productService;
