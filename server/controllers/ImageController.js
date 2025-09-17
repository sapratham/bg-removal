import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

// Controller function to remove bg from image

const removeBgImage = async (req,res) =>{
    try{
      
        const {clerkId} = req.body

        const user = await userModel.findOne({clerkId})

        if(!user){
            return res.json({success:false ,message:'User Not Found'})
        }

        if(user.creditBalance === 0){
            return res.jsong({success:false, message:'No Credit Balance' , creditBalance:user.creditBalance})
        }

        const imagePath = req.file.path;

        // Reading the image file
        const imageFile = fs.createReadStream(imagePath)

        const formdata = new FormData()
        formdata.append('image_file',imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/cleanup/v1',formdata,{
            headers:{
                'x-api-key': process.env.CLIPDROP_API
            },
            responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data ,'binary').toString('base64')

        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance - 1})

        res.jsong({success:true, resultImage, creditBalance: user.creditBalance-1 , message:'Background Remove'})

    } catch (error){
        console.log(error)
        toast.error(error.message)            
    }
}

export {removeBgImage}