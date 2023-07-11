import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileBookmarks({ bookmarks }) {
  const navigate = useNavigate();
  const displayBookmark = bookmarks.map((item, index) => {
    return (
      <div
        key={item._id}
        className="text-center mt-5 mx-auto bg-[#bc7d39] p-4 sx:p-2 rounded-md  text-white
      sx:w-2/3 
      lg:w-3/4 lg:hover:w-[80%]"
      >
        <span className="title">
          <img
            src={item.picturePath}
            className="mx-auto rounded-md sx:h-[30rem] sx:w-[30rem] object-cover lg:h-[15rem] hover:cursor-pointer"
            onClick={() => navigate(`/community/recipes/${item._id}`)}
            alt="Item's image"
          ></img>

          <p className="text-xs text-end mb-2">{item.createdAt.slice(0, 10)}</p>
        </span>
        <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
      </div>
    );
  });

  return <>{displayBookmark}</>;
}
