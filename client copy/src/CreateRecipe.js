import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function CreateRecipe() {
  const [isLogin, setIsLogin] = useState(false);
  const [recipe, setRecipe] = useState({
    title: "",
    description:"",
    picturePath: "",
    ingredients: ""
  })
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(token);
    }
  }, [localStorage.getItem("token")]);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setRecipe((prevState => ({...prevState, [name]: value})))
  };

  const handleFileChange = (e) => {
    setRecipe((prevState) => ({
      ...prevState,
      picturePath: e.target.files[0],
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = jwt_decode(token).id;
    const data = new FormData();
    data.append("owner", userId);
    Object.keys(recipe).forEach((key) => {
      data.append(`${key}`, recipe[key]);
    })

    try {
      const res = await fetch("http://localhost:3001/community/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const responseData = await res.json();
      if (res.ok) {
        console.log(responseData);
        navigate("/community/recipes");
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <div className="form-parent">
      {isLogin ? (
        <form onSubmit={handleSubmit} className="form">
          <h1>Create a Recipe</h1>
          <div className="inputs">
            <div className="input">
              <label htmlFor="title">Recipe Name</label>
              <input
                id="title"
                type="text"
                onChange={handleChange}
                value={recipe.title}
                name= "title"
              />
            </div>
            <div className="input">
              <label htmlFor="description">How to cook</label>
              <textarea
                id="description"
                value={recipe.description}
                onChange={handleChange}
                name="description"
                rows="10"
                cols="41"
              />
            </div>
            <div className="input">
              <label htmlFor="picturePath">Food Image</label>
              <input
                id="picturePath"
                type="file"
                className="file"
                onChange={handleFileChange}
                name="picturePath"
              />
            </div>
            <div className="input">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                onChange={handleChange}
                name="ingredients"
                value={recipe.ingredients}
                rows="10"
                cols="41"
              />
            </div>
            <button className="submit">Submit</button>
          </div>
        </form>
      ) : (
        "You need to login"
      )}
    </div>
  );
}
