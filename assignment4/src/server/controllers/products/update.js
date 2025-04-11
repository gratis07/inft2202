import Product from '../../models/Product.js';
import { checkSchema } from 'express-validator';

export const updateRules = checkSchema({
  name: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Product name must be a string',
    },
    trim: true,
  },
  price: {
    in: ['body'],
    optional: true,
    isFloat: {
      errorMessage: 'Price must be a number',
    },
    toFloat: true,
  },
  stock: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Stock must be an integer',
    },
    toInt: true,
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
    trim: true,
  },
});


export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};