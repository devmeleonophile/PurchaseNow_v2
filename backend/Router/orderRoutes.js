import express from 'express'
import { addOrderItems, getAllOrders, getMyorder, getOrderById, updateOrdersToDelivered, updateOrdersToPaid } from '../Controllers/orderController.js';
import { protect, Admin } from '../Middlewares/authMiddleware.js';


const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, Admin, getAllOrders);
router.route('/mine').get(protect, getMyorder)
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrdersToPaid);
router.route('/:id/todeliver').put(protect,Admin, updateOrdersToDelivered);

export default router