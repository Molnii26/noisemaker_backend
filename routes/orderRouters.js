const express = require("express")
const { addOrder, OrderDelete, OrdersAll, OrdersMine, TotalOrder, StatusModify, getCityByPostalCode } = require("../controllers/orderController")
const {auth} = require('../middleware/userMiddleware')

const router= express.Router()

router.post("/addOrder",auth, addOrder)
//router.post("/addOrderItems", addOrderItems)



router.get("/allOrders", OrdersAll)
router.get("/myOrders", auth, OrdersMine)

router.get("/TotalOrderPrice/:Order_Id", auth, TotalOrder)

router.delete('/deleteOrder/:Order_Id', auth, OrderDelete)

router.put("/orderStatusModify/:Order_Id", StatusModify)
router.get('/postal/:postalCode', getCityByPostalCode)

module.exports=router