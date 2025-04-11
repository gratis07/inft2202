import { Router } from 'express';
import { createProduct, createRules  } from '../controllers/products/create.js';
import { retrieveProducts, retrieveProductById } from '../controllers/products/retrieve.js';
import { updateProduct, updateRules  } from '../controllers/products/update.js';
import { deleteProduct } from '../controllers/products/delete.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.post('/', createRules, validate, createProduct);
router.put('/:id', updateRules, validate, updateProduct);
router.get('/', retrieveProducts);
router.get('/:id', retrieveProductById);
router.delete('/:id', deleteProduct);

export default router;
