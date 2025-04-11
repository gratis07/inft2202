import Product from '../../models/Product.js';

export const retrieveProducts = async (req, res) => {
    try {
        const { page = 1, perPage = 5 } = req.query;
        const skip = (page - 1) * perPage;

        const products = await Product.find().skip(parseInt(skip)).limit(parseInt(perPage));
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);

        res.json({
            products: products,
            totalPages: totalPages
        });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const retrieveProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

