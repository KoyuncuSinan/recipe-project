import express from "express";
import {getRecipe} from "../controllers/cont-recipe.js"


const router = express.Router()

router.get("/community/recipes", getRecipe)



export default router;