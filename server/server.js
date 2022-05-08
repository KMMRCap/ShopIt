const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabase = require('./config/database')

// -----------------------------------------

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'server/config/.env' })
}

// ----------------------------------------------

process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// ----------------------------------

connectDatabase()

// --------------------------------

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ---------------------------------------

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// -----------------------------------------

// Handle Unhandled Promise rejectons
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.stack}`)
    console.log(`Shutting down the server due to unhandled Promise rejection`)
    server.close(() => {
        process.exit(1)
    })
})