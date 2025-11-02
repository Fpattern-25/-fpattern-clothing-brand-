import { Router } from 'express';
import { admin, protect } from '../middleware/auth.js';
import { 
  salesSummary, 
  getAllOrders, 
  updateOrderStatus,
  getAllProducts,
  updateProductStock,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/adminController.js';

const router = Router();

router.get('/stats', protect, admin, salesSummary);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:orderId/status', protect, admin, updateOrderStatus);
router.get('/products', protect, admin, getAllProducts);
router.post('/products', protect, admin, createProduct);
router.put('/products/:productId', protect, admin, updateProduct);
router.put('/products/:productId/stock', protect, admin, updateProductStock);
router.delete('/products/:productId', protect, admin, deleteProduct);

export default router;