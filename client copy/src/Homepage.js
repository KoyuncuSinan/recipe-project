import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between items-center text-center mt-12 md:mt-36 max-w-xs mx-auto sm:max-w-sm md:max-w-xl  lg:max-w-4xl">
      <div className="homepage">
        <h1 className="tracking-wide text-5xl font-semibold md:text-7xl">
          Easy, fast and short
        </h1>
        <h3 className="text-2xl mt-5 md:text-3xl">
          Don't waste your time with complicated descriptions to cook a fine
          dish
        </h3>
        <p className="mt-5">
          Register now and reach thousands of community made easy recipes
          alongside official meals
        </p>
      </div>
      <div>
        <button
          className="mt-8 bg-[#E0A96D] hover:bg-[#201E20] p-2 rounded-lg ring-2  text-slate-200 font-semibold hover:cursor-pointer"
          onClick={() => {
            navigate("/auth/register");
          }}
        >
          Sign up now
        </button>
        <p>or</p>
        <button
          onClick={() => navigate("/recipes")}
          className="bg-[#E0A96D] hover:bg-[#201E20] p-2 rounded-lg ring-2  text-slate-200 font-semibold hover:cursor-pointer"
        >
          See the official recipes
        </button>
      </div>
    </div>
  );
}
