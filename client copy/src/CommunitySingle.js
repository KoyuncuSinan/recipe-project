import React from "react"
import {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function CommunitySingle(){
    const [singleRecipe, setSingleRecipe] = useState([]);
    const {id} = useParams()

    useEffect(() =>{
        const getRecipe = async () => {
            try{
                const res = await fetch(`http://localhost:3001/community/recipes/${id}`, {
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if(data){
                    console.log(data)
                    setSingleRecipe(data)
                }

            } catch (err){
                console.log(err);
                return err;
            }
        }
        getRecipe()
    }, [id])

    return (
        <div>
            {singleRecipe.length !== 0 
            ?
            <div key={singleRecipe._id} className = "main-recipe">
                <h2>{singleRecipe.title}</h2>
                <img src= {singleRecipe.picturePath} className= "recipe-image"></img>
                <h3>How to Cook</h3>
                <p className="instruction">{singleRecipe.description}</p>
                <h2>Ingredients</h2>
                <p className="community-ingredients">{singleRecipe.ingredients}</p>
            </div>

            : "Loading..."}
        </div>
    )

}