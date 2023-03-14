const express=require('express')
const router=express.Router();

const authenticateUser=require('../middleware/auth')

const userController=require('../controllers/users')

router.post('/signup',userController.signup)

router.post('/login',userController.login)

router.get('/getallloggedinusers',authenticateUser.authenticate,userController.getAllLoggedinUsers)

router.get('/getallusers',userController.getAllUsers)

router.get('/getrestusers/:groupId',userController.getRestUsers)

router.get('/getpresentusers/:groupId',authenticateUser.authenticate,userController.getPresentUsers)

module.exports=router