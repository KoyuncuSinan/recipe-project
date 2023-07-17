import express from "express";
import {login, register} from "../controllers/auth-controller.js"
import {upload} from "../controllers/recipe-controller.js"

const router = express.Router();


router.post("/register", upload.single("picturePath"), register)
router.post("/login", login)


export default router;