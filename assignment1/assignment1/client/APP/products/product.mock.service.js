// Product Service
class ProductService {
    constructor() {
      // Initialize localStorage with an empty array if it doesn't exist
      if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify([]));
      }
    }
  
    // List all products
    listProducts() {
      const products = JSON.parse(localStorage.getItem('products'));
      return products.map(product => new Product(product)); // Assuming Product model exists
    }
  
    // Find a product by ID
    findProduct(id) {
      const products = JSON.parse(localStorage.getItem('products'));
      const product = products.find(p => p.id === id);
      if (!product) throw new Error("That product doesn't exist!");
      return new Product(product); // Assuming Product model exists
    }
  
    // Create a new product
    createProduct(product) {
      const products = JSON.parse(localStorage.getItem('products'));
      const exists = products.some(p => p.name === product.name);
      if (exists) throw new Error('That product already exists!');
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }
  
    // Update an existing product
    updateProduct(product) {
      const products = JSON.parse(localStorage.getItem('products'));
      const index = products.findIndex(p => p.id === product.id);
      if (index === -1) throw new Error("That product doesn't exist!");
      products[index] = product;
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }
  
    // Delete a product
    deleteProduct(product) {
      const products = JSON.parse(localStorage.getItem('products'));
      const index = products.findIndex(p => p.id === product.id);
      if (index === -1) throw new Error("That product doesn't exist!");
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      return true;
    }
  }
  
  // Default export
  export default new ProductService();