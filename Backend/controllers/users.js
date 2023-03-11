const User=require('../models/users')
const bcrypt=require('bcryptjs')

exports.signup=async(req,res)=>{
    
    try {
        console.log("signup")
    console.log(req.body)
        const user=await User.findOne({where:{email:req.body.email}})
        if(user){
            res.json({ message: "user already exists" })
        }else{
            bcrypt.hash(req.body.password,10,async(err,hash)=>{
                console.log(err)
                await User.create({name:req.body.name,email:req.body.email,phoneNumber:req.body.phoneNumber,password:hash})
                res.status(201).json({ message: "successfully created new user" })
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}