const express = require('express')
const router = express.Router()

const { registerUser, loginUser, logout, updatePassword,
    allUsers, forgetPassword, resetPassword, getUserProfile,
    updateProfile, getUserDetail, updateUser, deleteUser } = require('../controllers/authController')


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// ----------------------------------------------

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').get(logout)


router.route('/password/forget').post(forgetPassword)

router.route('/password/reset/:token').put(resetPassword)


router.route('/me').get(isAuthenticatedUser, getUserProfile)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)

router.route('/me/update').put(isAuthenticatedUser, updateProfile)


router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)

router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetail)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

// ------------------------------------------------

module.exports = router