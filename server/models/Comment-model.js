import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        comment:{
            type: String,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        recipeId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    }
)

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;