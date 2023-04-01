import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteRecipe from "./DeleteRecipe";
import jwtDecode from "jwt-decode";
import Delete from "@mui/icons-material/Delete";


export default function ProfileRecipes({ profile }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).id;

  const recipes = profile.recipes;
  const recipeList = recipes.map((recipe, index) => {
    return (
      <div
        className="text-center mt-5 mx-auto font-mono bg-[#bc7d39] p-4 sx:p-2 rounded-md  text-white shadow-lg
      sx:w-2/3 
      lg:w-3/4 lg:hover:w-[80%]" 
        key={recipe._id}
      >
        <span>
        <img
          src={recipe.picturePath}
          alt={recipe.title}
          onClick={() => navigate(`/community/recipes/${recipe._id}`)}
          className="mx-auto rounded-md  object-cover hover:cursor-pointer
          sx:h-[30rem] sx:w-[30rem]
          lg:h-[15rem] "
        />
          <p className="text-xs text-end mb-2">
            {recipe.createdAt.slice(0, 10)}
          </p>
        </span>
        <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
        {recipe.owner === userId && <DeleteRecipe recipeId={recipe._id} />}
      </div>
    );
  });
  return <>{recipeList}</>;
}
