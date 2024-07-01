import express from 'express'
import Products from '../Model/ProductSchema.js';
const router = express.Router();
import { getProducts, getProductsById } from '../Controllers/productController.js';

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);

export default router