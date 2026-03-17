const express = require("express")
const { addProduct, getProduct, deleteProduct, modifyProduct } = require("../controllers/productController")
const {auth} = require('../middleware/userMiddleware')
const {upload} = require('../middleware/uploadProductIMG')


const router= express.Router()

router.post("/addProduct", auth, upload.single('ProductIMG'), addProduct)
router.get("/getProduct/:Product_Id", getProduct)

router.delete("/deleteProduct/:Product_Id", deleteProduct)
router.put("/modifyProduct", modifyProduct)


module.exports=router