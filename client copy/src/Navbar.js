import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery } from "react-responsive";
import logo from "./images/logo.png"

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isClickPerson, setIsClickPerson] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width:899px)" });

  const changeClickPerson = () => {
    isClickPerson ? setIsClickPerson(false) : setIsClickPerson(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      setIsLogin(token);
      setUserId(decoded.id);
      
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
    
  };

  const profileClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <header>
      <nav className=" text-white bg-[#E0A96D] py-1 border-[#512e0e] border-[1px] shadow-md">
        <div className="flex flex-row md:w-4/5 xl:w-2/4 items-center mx-auto justify-start relative">
          <div className="basis-8 mx-3">
            <img
              src={logo}
              onClick={() => navigate("/")}
              className="hover:cursor-pointer"
              alt="Quickplate's logo"
            ></img>
          </div>
          <div>
            <a
              onClick={() => navigate("/recipes")}
              className="px-1 md:px-2 hover:underline"
            >
              Random
            </a>
            <a
              onClick={
                isLogin
                  ? () => navigate("/community/recipes")
                  : () => alert("You need to log in to see community recipes")
              }
              className="px-1 md:px-2 hover:underline"
            >
              Community
            </a>
            {isLogin && userId && (
              <a
                onClick={profileClick}
                className="px-1 md:px-2 hover:underline"
              >
                Profile
              </a>
            )}
          </div>
          <div className=" flex flex-row justify-between mr-4 right-2 absolute">

            {isLogin ? (
              ""
            ) : isMobile ? (
              <PersonIcon
                className="hover:cursor-pointer"
                onClick={changeClickPerson}
              />
            ) : (
              <a
                onClick={() => navigate("/auth/register")}
                className="hover:underline"
              >
                Sign up
              </a>
            )}

            {isMobile ? null : <div className="w-px h-6 bg-gray-500 mx-2"></div>}
            {isLogin ? ( isMobile ? <PersonIcon className="hover:cursor-pointer"
                onClick={changeClickPerson}/> : <a onClick={logout} className="hover:underline italic">
                Logout
              </a>
            ) : isMobile ? (
              ""
            ) : (
              <a
                onClick={() => navigate("/auth/login")}
                className="hover:underline"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Check if it's in mobile and click the button */}
      {isMobile ? (
        <div className="flex flex-row bg-slate-300 items-center justify-around relative">
          {isClickPerson ? (
            <>
              {isLogin ? null : (
                <a
                  onClick={() => navigate("/auth/register")}
                  className="hover:underline"
                >
                  Sign up
                </a>
              )}
              
              <div className="w-px h-6 bg-gray-500 mx-2"></div> {/* vertical line */}
              
              {isLogin ? (
                <a onClick={logout} className="hover:underline absolute right-3">
                  Logout
                </a>
              ) : (
                <a
                  onClick={() => navigate("/auth/login")}
                  className="hover:underline"
                >
                  Login
                </a>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
