const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRouters')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRouters = require('./routes/cartRoutes')


const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "https://nodejs304.dszcbaross.edu.hu"],
    credentials: true
}))



app.use('/users/', userRoutes)
app.use('/orders/', orderRoutes)
app.use('/categories/', categoryRoutes)
app.use('/products/', productRoutes)
app.use('/cart/', cartRouters)


module.exports = app