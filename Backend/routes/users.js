const express=require('express')
const router=express.Router();

const authenticateUser=require('../middleware/auth')

const userController=require('../controllers/users')

router.post('/signup',userController.signup)

router.post('/login',userController.login)

router.get('/getallloggedinusers',authenticateUser.authenticate,userController.getAllLoggedinUsers)

router.get('/getallusers',userController.getAllUsers)

module.exports=router