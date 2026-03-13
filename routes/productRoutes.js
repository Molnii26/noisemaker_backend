const express = require("express")
const { addProduct, getProduct } = require("../controllers/productController")
const {auth} = require('../middleware/userMiddleware')
const {upload} = require('../middleware/uploadProductIMG')


const router= express.Router()

router.post("/addProduct", auth, upload.single('ProductIMG'), addProduct)
router.get("/getProduct/:Product_Id", getProduct)


module.exports=router