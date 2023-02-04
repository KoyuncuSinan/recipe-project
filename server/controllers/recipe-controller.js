import Recipe from "../models/Recipe-model.js"
import mongoose from "mongoose";
import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3" 
import {verifyToken} from "../middlewares/middle-auth.js";
import dotenv from "dotenv";
import router from "../routes/route-auth.js";

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
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg"){
        cb(null,true)
    } else {
        cb(null,false)
    }
};

const upload = multer({storage:storage, fileFilter: filefilter});

router.post("/create", upload.single("picturePath"),(req,res) => {
    console.log(req.file)

    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        picturePath: req.file.location,
        ingredients: req.body.ingredients
    });

    recipe.save().then(result => {
        res.status(200).send({
            _id: result._id,
            title: result.title,
            description: result.description,
            picturePath: result.picturePath,
            ingredients: result.ingredients,
        })
    })
})


export default router;















export const createRecipe = async(req,res) => {
    try{
        const {
            title,
            description,
            picturePath,
            ingredients,
        } = req.body;

        const newRecipe = new Recipe({
            title,
            description,
            picturePath,
            ingredients,
        });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe)

    } catch (err){
        res.status(500).json({error: err.message})
    }
}

export const getRecipes = async(req,res) => {
    try{
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err){
        res.status(500).json({error: err.message})
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