const express = require("express")
const { addCart, addCartItems,CartItemsShow  } = require("../controllers/cartController")
const { auth } = require('../middleware/userMiddleware')


const router = express.Router()

router.post("/addCart", addCart)
router.post("/addCartItems", addCartItems)

router.get('/CartItems', auth, CartItemsShow)
/* router.get('/api/CartTotal', auth, showCartTotal)
router.post('/api/deleteCart', auth, deleteCart)
router.put('/api/modfiyCart/', auth, modifyCart)  */



module.exports = router