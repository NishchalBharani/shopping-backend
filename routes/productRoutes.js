import express from 'express';
import { getAllProducts, addProduct, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);

export default router;
