import express from "express";
import {getComment, makeComment,deleteComment} from "../controllers/comment-controller.js"
const router = express.Router()

router.post("/community/recipes/:id/comments", makeComment)
router.get("/community/recipes/:id/comments", getComment)
router.delete("/community/recipes/:id/comments/delete", deleteComment)

export default router;