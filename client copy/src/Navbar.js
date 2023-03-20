import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setIsLogin(token);
      setUserId(decoded.id);
      console.log(userId);
    } else {
      setIsLogin(null);
      setUserId(null);
    }
  }, [localStorage.getItem("token")]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(null);
    setUserId(null);
    navigate("/");
    console.log("Logged out");
  };

  const profileClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <div className="flex flex-row justify-around items-center py-3 mx-4 text-black" >
        <div className="basis-8 lg:basis-20">
          <img
            src="https://www.transparentpng.com/thumb/food/n0nASj-food-plate-cut-out.png"
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
          ></img>
        </div>
        <div>
          <a onClick={() => navigate("/recipes")} className="px-1 hover:underline">
            Recipes
          </a>
          <a
            onClick={
              isLogin
                ? () => navigate("/community/recipes")
                : () => alert("You need to log in to see community recipes")
            }
            className="px-1 hover:underline"
          >
            Community
          </a>
          {isLogin && userId && (
            <a onClick={profileClick} className="px-1 hover:underline">
              Profile
            </a>
          )}
        </div>
        <div className=" flex flex-col basis-1/10 text-xs text-center">
          {isLogin ? (
            ""
          ) : (
            <a onClick={() => navigate("/auth/register")} className= "py-1 hover:underline">Sign up</a>
          )}

          {isLogin ? (
            <a onClick={logout} className= "hover:underline">Logout</a>
          ) : (
            <a onClick={() => navigate("/auth/login")} className="hover:underline">Login </a>
          )}
        </div>
      </div>
    </>
  );
}
