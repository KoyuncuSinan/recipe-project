import express from "express";
import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3" 
import {verifyToken} from "../middlewares/middle-auth.js";
import Recipe from "../models/Recipe-model.js";
import dotenv from "dotenv";

const router = express.Router()

// router.post("/create", upload.single("picturePath"), verifyToken,)
// dotenv.config();

// const s3 = new aws.S3({
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRETACCESS_KEY,
//     region: process.env.S3_BUCKET_REGION,
// })

// const upload = () => multer({
//     storage: multerS3({
//         s3:s3,
//         bucket: process.env.AWS_BUCKET_NAME,
//         metadata:function(req,file,cb){
//             cb(null,{fieldName: file.fieldname})
//         },
//         key: function(req,file,cb){
//             cb(null,`${req.file.filename}-${Date.now().toString()}`)
//         },
//     }),
// })

// exports.setRecipeImage = (req,res,next) =>{
//     console.log(file)
//     const uploadSingle = upload().single("picturePath")

//     uploadSingle(req,res, async(err) => {
//         if(err) 
//             return res.status(400).json({success:false, message: err.message})

//         await Recipe

//         console.log(req.file)
//         res.status(200).json({data:req.file})
//     });
    
// };

