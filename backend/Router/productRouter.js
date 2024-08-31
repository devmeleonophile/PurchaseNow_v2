import express from 'express'
import Products from '../Model/ProductSchema.js';
const router = express.Router();
import { createProduct, getProducts, getProductsById, updateProduct } from '../Controllers/productController.js';
import { protect, Admin } from '../Middlewares/authMiddleware.js';


router.route('/').get(getProducts).post(protect, Admin, createProduct);
router.route('/:id').get(getProductsById).put(protect,Admin, updateProduct);

export default router