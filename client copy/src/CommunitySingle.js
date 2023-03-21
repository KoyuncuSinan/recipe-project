import React from "react"
import {useState, useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import Bookmark from "./components/bookmark.js"
import jwt_decode from "jwt-decode"
import MakeComment from "./components/MakeComment.js"
import GetComments from "./components/GetComments.js"

export default function CommunitySingle(){
    const [singleRecipe, setSingleRecipe] = useState([]);
    const {id} = useParams()
    const token = localStorage.getItem("token")
    const userId = jwt_decode(token).id

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
            <div key={singleRecipe._id} className = "mt-6 text-center w-4/5 mx-auto bg-[#201E20] p-3 rounded-md text-[#DDC3A5] ">
                <h2 className="font-bold text-lg mb-3 tracking-wide underline">{singleRecipe.title}</h2>
                <div className="relative"> 
                <img src= {singleRecipe.picturePath} className= "recipe-image rounded-lg"></img>
                <Bookmark recipeId={singleRecipe._id}/>
                </div>
                <h3 className="mt-5 font-semibold mb-3 tracking-wide">How to Cook</h3>
                <p className="instruction text-left bg-[#E0A96D] text-white rounded-md text-sm p-2 shadow-md">{singleRecipe.description}</p>
                <h3 className="mt-5 font-semibold mb-3 tracking-wide">Ingredients</h3>
                <p className="community-ingredients text-left bg-[#E0A96D] text-white rounded-md text-sm p-2 shadow-md">{singleRecipe.ingredients}</p>
                <h3 className="mt-5 font-semibold mb-3 tracking-wide">Comments</h3>
            <div className="comment-section mt-5">
                <GetComments recipeId= {singleRecipe._id} />
                <MakeComment recipeId= {singleRecipe._id} />
            </div>
            </div>

            : "Loading..."}
        </div>
    )

}