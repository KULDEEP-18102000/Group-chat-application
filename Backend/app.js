const express=require('express')
const app=express()


const BodyParser=require('body-parser')
const cors=require('cors')

const sequelize=require('./util/database')

const userRoutes=require('./routes/users')


app.use(cors())

app.use(BodyParser.json({extended:false}))
console.log("app.js")

app.use('/user',userRoutes)

sequelize.sync({})
.then(()=>{
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})