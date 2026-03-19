const express = require("express")
const { addCategory, addSubcategory, modifyCategoryName, deleteCategory, getCategoryItems, getSubcategoryItems, modifySubcategory, deleteSubcategory, getCategoryAll, getSubcategoryAll } = require("../controllers/categoryController")


const router = express.Router()

router.get("/getCategoryAll", getCategoryAll)

router.get("/getCategoryItems/:Category_Id", getCategoryItems)
router.post("/addCategory", addCategory)
router.put("/modifyCategoryName/:Category_Id", modifyCategoryName)
router.delete("/deleteCategory/:Category_Id", deleteCategory)

router.get("/getSubcategoryAll", getSubcategoryAll)
router.get("/getSubcategoryItems/:Subcategory_Id", getSubcategoryItems)
router.post("/addSubcategory", addSubcategory)
router.put("/modifySubcategoryName/:Subcategory_Id", modifySubcategory)
router.delete("/deleteSubcategory/:Subcategory_Id", deleteSubcategory)



module.exports = router