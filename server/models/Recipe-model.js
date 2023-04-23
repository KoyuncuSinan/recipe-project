import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        description: {
            type: String,
            required: true,
        },
        picturePath: {
            type: String,
            required: true,
        },
        ingredients : {
            type: String,
            required:true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"

        }],
        like_count: {
            type: Number
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps:true}
)

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;