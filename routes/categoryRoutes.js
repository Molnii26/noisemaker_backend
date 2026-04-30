const express = require("express")
const { addCategory, addSubcategory, modifyCategoryName, deleteCategory, getCategoryItems, getSubcategoryItems, modifySubcategory, deleteSubcategory, getCategoryAll, getSubcategoryAll } = require("../controllers/categoryController")

const router = express.Router()


router.get("/getCategoryAll", getCategoryAll)
router.get("/getCategoryItems/:Category_Id", getCategoryItems)
router.get("/getSubcategoryAll", getSubcategoryAll)
router.get("/getSubcategoryItems/:Subcategory_Id", getSubcategoryItems)

router.post("/addCategory", addCategory)
router.post("/addSubcategory", addSubcategory)

router.put("/modifySubcategory/:Subcategory_Id", modifySubcategory)
router.put("/modifyCategoryName/:Category_Id", modifyCategoryName)

router.delete("/deleteSubcategory/:Subcategory_Id", deleteSubcategory)
router.delete("/deleteCategory/:Category_Id", deleteCategory)


module.exports = router