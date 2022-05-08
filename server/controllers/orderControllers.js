const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    orderItems.forEach(async item => {
        const product = await Product.findById(item.product)
        product.stock = product.stock - item.quantity
        await product.save()
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No order found with this id', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Admin : Get all orders => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({})

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

// Admin : Update/Process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderStatus = req.body.status
    if (order.orderStatus === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save()

    res.status(200).json({
        success: true,
    })
})

// Admin : Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this id', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        order
    })
})