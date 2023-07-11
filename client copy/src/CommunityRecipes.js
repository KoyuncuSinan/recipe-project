import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./components/Searchbar.js";
import ComRecipeOwner from "./components/ComRecipeOwner.js";
import jwt_decode from "jwt-decode";
import DeleteRecipe from "./components/DeleteRecipe.js";
import Error403 from "./components/Error403.js";


export default function CommunityRecipes() {
  const [recipe, setRecipe] = useState([]);
  const [userId, setUserId] = useState("")
  const [doesHaveToken, setDoesHaveToken] = useState(false)
  const navigate = useNavigate();
  

  useEffect(() => {
  const token = localStorage.getItem("token");
  if(token){
    const decodedId = jwt_decode(token).id
    setUserId(decodedId)
    setDoesHaveToken(true)
  }
    const allRecipes = async () => {
      try {
        const res = await fetch("https://quicksplash.vercel.app/community/recipes", {
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
    {doesHaveToken ?
    <section>
      <h1 className="text-center mt-6 font-semibold">Community Recipes</h1>
      <Searchbar />
      <div className="w-full mx-auto text-center my-6">
        <button
          onClick={() => navigate("/community/create")}
          className="bg-[#201E20] hover:bg-[#E0A96D] text-white hover:text-black 
          rounded-md p-2 shadow-md w-1/3 md:w-[15%] shadow-[#E0A96D] hover:shadow-[#201E20]"
        >
          Create a new recipe
        </button>
      </div>
      <div className="md:grid md:grid-cols-2 2xl:grid-cols-3 md:w-1/2  w-3/5 mx-auto">
        {recipe.length >= 1
          ? recipe.map((item, index) => (
              <div className="single-recipe p-3 bg-[#E0A96D] hover:bg-[#bc7d39] text-white active:bg-[#201E20] 
              mb-4 relative rounded-lg shadow-[#201E20] shadow-md
              md:w-4/4 md:mx-auto md:mt-8" key={item._id}>
                {item.owner && <ComRecipeOwner recipe={item} />}
                <p className="text-xs text-right">
                  {item.createdAt.slice(0, 10)}
                </p>
                <a
                  onClick={() => navigate(`/community/recipes/${item._id}`)}
                  className="recipe text-center rounded-lg"
                >
                  <img
                    src={item.picturePath}
                    alt="Recipe"
                    className="h-[10rem] w-[12rem] mx-auto rounded-lg object-cover md:h-[15rem] md:w-[15rem] md:mx-auto border-solid border-2 border-[#201E20]"
                  ></img>
                  <h2 className="mt-3 text-lg md:mt-2 md:text-lg xl:mt-4 xl:text-lg ">{item.title}</h2>
                </a>
                {item.owner._id === userId && <DeleteRecipe recipeId = {item._id} />}
              </div>
            )).reverse()
          : ""}
      </div>
    </section>
  : <Error403 />}
    </>
  );
}
