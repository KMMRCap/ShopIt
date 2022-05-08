const express = require('express')
const router = express.Router()

const { getProducts, newProducts, getSingleProduct, updateProduct, getAdminProducts,
    deleteProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// -------------------------------------------------------

router.route('/products').get(getProducts)

router.route('/product/:id').get(getSingleProduct)

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)

router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newProducts)

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews')
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReview)

// ----------------------------------------------------------------

module.exports = router