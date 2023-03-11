const Sequelize=require('sequelize')

const sequelize=new Sequelize('chat-application','root','kuldeepjadon@18',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize