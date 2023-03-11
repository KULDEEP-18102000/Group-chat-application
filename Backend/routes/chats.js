const express=require('express')
const router=express.Router()

const authenticateUser=require('../middleware/auth')
const chatController=require('../controllers/chats')

router.post('/createmessage',authenticateUser.authenticate,chatController.createMessage)

router.get('/getallchats',chatController.GetAllChats)

module.exports=router