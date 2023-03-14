const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserGroup = require('../models/usergroups')
const { Op } = require("sequelize");

exports.signup = async (req, res) => {

    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) {
            res.json({ message: "user already exists" })
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                console.log(err)
                await User.create({ name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, password: hash,isloggedin:false })
                res.status(201).json({ message: "successfully created new user" })
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

function generateAccessToken(id){
    return jwt.sign({userId: id}, "bobyiskuldeep")
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            res.status(404).json({ message: "user not found" })
        }
        else {
            bcrypt.compare(password, user.password, async(err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Something went wrong" })
                }
                if (result == true) {
                    await User.update({isloggedin:true},{where:{id:user.id}})
                    res.status(200).json({ success: true, message: "user login successfull", token: generateAccessToken(user.id),name:user.name })
                }
                else {
                    res.status(400).json({ success: false, message: "incorrect password" })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getAllLoggedinUsers=async(req,res)=>{
    try {
        console.log(req.user)
        const loggedinusers=await User.findAll({where:{isloggedin:true}})
        res.status(200).json({loggedinusers})
    } catch (error) {
        console.log(error)
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        const users=await User.findAll({})
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
    }
}

exports.getRestUsers=async(req,res)=>{
    try {
        const groupId=req.params.groupId
        console.log(groupId)
        const present_users=await UserGroup.findAll({where:{groupId:groupId}})
        console.log(present_users[0].dataValues)
        const users=await User.findAll({})
        let Rest_users=[]
        for (let i = 0; i < users.length; i++) {
            const user = users[i].dataValues;
            console.log(user)
            let flag=true
            for (let j = 0; j < present_users.length; j++) {
                const present_user = present_users[j].dataValues;
                console.log(present_user)
                if(user.id==present_user.userId){
                    flag=false
                }
            }
            if(flag==true){
                Rest_users.push([user.id,user.name])
            }
        }
        console.log(Rest_users)
        res.status(200).json({Rest_users})
        // const users=await User.findAll({
        //     attributes:['id','name'],
        //     include:[{
        //         model:UserGroup,
        //         attributes:[]
        //     }]
        //     ,group:['id']
        // })
        // res.json(users)
    } catch (error) {
        console.log(error)
    }
}

exports.getPresentUsers=async(req,res)=>{
    try {
        const groupId=req.params.groupId
        const PresentUsers=[]
        const Users=await User.findAll({})
        const UsersGroup=await UserGroup.findAll({where:{
            [Op.and]:[
                {groupId:groupId},
                {[Op.not]:[{userId:req.user.id}]}
            ]
        }})
        
        for (let i = 0; i < UsersGroup.length; i++) {
            const usergroup = UsersGroup[i].dataValues;
            for (let j = 0; j < Users.length; j++) {
                const user = Users[j].dataValues;
                if(usergroup.userId==user.id){
                    PresentUsers.push([user.id,user.name])
                }
            }
        }
        res.status(200).json({PresentUsers})
    } catch (error) {
        console.log(error)
    }
}