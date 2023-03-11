import express from "express";
import {getRecipe,singleRecipe,upload, createRecipe} from "../controllers/recipe-controller.js"
import {verifyToken} from "../middlewares/middle-auth.js"



const router = express.Router()

router.get("/community/recipes", getRecipe)

router.get("/community/recipes/:id", singleRecipe)

router.post("/community/create", upload.single("picturePath"), verifyToken, createRecipe)



export default router;