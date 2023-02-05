import Recipe from "../models/Recipe-model.js"
import mongoose from "mongoose";

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