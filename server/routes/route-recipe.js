import express from "express";
import {getRecipe,singleRecipe} from "../controllers/cont-recipe.js"


const router = express.Router()

router.get("/community/recipes", getRecipe)

router.get("/community/recipes/:id", singleRecipe)



export default router;