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
    comments && comments.length !== 0
      ? comments?.map((comment, index) => {
          return (
            <section key={comment._id} className="comments items-center bg-[#E0A96D] text-sm text-white p-0.5 rounded-md mb-2 shadow-lg
            lg:w-3/4 lg:mx-auto
            xl:w-2/4 xl:mx-auto" >
              <div className="flex flex-row w-2/4 mt-1 ml-2 ">
                <img
                  src={comment.author.picturePath}
                  className="rounded-xl h-8 w-8"
                ></img>
                <p className="ml-3">{comment.author.firstname}</p>
                <p className="ml-1">{comment.author.lastname}</p>
              </div>

              <p className="text-left mt-1 px-2 pb-1 overflow-auto">{comment.comment}</p>

            </section>
          );
        })
      : <p className="mb-4">No comment has been made yet.</p>
  return <div>{displayComments}</div>;
}
