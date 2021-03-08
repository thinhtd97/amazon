import express from 'express'
import { 
    createOrder, 
    getListOrders, 
    getMyOrders, 
    getOrderByID, 
    updateOrderToDelivery, 
    updateOrderToPaid } from '../controllers/orderControllers.js'
import { protect } from '../middleware/middlewares.js'
import { admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route("/").post(protect, createOrder).get(protect, admin, getListOrders)
router.route("/:id/delivery").put(protect, updateOrderToDelivery)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderByID)
router.route("/:id/pay").put(protect, updateOrderToPaid)


export default router