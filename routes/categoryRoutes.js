const express = require("express")
const { addCategory, addSubcategory, getCategory, modifyCategoryName, deleteCategory } = require("../controllers/categoryController")


const router = express.Router()

router.post("/addCategory", addCategory)
router.post("/addSubcategory", addSubcategory)

router.get("/getCategoryItems/:Category_Id", getCategory)
router.put("/modifyCategoryName/:Category_Id", modifyCategoryName)

router.delete("/deleteCategory/:Category_Id", deleteCategory)

module.exports = router