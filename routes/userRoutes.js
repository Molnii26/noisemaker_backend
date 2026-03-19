const express = require("express")
const { register, login, logout, whoAmI, userModify, userDelete, adminRegister, userModifyInAdmin, getAllUsers } = require("../controllers/userController")

const { auth } = require('../middleware/userMiddleware')


const router = express.Router()



router.get("/getAllUsers", getAllUsers)
router.post('/register', register)
router.post('/adminRegister', adminRegister)
router.post('/login', login)

router.delete('/deleteUser/:User_Id', auth, userDelete)
router.put('/userModify/:User_Id', auth, userModify)
router.put('/userModifyInAdmin/:User_Id', auth, userModifyInAdmin)

router.get("/whoami", auth, whoAmI)

router.get('/logout', auth, logout)



module.exports = router