import User from "../models/User.js";
import Comment from "../models/Comment-model.js";
import mongoose from "mongoose";
import Recipe from "../models/Recipe-model.js";
import dotenv from "dotenv";

dotenv.config();

export const getComment = async (req, res) => {
  try {
    const recipeId = mongoose.Types.ObjectId(req.params.id);
    console.log("recipeId", recipeId);
    const recipe = await Recipe.findById(recipeId).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
    if (!recipe) {
      res.status(404).json({ msg: "Recipe not found." });
    }

    const comments = recipe.comments;

    if (comments.length !== 0) {
      res.status(200).json({ comments: comments, recipe:recipe });
    } else if (comments.length === 0) {
      res.status(200).json({ msg: "No comments yet" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const makeComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { text, author } = req.body;

    const comment = new Comment({
      comment: text,
      author: author,
      recipeId: recipeId,
    });

    const savedComment = await comment.save();
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $push: { comments: savedComment._id } },
      { new: true }
    );
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId)
    const userId = req.body.userId;
    const commentId = req.body.commentId;
    const comment = await Comment.findById(commentId);

    if(comment){
        if(comment.author.toString() === userId.toString() || userId.toString() === recipe.owner.toString()){
            await Comment.deleteOne({_id: commentId});
            res.status(200).json({msg: "Comment successfully deleted."})
        } else{
            res.status(403).json({msg: "You don't have the authority."})
        }
    } else{
        res.status(404).json({msg:"Comment not found"})
    }
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};
