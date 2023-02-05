import Recipe from "../models/Recipe-model.js"

export const getRecipe = async(req,res) => {
    try{
        const recipe = await Recipe.find();
        res.status(200).json(recipe)

    } catch (err){
        res.status(500).json({error: err.message});
    }
}