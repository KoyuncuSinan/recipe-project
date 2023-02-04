import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="homepage">
        <h1>Easy, fast and short </h1>
        <h3>
          Don't waste your time with complicated descriptions to cook a fine
          dish
        </h3>
        <p>
          Register now and reach thousands of community made easy recipes
          alongside official meals
        </p>
      </div>
      <button
        className="recipe-button"
        onClick={() => {
          navigate("/recipes");
        }}
      >
        Check out recipes!
      </button>
    </div>
  );
}
