const express = require("express")
const { addCart, CartItemsShow  } = require("../controllers/cartController")
const { auth } = require('../middleware/userMiddleware')


const router = express.Router()



router.get('/CartItems/:Cart_Item_Id', auth, CartItemsShow)
router.post("/addCart", auth, addCart)

//router.delete("/deleteCart", deleteCart)

/* router.get('/api/CartTotal', auth, showCartTotal)
router.post('/api/deleteCart', auth, deleteCart)
router.put('/api/modfiyCart/', auth, modifyCart)  */



module.exports = router