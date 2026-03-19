const express = require("express")
const { addCart, CartItemsShow, deleteCart, deleteCartItem, modifyCartItem } = require("../controllers/cartController")
const { auth } = require('../middleware/userMiddleware')

const router = express.Router()


router.get('/CartItems/:Cart_Item_Id', auth, CartItemsShow)
router.get('/CartItems/:Cart_Item_Id', auth, CartItemsShow)

router.post("/addCart", auth, addCart)

router.put("/modifyCartItem/:Cart_Item_Id", auth, modifyCartItem)

router.delete("/deleteCart/:Cart_Id", auth, deleteCart)
router.delete("/deleteCartItem/:Cart_Item_Id", auth, deleteCartItem)


module.exports = router