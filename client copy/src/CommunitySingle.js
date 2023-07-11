import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import Bookmark from "./components/bookmark.js";
import MakeComment from "./components/MakeComment.js";
import GetComments from "./components/GetComments.js";
import ComSingleOwner from "./components/ComSingleOwner.js";
import Error403 from "./components/Error403.js";
import Error404 from "./components/Error404.js";

export default function CommunitySingle() {
  const [singleRecipe, setSingleRecipe] = useState([]);
  const [doesHaveToken, setDoesHaveToken] = useState(false)
  const [isThereError, setIsThereError] = useState(false)
  const { id } = useParams();
  

  useEffect(() => {
  const token = localStorage.getItem("token");
  if(token){
    setDoesHaveToken(true)
    
  }    const getRecipe = async () => {
      try {
        const res = await fetch(
          `https://quick-plate.onrender.com/community/recipes/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(!res.ok){
          const errorMsg = await res.json()
          console.log(errorMsg.error)
          setIsThereError(true)
        }
        const data = await res.json();
        if (data) {
          console.log(data);
          setSingleRecipe(data);
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    getRecipe();
  }, [id]);

  return (
    <div>
      {doesHaveToken ? singleRecipe && singleRecipe.length !== 0 ? (
        <div
          key={singleRecipe._id}
          className="mt-6 text-center w-5/5 mx-auto bg-[#201E20] p-3 text-[#DDC3A5] relative
          lg:w-4/5 
          xl:w-3/5 rounded-lg"
        >
            <ComSingleOwner recipe={singleRecipe}/>
          <h2 className="font-bold text-lg mb-3 tracking-wide underline">
            {singleRecipe.title}
          </h2>
          <div className="relative mt-6">
            <img
              src={singleRecipe.picturePath}
              className="recipe-image rounded-lg h-100 mx-auto
              md:h-[30rem]"
              alt="Recipe"
            ></img>
            <Bookmark recipeId={singleRecipe._id} />
          </div>
          <h3 className="mt-5 font-semibold mb-3 tracking-wide">How to Cook</h3>
          <div className="instruction text-left bg-[#E0A96D] text-white rounded-md text-sm p-2 shadow-md">
            {parse(`${singleRecipe.description}`)}
          </div>
          <h3 className="mt-5 font-semibold mb-3 tracking-wide">Ingredients</h3>
          <div className="community-ingredients text-left bg-[#E0A96D] text-white rounded-md text-sm p-2 shadow-md">
            {parse(`${singleRecipe.ingredients}`)}
          </div>
          <h3 className="mt-5 font-semibold mb-3 tracking-wide">Comments</h3>
          <div className="comment-section mt-5">
            <GetComments recipeId={singleRecipe._id} />
            <MakeComment recipeId={singleRecipe._id} />
          </div>
        </div>
      ) : (isThereError ? <Error404 /> : "Loading...")
      : <Error403 />}
    </div>
  );
}
