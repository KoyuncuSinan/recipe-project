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
  }, [comments.length]);

  const displayComments =
    comments && comments.length !== 0
      ? comments?.map((comment, index) => {
          return (
            <section className="comments items-center bg-[#E0A96D] text-sm text-white p-0.5 rounded-md mb-2 shadow-lg h-16 " >
              <div key={comment._id} className="flex flex-row w-1/4 mt-1 ml-2 ">
                <img
                  src={comment.author.picturePath}
                  className="rounded-xl h-8 w-8"
                ></img>
                <p className="ml-3">{comment.author.firstname}</p>
                <p className="ml-1">{comment.author.lastname}</p>
              </div>
              <p className="text-left mt-1 px-2 pb-1 overflow-x-auto">{comment.comment}</p>
            </section>
          );
        })
      : "No comment has been made yet.";
  return <div>{displayComments}</div>;
}
