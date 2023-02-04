import React from "react";
import {useState, useEffect} from "react"
import { useNavigate, useParams} from "react-router-dom"

export default function RecipePage(){
    const [recipePage, setRecipePage] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const singleRecipe = async () => {
            try{
                const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=324cb261c62b4ca09539df5a99baeaf1&includeNutrition=true`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                let data = await res.json();
                if(data){
                    const list = Object.values(data)
                    console.log(data)
                    setRecipePage(data)
                }
            }catch (err){
                console.log(err)
                return err;
            }
        }
        singleRecipe()
    }, [id])

    return(
        <div>
            {Object.keys(recipePage).length !== 0
            ?
            <div key={recipePage.id} className ="main-recipe"> 
                <h2>{recipePage.title}</h2>
                <p className="dish-type">{recipePage.dishTypes[0]}</p>
                <img src={recipePage.image} className="recipe-image"></img>
                <h3>How to Cook</h3>
                <p className="instruction">{recipePage.instructions.replace(/(<([^>]+)>)/ig, "")}</p>
                <h2>Ingredients</h2>
                <div className="ingredients"> 
                    {recipePage.extendedIngredients.map((ingredient, index) => 
                    <div key= {ingredient.id} className="ingredient">
                        {/* <h4>{ingredient.aisle}</h4> */}
                        <p>{ingredient.name}</p>
                        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} className = "ingredient-img"></img>
                        <p>Amount: {ingredient.amount}</p>
                    
                    </div>
                     )}
                </div>
            </div>
            : "Loading..." }
        </div>
    )

}