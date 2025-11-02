import { Router } from 'express';
import { contact } from '../controllers/contactController.js';

const router = Router();

router.post('/', contact);

export default router;
