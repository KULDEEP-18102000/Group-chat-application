const express = require('express')
const app = express()
const path=require('path')

const file = require('express-fileupload');
app.use(file());


const dotenv = require('dotenv')
dotenv.config()

const BodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./util/database')

const userRoutes = require('./routes/users')
const chatRoutes = require('./routes/chats')
const groupRoutes = require('./routes/groups')
const fileRoutes=require('./routes/files')

const User = require('./models/users')
const Chat = require('./models/chats')
const Group = require('./models/groups')
const UserGroup = require('./models/usergroups')
const File=require('./models/files')

User.hasMany(Chat)
Chat.belongsTo(User)

User.hasMany(File)
File.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)

Group.hasMany(File)
File.belongsTo(Group)

Group.belongsToMany(User, { through: UserGroup })
User.belongsToMany(Group, { through: UserGroup })

app.use(cors({
    // origin: 'http://127.0.0.1:3000'
    // origin: `${process.env.HOST}`
}))

const io=require('socket.io')(5000,{
    cors:{
        // origin:['http://127.0.0.1:3000']
        origin:['http://3.109.32.194:3000']
    }
})

io.on("connection",socket=>{
    console.log(socket.id)
    socket.on("send-message",message=>{
        socket.broadcast.emit("receive-message",message)
    })
    socket.on("image",url=>{
        socket.broadcast.emit("receive-image",url)
    })
})


app.use(BodyParser.json({ extended: false }))
console.log("app.js")

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/group', groupRoutes)
app.use('/file',fileRoutes)

app.use((req, res) => {
    console.log(req.url.split("?")[0])
    res.sendFile(path.join(__dirname, `public/${req.url.split("?")[0]}`))
})

sequelize.sync({})
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch((err) => {
        console.log(err)
    })