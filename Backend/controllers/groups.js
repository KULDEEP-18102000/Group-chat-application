const Group = require('../models/groups')
const UserGroup = require('../models/usergroups')

exports.createGroup = async (req, res) => {
    try {
        const group = await Group.create({ groupName: req.body.group_name })
        const users = req.body.users
        console.log(users)
        users.forEach(async (user) => {
            await UserGroup.create({ groupId: group.id, userId: user})
        });
        // await UserGroup.create({ groupId: group.id, userId: req.user.id })
        res.status(200).json({message:"successfully created group"})
    } catch (error) {
        console.log(error)
    }
}

exports.getAllGroups=async(req,res)=>{
    try {
        var groupNames=[]
        console.log(req.user.id)
        const groupIds=await UserGroup.findAll({where:{userId:req.user.id}})
        // console.log(groupIds.dataValues)
        // groupIds.forEach(async(groupId)=>{
        //     console.log(groupId.dataValues.groupId)
        //     const groupName=await Group.findOne({where:{id:groupId.dataValues.groupId}})
        //     console.log(groupName.dataValues.groupName)
        //     groupNames.push(groupName.dataValues.groupName)
        //     console.log(groupNames)
        // })
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i];
            console.log(groupId.dataValues.groupId)
            const groupName=await Group.findOne({where:{id:groupId.dataValues.groupId}})
            console.log(groupName.dataValues.groupName)
            groupNames.push(groupName.dataValues.groupName)
            console.log(groupNames)
        }
        console.log(groupNames)
        res.status(200).json({groupNames,groupIds})
    } catch (error) {
        console.log(error)
    }
}