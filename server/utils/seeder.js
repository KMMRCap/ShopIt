const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const connectDatabase = require('../config/database');

const products = require('../data/products.json');
const orders = require('../data/orders.json');
const users = require('../data/users.json');

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        await Order.deleteMany();
        console.log('Orders are deleted');

        await Order.insertMany(orders)
        console.log('All orders are added.')

        await User.deleteMany();
        console.log('Users are deleted');

        await User.insertMany(users)
        console.log('All users are added.')

        process.exit();

    }
    catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()