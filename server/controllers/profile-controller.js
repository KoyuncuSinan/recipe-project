import User from "../models/User.js";
import Recipe from "../models/Recipe-model.js";
import mongoose from "mongoose";

export const profilePage = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  
  try {
    const user = await User.findById(userId).populate("recipes");
    const bookmarks = await User.findById(userId).populate("bookmarks")
    if (!user) {
      return res.status(404).json({ msg: "Can't find the user." });
    }
    
    res.json({user:user, bookmarks:bookmarks.bookmarks});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};