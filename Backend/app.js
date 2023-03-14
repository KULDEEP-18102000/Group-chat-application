const express = require('express')
const app = express()
const path=require('path')

const dotenv = require('dotenv')
dotenv.config()

const BodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./util/database')

const userRoutes = require('./routes/users')
const chatRoutes = require('./routes/chats')
const groupRoutes = require('./routes/groups')

const User = require('./models/users')
const Chat = require('./models/chats')
const Group = require('./models/groups')
const UserGroup = require('./models/usergroups')

User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)

Group.belongsToMany(User, { through: UserGroup })
User.belongsToMany(Group, { through: UserGroup })

app.use(cors({
    // origin: 'http://127.0.0.1:3000'
    // origin: `${process.env.HOST}`
}))

app.use(BodyParser.json({ extended: false }))
console.log("app.js")

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/group', groupRoutes)

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