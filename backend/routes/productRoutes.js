import express from 'express'
import { 
    createProduct,
    deleteProduct, 
    getProductID, 
    getProducts, 
    updateProduct,
    createReviews,
    getProductsTop} from '../controllers/productControllers.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'
const router = express.Router()

router.route('/top').get(getProductsTop)
router.route('/').post(protect, admin, createProduct).get(getProducts)
router.route('/:id/reviews').post(protect, createReviews)
router.route('/:id')
            .get(getProductID)
            .delete(protect, admin, deleteProduct)
            .put(protect, admin, updateProduct)
export default router