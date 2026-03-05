const express = require("express")
const { register, login, logout, whoAmI ,getCityByPostalCode, adminRegister } = require("../controllers/userController")
const {auth} = require('../middleware/userMiddleware')


const router= express.Router()

router.post('/register', register)
router.post('/adminRegisztracio', adminRegister)

router.post('/login', login)
router.get("/whoami", auth, whoAmI)


router.get('/logout', auth, logout)

router.get('/postal/:postalCode', getCityByPostalCode)


module.exports=router