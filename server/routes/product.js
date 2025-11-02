import { Router } from 'express';
import { admin, protect } from '../middleware/auth.js';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
