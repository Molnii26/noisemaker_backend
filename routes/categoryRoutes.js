const express = require("express")
const { addCategory, addSubcategory } = require("../controllers/categoryController")


const router= express.Router()

router.post("/addCategory", addCategory)
router.post("/addSubcategory", addSubcategory)




module.exports=router