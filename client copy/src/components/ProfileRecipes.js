import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileRecipes({profile}){

    const navigate = useNavigate()
    const recipes = profile.recipes;
    const recipeList = recipes.map((recipe, index) => {
        return(
            <div className="user-recipes" key={recipe._id}>
                <img src={recipe.picturePath} alt={recipe.title} onClick = {() => navigate(`/community/recipes/${recipe._id}`)} />
                <h2>{recipe.title}</h2>
            </div>
        )
    });
    return <div>{recipeList}</div>;
}