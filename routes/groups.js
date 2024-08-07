const express=require('express')

const router=express.Router()

const groupController=require('../controllers/groups')
const authenticateUser=require('../middleware/auth')

router.post('/creategroup',authenticateUser.authenticate,groupController.createGroup)

router.get('/getallgroups',authenticateUser.authenticate,groupController.getAllGroups)

router.get('/getAllAdmingroups',authenticateUser.authenticate,groupController.GetAllAdminGroups)

router.post('/addgroup',groupController.addGroup)

router.post('/removegroup',groupController.removeFromGroup)

router.post('/admingroup',groupController.MakeAdminOfGroup)

module.exports=router