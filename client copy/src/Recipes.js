import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Recipes() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await fetch(
          "https://api.spoonacular.com/recipes/random?apiKey=324cb261c62b4ca09539df5a99baeaf1&number=20",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data) {
          const list = Object.values(data);
          console.log(list);
          setRecipe(list);
        }
      } catch (err) {
        return err;
      }
    };
    getRecipe();
  }, []);

  return (
    <>
      <h1 className="recipe-h1">Official Recipes</h1>
      <div className="recipes">
        {recipe.length >= 1
          ? recipe[0].map((item, index) => (
              <a key={item.id} onClick = {() => navigate(`/recipes/${item.id}`)} className="recipe">
                <img src={item.image} alt = "Recipe"></img>
                <h2>{item.title}</h2>
                {/* <p>{item.dishTypes[0]}</p> */}
              </a>
            ))
          : ""}
    </div>
  </>
  );
}
