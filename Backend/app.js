const express=require('express')
const app=express()


const BodyParser=require('body-parser')
const cors=require('cors')

const sequelize=require('./util/database')

const userRoutes=require('./routes/users')
const chatRoutes=require('./routes/chats')

const User=require('./models/users')
const Chat=require('./models/chats')

User.hasMany(Chat)
Chat.belongsTo(User)


app.use(cors({
    origin:'http://127.0.0.1:5500'
}))

app.use(BodyParser.json({extended:false}))
console.log("app.js")

app.use('/user',userRoutes)
app.use('/chat',chatRoutes)

sequelize.sync({})
.then(()=>{
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})