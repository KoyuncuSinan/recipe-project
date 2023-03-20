import express from "express";
import {profilePage} from "../controllers/profile-controller.js"

const router = express.Router()

router.get("/users/:id", profilePage)
export default router;