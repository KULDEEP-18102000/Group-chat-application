const File=require('../models/files')
const S3service=require('../services/S3services')

exports.CreateFile=async(req,res)=>{
    try {
        const { groupId } = req.body
        console.log(groupId)
        const { img } = await req.files;
        console.log(img)
        const filename = `File/${new Date()}.jpg`
        const fileURl = await S3service.uploadToS3(img.data, filename)
        const file=await File.create({url:fileURl,userId:req.user.id,groupId:groupId})
        res.status(200).json({ fileURl,file, success: true })
        // // console.log("clicked")
        // console.log(req.files)
        // // const image=req.body.image
        // const groupId=req.params.groupId
        // const userId = req.user.id
        // const filename = `File${userId}/${new Date()}.jpg`
        // const fileURl = await S3service.uploadToS3(image, filename)
        // // await req.user.createFile({ fileURl: fileURl })
        // const file=await File.create({url:fileURl,userId:userId,groupId:groupId})
        // res.status(201).json({ file,fileURl, success: true })
    } catch (error) {
        console.log(error)
    }
}


exports.getAllFiles=async(req,res)=>{
    try {
        const groupId=req.params.groupId
        const files=await File.findAll({where:{groupId:groupId}})
        res.status(200).json({files})
    } catch (error) {
        console.log(error)
    }
}