const Sequelize=require('sequelize');

const sequelize=require('../util/database')

const ArchivedChat=sequelize.define('archivedchats',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message:{
        type:Sequelize.STRING
    }
})

module.exports=ArchivedChat;