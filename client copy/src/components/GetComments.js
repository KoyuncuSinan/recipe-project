import React, { useState, useEffect } from "react";

export default function GetComments({ recipeId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const handleComments = async () => {
        if (!recipeId) {
            console.log("Recipe ID is not defined");
            return;
          }
      try {
        const res = await fetch(
          `http://localhost:3001/community/recipes/${recipeId}/comments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(res);
          throw new Error();
        }
        console.log(data);
        setComments(data.comments);
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    handleComments();
  }, [recipeId]);

  const displayComments =
    comments.length > 0
      ? comments.map((comment, index) => {
          return (
            <div key={comment._id}>
              <img src={comment.author.picturePath}></img>
              <p>{comment.author.firstname}</p>
              <p>{comment.author.lastname}</p>
              <p>{comment.comment}</p>
            </div>
          );
        })
      : "No comment has been made yet.";

  return <div>{displayComments}</div>;
}
