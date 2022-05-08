const express = require('express')
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
// All routes
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

// -------------------------------

if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'server/config/.env' })
}

// -------------------------------

const app = express()

// ---------------------------

app.use(express.json({ limit: '10mb' }))
app.use(errorMiddleware)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(fileUpload())

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)

// --------------------------------

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
    })
}

module.exports = app