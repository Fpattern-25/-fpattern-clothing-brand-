import { Router } from 'express';
import { protect, admin } from '../middleware/auth.js';
import { createPaymentIntent, getAllOrders, myOrders, placeOrder } from '../controllers/orderController.js';

const router = Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/place', protect, placeOrder);
router.get('/my', protect, myOrders);
router.get('/', protect, admin, getAllOrders);

export default router;
