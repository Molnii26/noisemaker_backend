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

const path = require("path")

app.use(
    "/uploads/products",
    express.static(path.join(process.cwd(), "uploads", "products"))
)

app.use(cors({
    origin: ["http://localhost:5173", "https://noisemakerfrontend.netlify.app"],
    credentials: true
}))



app.use('/users/', userRoutes)
app.use('/orders/', orderRoutes)
app.use('/categories/', categoryRoutes)
app.use('/products/', productRoutes)
app.use('/cart/', cartRouters)


module.exports = app