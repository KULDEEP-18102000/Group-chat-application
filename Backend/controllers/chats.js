const Chat = require('../models/chats')

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