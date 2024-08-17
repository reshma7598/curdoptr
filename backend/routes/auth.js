const express=require('express')
const { logincontroller, registerController } = require('../controllers/authController')

const router=express.Router()


router.post('/login',logincontroller)
router.post('/register',registerController)





module.exports=router