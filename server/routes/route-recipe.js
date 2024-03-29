import express from "express";
import {getRecipe,singleRecipe,upload,deleteRecipe, createRecipe,bookmarked, invoke} from "../controllers/recipe-controller.js"
import {verifyToken} from "../middlewares/middle-auth.js"



const router = express.Router()
router.get("/", invoke)
router.get("/community/recipes", getRecipe)

router.get("/community/recipes/:id", singleRecipe)

router.post("/community/recipes/:id",bookmarked)
router.post("/community/create", upload.single("picturePath"), verifyToken, createRecipe)
router.post("/community/recipes/:id/delete",deleteRecipe)



export default router;