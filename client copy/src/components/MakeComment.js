import React, { useState, useEffect, useRef} from "react";
import jwt_decode from "jwt-decode";

export default function MakeComment({ recipeId }) {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState();
  const textAreaRef = useRef(null)

  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;

  const handleInput = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await fetch(`https://quick-plate.onrender.com/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errorMsg = await res.json();
          console.log(errorMsg.msg);
          return errorMsg.msg;
        }
        const data = await res.json();
        console.log(data)
        setUser(data.user);
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    getUserData();
  }, [userId]);

  const handleSubmit = async (e) => {
    try {
      const res = await fetch(
        `https://quick-plate.onrender.com/community/recipes/${recipeId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment, author: userId }),
        }
      );
      console.log(userId);
      console.log(res);
      const data = await res.json();
      if (!res.ok) {
        console.log(res);
        throw new Error("Something went wrong");
      }
      setComment("");
      console.log(data);
    } catch (err) {
      console.log(err);
      return err;
    }
  };



  return (
    <div>
      {user &&(
        <div className="flex flex-row justify-center mt-4">
          <img src={user.picturePath} className = "h-8 w-8 rounded-xl mr-2" alt="User's picture"></img>
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              placeholder="Make a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              cols="20"
              className="rounded-md p-2 text-black active:border-none w-72 text-xs/ resize-none"
              onInput={handleInput}
              ref={textAreaRef}
            />
            <button type="submit" className="bg-[#E0A96D] p-1 rounded-md text-white font-semibold absolute right-1 bottom-3 hover:bg-[#201E20] ">Share</button>
          </form>
        </div>
      )}
    </div>
  );
}
