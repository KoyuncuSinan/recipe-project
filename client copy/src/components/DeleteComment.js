import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

export default function DeleteComment({ commentId, recipeId }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
      const decodedToken = jwtDecode(token).id;
      setUserId(decodedToken)
    }
  }, []);

  const handleDelete = async (e) => {
    try {
      const res = await fetch(
        `https://quickplate-backend.vercel.app/community/recipes/${recipeId}/comments/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, commentId: commentId }),
        }
      );
      if (!res.ok) {
        const errorMsg = await res.json();
        
      }
      const data = await res.json();
      
      window.location.reload()
    } catch (err) {
      
      return err;
    }
  };
  return (
    <>{user && <DisabledByDefaultIcon onClick={handleDelete} className="hover:cursor-pointer hover:border-2 hover:border-solid hover:border-black"/>}</>
  );
}
