import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./components/Searchbar.js";
import ComRecipeOwner from "./components/ComRecipeOwner.js";

export default function CommunityRecipes() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const allRecipes = async () => {
      try {
        const res = await fetch("http://localhost:3001/community/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data) {
          console.log(data);
          setRecipe(data);
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    allRecipes();
  }, []);

  return (
    <>
      <h1 className="recipe-h1">Community Recipes</h1>
      <button
        onClick={() => navigate("/community/create")}
        className="create-recipe"
      >
        Create a new recipe
      </button>
      <Searchbar />
      <div className="recipes">
        {recipe.length >= 1
          ? recipe.map((item, index) => (
              <div>
                {item.owner && (
                  <div>
                    <ComRecipeOwner recipe={item}/>
                  </div>
                )}
                <a
                  key={item._id}
                  onClick={() => navigate(`/community/recipes/${item._id}`)}
                  className="recipe"
                >
                  <img src={item.picturePath} alt="Recipe"></img>
                  <h2>{item.title}</h2>
                </a>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}
