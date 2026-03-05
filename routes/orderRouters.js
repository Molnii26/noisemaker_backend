const express = require("express")
const { addOrder, addOrderItems } = require("../controllers/orderController")


const router= express.Router()

router.post("/addOrder", addOrder)
router.post("/addOrderItems", addOrderItems)




module.exports=router