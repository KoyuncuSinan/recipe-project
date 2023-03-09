import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
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

const Comments = mongoose.model("Comments", CommentsSchema);
export default Comments;