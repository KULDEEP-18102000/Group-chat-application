const express=require('express')
const router=express.Router()

const authenticateUser=require('../middleware/auth')
const chatController=require('../controllers/chats')

router.post('/createmessage/:groupId',authenticateUser.authenticate,chatController.createMessage)

router.get('/getallchats',chatController.GetAllChats)

router.get('/getallchatsofgroup/:groupId',chatController.getAllChatsOfGroup)

module.exports=router