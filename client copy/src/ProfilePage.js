import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileRecipes from "./components/ProfileRecipes.js";
import ProfileBookmarks from "./components/ProfileBookmarks.js";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";

export default function ProfilePage() {
  const [profile, setProfile] = useState();
  const [profileBookmarks, setProfileBookmarks] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);

  const { id } = useParams();

  const handleRecipeClick = () => {
    setShowBookmark(false)
    showRecipe ? setShowRecipe(false) : setShowRecipe(true);
  };
  const handleBookmarkClick = () => {
    setShowRecipe(false)
    showBookmark ? setShowBookmark(false) : setShowBookmark(true);
  };

  useEffect(() => {
    const getProfilePage = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          setErrorMessage(errorData.msg);
        } else {
          const data = await res.json();
          setProfile(data.user);
          setProfileBookmarks(data.bookmarks);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("An error occurred while showing the page.");
      }
    };
    getProfilePage();
  }, [id]);

  return (
    <>
      {profile && (
        <main>
          <section className=" w-11/12 mx-auto bg-[#512e0e] lg:px-4 text-white rounded-md shadow-2xl
          sx:w-4/5
          md:w-3/5
          lg:w-3/5
          xl:w-2/5"
          >

            <div className="profile-page-head flex flex-row items-center mt-10">
              <img
                src={profile.picturePath}
                alt="User profile picture"
                className="w-20 h-20 rounded-full mt-3 ml-3 object-cover"
              ></img>
              <div className="name-surname flex flex-row ml-4 text-lg font-semibold">
                <p>{profile.firstname}</p>
                <p className="ml-1">{profile.lastname}</p>
              </div>
            </div>
            <div className="location-profession flex flex-row justify-end text-sm mr-4">
              <span className="flex flex-row items-center mr-3">
                <LocationOnIcon />
                <p>{profile.location}</p>
              </span>
              <span className="flex flex-row items-center">
                <WorkIcon />
                <p className="ml-1">{profile.profession}</p>
              </span>
            </div>
            <div className="flex flex-row justify-between w-2/3 mx-auto mt-8 sx:w-2/4 mb-2 p-2">
              <h3 onClick={handleRecipeClick} className="hover:cursor-pointer hover:underline">Recipes</h3>
              <h3 onClick={handleBookmarkClick} className="hover:cursor-pointer hover:underline">Bookmarks</h3>
            </div>
          </section>
          <hr className="mb-8 lg:w-3/5 mx-auto"></hr>
          {
            showRecipe ? <h2 className="text-center mb-3 font-bold text-xl">Your Recipes</h2> : 
          (showBookmark?<h2 className="text-center mb-3 font-bold text-xl">Your Bookmarks</h2> : "")
          }
          <section className="mt-6 lg:grid lg:grid-cols-2 xl:grid-cols-3 xl:w-[75%] 2xl:w-[70%] mx-auto">
            {showRecipe && (
                <ProfileRecipes profile={profile} />
            )}
            {showBookmark && (
                <ProfileBookmarks bookmarks={profileBookmarks} />
            )}
          </section>
        </main>
      )}
    </>
  );
}
