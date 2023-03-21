import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function MakeComment({recipeId}) {
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id


  const handleSubmit = async (e) => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/recipes/${recipeId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({text:comment, author: userId}),
        }
      );
      console.log(userId)
      console.log(res)
      const data = await res.json();
      if (!res.ok) {
        console.log(res)
        throw new Error("Something went wrong")
      } 
     setComment("");
     console.log(data)

    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
      placeholder="Make a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        cols= "20"

    />
      <button type="submit">
        Share
      </button>
    </form>
  );
}
