const express = require("express")
const { addCart, addCartItems } = require("../controllers/cartController")


const router= express.Router()

router.post("/addCart", addCart)
router.post("/addCartItems", addCartItems)




module.exports=router