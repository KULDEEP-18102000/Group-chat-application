const Group = require('../models/groups')
const UserGroup = require('../models/usergroups')
const { Op } = require("sequelize");

exports.createGroup = async (req, res) => {
    try {
        const group = await Group.create({ groupName: req.body.group_name })
        const users = req.body.users
        // console.log(users)
        users.forEach(async (user) => {
            if (user == req.user.id) {
                await UserGroup.create({ groupId: group.id, userId: user, isAdmin: true })
            }
            else {
                await UserGroup.create({ groupId: group.id, userId: user, isAdmin: false })
            }
        });
        // await UserGroup.create({ groupId: group.id, userId: req.user.id })
        res.status(200).json({ message: "successfully created group" })
    } catch (error) {
        console.log(error)
    }
}

exports.getAllGroups = async (req, res) => {
    try {
        var groupNames = []
        // console.log(req.user.id)
        const groupIds = await UserGroup.findAll({ where: { userId: req.user.id } })
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];
            // console.log(groupId.dataValues.groupId)
            const groupName = await Group.findOne({ where: { id: groupId.dataValues.groupId } })
            // console.log(groupName.dataValues.groupName)
            groupNames.push(groupName.dataValues.groupName)
            // console.log(groupNames)
        }
        // console.log(groupNames)
        res.status(200).json({ groupNames, groupIds })
    } catch (error) {
        console.log(error)
    }
}


exports.GetAllAdminGroups = async (req, res) => {
    try {
        var groupNames = []
        const groupIds = await UserGroup.findAll({
            where: {
                [Op.and]: [
                    { userId: req.user.id },
                    { isAdmin: true }
                ]
            }
        })
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];
            // console.log(groupId.dataValues.groupId)
            const groupName = await Group.findOne({ where: { id: groupId.dataValues.groupId } })
            // console.log(groupName.dataValues.groupName)
            groupNames.push(groupName.dataValues.groupName)
            // console.log(groupNames)
        }
        // console.log(groupNames)
        res.status(200).json({ groupNames, groupIds })
    } catch (error) {
        console.log(error)
    }
}


exports.addGroup = async (req, res) => {
    try {
        const groupId = req.body.group_Id
        const users = req.body.users
        console.log(users)
        users.forEach(async (user) => {
            // console.log(user)
            await UserGroup.create({ isAdmin: false, groupId: groupId, userId: user })
        })
        res.status(200).json({ message: "succesfully added them in group" })
    } catch (error) {
        console.log(error)
    }
}


exports.removeFromGroup = async (req, res) => {
    try {
        const groupId = req.body.group_Id
        const users = req.body.users
        console.log(users)
        users.forEach(async (user) => {
            // console.log(user)
            const usergroup=await UserGroup.findOne({where:{userId:user,groupId:groupId}})
            // console.log(usergroup)
            await usergroup.destroy()
        })
        res.status(200).json({message:"successfully deleted from group"})
    } catch (error) {
        console.log(error)
    }
}


exports.MakeAdminOfGroup=async(req,res)=>{
    try {
        const groupId = req.body.group_Id
        const users = req.body.users

        users.forEach(async (user) => {
            // console.log(user)
            const usergroup=await UserGroup.findOne({where:{userId:user,groupId:groupId}})
            // console.log(usergroup)
            await usergroup.update({isAdmin:true})
        })
        res.status(200).json({message:"sucessfully made them admin"})
    } catch (error) {
        console.log(error)
    }
}