const express = require("express")
const { addOrder, addOrderItems, OrderDelete } = require("../controllers/orderController")


const router= express.Router()

router.post("/addOrder", addOrder)
router.post("/addOrderItems", addOrderItems)

router.delete("/deleteOrder", OrderDelete)


module.exports=router