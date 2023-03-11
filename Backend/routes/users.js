const express=require('express')
const router=express.Router();

const userController=require('../controllers/users')

console.log("useroutes")
router.post('/signup',userController.signup)

module.exports=router