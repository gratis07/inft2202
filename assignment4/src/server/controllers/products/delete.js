import Product from '../../models/Product.js';

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
