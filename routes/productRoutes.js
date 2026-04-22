const express = require("express")
const { addProduct, getProduct, deleteProduct, modifyProduct, getAllProducts } = require("../controllers/productController")
const { auth } = require('../middleware/userMiddleware')
const { upload } = require('../middleware/uploadProductIMG')

const router = express.Router()
router.use("/productImages", express.static("productImages"));


router.get("/getProduct/:Product_Id", getProduct)
router.get("/getAllProducts", getAllProducts)

router.post("/addProduct", auth, upload.single('ProductIMG'), addProduct)

router.delete("/deleteProduct/:Product_Id", auth, deleteProduct)

router.put("/modifyProduct/:Product_Id", auth, upload.single('ProductIMG'), modifyProduct)

module.exports = router