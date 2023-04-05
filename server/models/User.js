import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            min: 1,
            max: 50,
        },
        lastname:{
            type: String,
            required: true,
            min: 1,
            max: 50,
        },
        email:{
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password:{
            type: String,
            required: true,
            min: 5,
            max: 16,
        },
        picturePath:{
            type: String,
            required: true,
            default: "",
        },
        recipes:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe" 
            }

        ],
        bookmarks:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe"
            }
        ],
        location: String,
        profession: String,
    }, {timestamps: true}
)

const User = mongoose.model("User",UserSchema);
export default User;