import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteRecipe({ recipeId }) {
  
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const handleRemove = async () => {
    try {
      const res = await fetch(
        `https://quick-plate.onrender.com/community/recipes/${recipeId}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ ownerId: userId, recipeId: recipeId }),
        }
      );

      if (!res.ok) {
        const errorMsg = await res.json();
        console.log(errorMsg.msg);
        return errorMsg.msg;
      }
      const data = await res.json();
      console.log(data)
      window.location.reload(true)
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return(
    <div className="hover:cursor-pointer">
        <DeleteIcon onClick={handleRemove}/>
    </div>
  )

}
