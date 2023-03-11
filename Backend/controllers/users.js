const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {

    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) {
            res.json({ message: "user already exists" })
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                console.log(err)
                await User.create({ name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, password: hash })
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
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({ success: false, message: "Something went wrong" })
                }
                if (result == true) {
                    res.status(200).json({ success: true, message: "user login successfull", token: generateAccessToken(user.id) })
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