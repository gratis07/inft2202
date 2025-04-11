import Product from '../../models/Product.js';
import { checkSchema } from 'express-validator';

export const createRules = checkSchema({
  name: {
    in: ['body'],
    exists: {
      errorMessage: 'Product name is required',
    },
    isString: {
      errorMessage: 'Product name must be a string',
    },
    trim: true,
  },
  price: {
    in: ['body'],
    exists: {
      errorMessage: 'Price is required',
    },
    isFloat: {
      errorMessage: 'Price must be a number',
    },
    toFloat: true,
  },
  stock: {
    in: ['body'],
    exists: {
      errorMessage: 'Stock is required',
    },
    isInt: {
      errorMessage: 'Stock must be an integer',
    },
    toInt: true,
  },
  description: {
    in: ['body'],
    exists: {
      errorMessage: 'Description is required',
    },
    isString: {
      errorMessage: 'Description must be a string',
    },
    trim: true,
  },
});


export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
