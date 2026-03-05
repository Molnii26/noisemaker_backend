const express = require("express")
const { addProduct } = require("../controllers/productController")
const {auth} = require('../middleware/userMiddleware')
const {upload} = require('../middleware/uploadProductIMG')


const router= express.Router()

router.post("/addProduct", auth, upload.single('ProductIMG'), addProduct)

module.exports=router