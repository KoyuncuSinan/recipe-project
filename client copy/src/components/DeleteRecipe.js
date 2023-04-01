import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteRecipe({ recipeId }) {

  const [isRemoveButtonClicked, setIsRemoveButtonClicked] = useState(false);
  
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const navigate = useNavigate()
  const handleRemove = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/recipes/${recipeId}/delete`,
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
