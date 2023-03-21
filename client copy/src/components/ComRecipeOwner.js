import React from "react";
import {useNavigate} from "react-router-dom";

export default function ComRecipeOwner({recipe}){
    const navigate = useNavigate();
    const owner = recipe.owner;
    return(
        <div className="community-owner flex flex-row w-1/5 items-center mb-3 justify-start">
            <img src={owner.picturePath} alt= "Owner's profile page" className="object-cover md:mx-auto"/>
            <span className="flex flex-row italic hover:underline hover:cursor-pointer font-bold" onClick={() => navigate(`/user/${owner._id}`)}>
                <p className="ml-2">{owner.firstname}</p>
                <p className="ml-1">{owner.lastname}</p>
            </span>
        </div>
    )
}