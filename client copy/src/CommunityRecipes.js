import React, { useState,useEffect } from "react";

export default function CommunityRecipes(){
    const [recipe,setRecipe] = useState([]);

    useEffect(() => {
        const allRecipes = async () => {
            try{
                const res = await fetch("http://localhost:3001/community/recipes",{
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json",
                    },
                });
                const data = await res.json();
                if(data){
                    console.log(data);
                    setRecipe(data);
                }
            } catch (err){
                console.log(err);
                return err;
            }
        };
        allRecipes();
    },[])

    return(
        <>
            <h1 className="recipe-h1">Community Recipes</h1>
            <div className="recipes">
                {recipe.length >= 1 ? (recipe.map((item,index) => (
                    <a key={item._id} className= "recipe">
                        <img src = {item.picturePath} alt="Recipe"></img>
                        <h2>{item.title}</h2>
                    </a>
                ))): ""}
            </div>
        </>
    )
}