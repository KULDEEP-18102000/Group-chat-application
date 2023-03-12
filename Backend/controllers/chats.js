const Chat = require('../models/chats')
const { Op } = require("sequelize");

exports.createMessage = async (req, res) => {
    try {
        const message = req.body.message
        if (message === "") {
            res.status(400).json({ message: "cant send empty message" })
        } else {
            const chat = await Chat.create({ message: message, userId: req.user.id })
            console.log(chat)
            res.status(200).json({ message: "successfully created chat" })
        }
    } catch (error) {
        console.log(error)
    }
}


exports.GetAllChats=async(req,res)=>{
    try {
        const last_message_id=req.query.last_message_id
        if(last_message_id===undefined){
            last_message_id=-1
        }
        const chats=await Chat.findAll({where:{
            id:{
                [Op.gt]:last_message_id
            }
        }})
        res.status(200).json({chats})
    } catch (error) {
        console.log(error)
    }
}