import Recipe from "../models/Recipe-model.js"
import mongoose from "mongoose";
import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3" 
import {verifyToken} from "../middlewares/middle-auth.js";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRETACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
})

const storage = multerS3({
    s3:s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl:"public-read",
    metadata:function(req,file,cb){
        cb(null,{fieldName: file.fieldname})
    },
    key: function(req,file,cb){
        cb(null,`${file.originalname}-${Date.now().toString()}`)
    },
})

const filefilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/webp"){
        cb(null,true)
    } else {
        cb(null,false)
    }
};

export const upload = multer({storage:storage, fileFilter: filefilter});

export const createRecipe = async (req,res) => {
    try{
        console.log(req.file)
    
        const recipe = new Recipe({
            title: req.body.title,
            description: req.body.description,
            picturePath: req.file.location,
            ingredients: req.body.ingredients,
            owner: req.body.owner,
        });
    
        const result = await recipe.save();
        const user = await User.findOneAndUpdate(
            {_id: req.body.owner},
            {$push: {recipes: result._id}},
            {new:true}
        )
        res.status(200).send({
            user:user,
            _id: result._id,
            title: result.title,
            description: result.description,
            picturePath: result.picturePath,
            ingredients: result.ingredients,
            owner: result.owner,
        })
    }catch(err){
        return res.status(400).json({msg: "Something went wrong."})
    }
}

export const getRecipe = async(req,res) => {
    try{
        const recipe = await Recipe.find();
        res.status(200).json(recipe)

    } catch (err){
        res.status(500).json({error: err.message});
    }
}


export const singleRecipe = async(req,res) => {

    const recipeId = mongoose.Types.ObjectId(req.params.id)
    try{
        const recipe = await Recipe.findById(recipeId);

        if(!recipe){
            res.status(404).json("Can't find the recipe!");
            return
        }
        res.json(recipe)

    } catch(err){
        res.status(500).json({error: err.message})
    }
}

export const bookmarked = async(req,res) => {
    const {recipeId, userId} = req.body;

    try{
        const recipe = await Recipe.findById(recipeId)
        if(!recipe){
            return res.status(400).json({msg: "Recipe not found"})
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }

        const index = user.bookmarks.indexOf(recipeId)
        if(index === -1){
            user.bookmarks.push(recipeId)
            await user.save();
            res.json({msg: "Recipe bookmarked"})
        }else{
            user.bookmarks.splice(index, 1);
            await user.save();
            res.json({msg:"Bookmark removed"})
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"})
    }
}
