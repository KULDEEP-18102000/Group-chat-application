const cloudinary = require('cloudinary').v2;
const fs=require('fs')
const path=require('path')
const dotenv=require('dotenv')
const os=require('os')

dotenv.config();

const Cloudinary = async (img) => {

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  try {
    //Iimg is the data that will be written to the file 

    //the file path where the data will be written
    // console.log(img)
    const tempFilePath = path.join(os.tmpdir(), 'temp.jpg');

    //The method blocks the execution of the Node.js process until the write operation is complete
    fs.writeFileSync(tempFilePath, img);

    //result store the response from cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath);

    // console.log(result)

    return {
      url: result.secure_url
    };

  } catch (error) {
    return {
      error
    };
  }
};

module.exports={
    Cloudinary
}