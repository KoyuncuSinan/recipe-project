import React from "react";
import {useState, useEffect} from "react"
import { useNavigate, useParams} from "react-router-dom"
import parse from 'html-react-parser';

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
            <div key={recipePage.id} className ="main-recipe mt-6 text-center w-5/5 mx-auto bg-[#201E20] p-3 text-[#DDC3A5] relative
          lg:w-4/5 
          xl:w-3/5 rounded-lg"> 
                <h2 className="font-bold text-lg mb-3 tracking-wide underline">{recipePage.title}</h2>
                <img src={recipePage.image} className="recipe-image rounded-lg h-100 mx-auto
              md:h-[20rem] object-cover"></img>
                <h3 className="mt-5 font-semibold mb-3 tracking-wide">How to Cook</h3>
                <div className="instruction text-left bg-[#E0A96D] text-white rounded-md text-sm p-2 shadow-md"> 
                {parse(`${recipePage.instructions}`)}
                </div>
                <h2 className="mt-5 font-semibold mb-3 tracking-wide">Ingredients</h2>
                <section className="ingredients mt-5 font-semibold mb-3 tracking-wide bg-white grid grid-cols-2 xl:grid-cols-3"> 
                    {recipePage.extendedIngredients.map((ingredient, index) => 
                    <div key= {ingredient.id} className="ingredient w-2/3 mx-auto text-center ite">
                        <p className="mt-4 uppercase text-xs font-normal text-black">{ingredient.name}</p>
                        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} className = "ingredient-img w-[5rem] h-[5rem] object-cover mx-auto"></img>
                        <p className="font-extralight text-gray-500">Amount: {ingredient.amount}</p>
                    </div>
                     )}
                </section>
            </div>
            : "Loading..." }
        </div>
    )

}