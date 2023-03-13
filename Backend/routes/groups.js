const express=require('express')

const router=express.Router()

const groupController=require('../controllers/groups')
const authenticateUser=require('../middleware/auth')

router.post('/creategroup',groupController.createGroup)

router.get('/getallgroups',authenticateUser.authenticate,groupController.getAllGroups)

module.exports=router