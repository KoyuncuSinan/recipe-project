import React from "react";
import {useNavigate} from "react-router-dom";

export default function ComSingleOwner({recipe}){
    const navigate = useNavigate();
    const owner = recipe.owner;
    return(
        <div className="community-owner flex flex-row w-1/5 items-center mb-3 justify-start md:absolute">
            <img src={owner.picturePath} alt= "Owner's profile page" className="object-cover w-10 h-10"/>
            <span className="flex flex-row italic hover:underline hover:cursor-pointer font-bold" onClick={() => navigate(`/user/${owner._id}`)}>
                <p className="ml-2">{owner.firstname}</p>
                <p className="ml-1">{owner.lastname}</p>
            </span>
        </div>
    )
}