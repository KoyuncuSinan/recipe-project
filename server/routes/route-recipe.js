import express from "express";
import {getRecipe,singleRecipe,upload, createRecipe} from "../controllers/recipe-controller.js"



const router = express.Router()

router.get("/community/recipes", getRecipe)

router.get("/community/recipes/:id", singleRecipe)

router.post("/community/create", upload.single("picturePath"), createRecipe)



export default router;