import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Recipes() {
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();

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
      <h1 className="recipe-h1 text-center mt-6 font-semibold">
        Official Recipes
      </h1>
      <div className="recipes md:grid md:grid-cols-2 md:gap-x-[7rem] 2xl:grid-cols-3 md:w-2/3 lg:w-1/2 w-3/5 mx-auto">
        {recipe.length >= 1
          ? recipe[0].map((item, index) => (
            <div className=" p-3 bg-[#E0A96D] hover:bg-[#bc7d39] text-white active:bg-[#201E20] 
              mb-4 relative rounded-lg shadow-[#201E20] shadow-md
              md:w-4/4 md:mx-auto md:mt-8 hover:cursor-pointer"  key={item.id}
                onClick={() => navigate(`/recipes/${item.id}`)}> 
              <img
                  src={item.image}
                  alt="Recipe"
                  className="h-1/4 rounded-lg object-cover md:h-[15rem] md:w-[15rem] md:mx-auto border-solid border-2 border-[#201E20]"
                ></img>
              <h2 className="mt-3 text-lg md:mt-2 md:text-lg xl:mt-4 xl:text-lg md:w-[15rem]">{item.title}</h2>
                {/* <p>{item.dishTypes[0]}</p> */}

            </div>
            
            ))
          : ""}
      </div>
    </>
  );
}
