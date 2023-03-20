import React from "react";
import {useNavigate} from "react-router-dom";

export default function ComRecipeOwner({recipe}){
    const navigate = useNavigate();
    const owner = recipe.owner;
    return(
        <div className="community-owner">
            <img src={owner.picturePath} alt= "Owner's profile page"/>
            <span onClick={() => navigate(`/user/${owner._id}`)}>
                <p>{owner.firstname}</p>
                <p>{owner.lastname}</p>
            </span>
        </div>
    )
}