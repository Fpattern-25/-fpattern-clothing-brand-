import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { addToCart, getCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';

const router = Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/item', protect, updateCartItem);
router.delete('/item/:itemId', protect, removeCartItem);

export default router;
