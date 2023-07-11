import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateRecipe() {
  const [isLogin, setIsLogin] = useState(false);
  const [recipe, setRecipe] = useState({
    title: "",
    picturePath: "",
  });
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState("")

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(token);
    }
  }, [localStorage.getItem("token")]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setRecipe((prevState) => ({...prevState,[name]:value}));
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
    data.append("ingredients",ingredients)
    data.append("description",description)
    Object.keys(recipe).forEach((key) => {
      data.append(`${key}`, recipe[key]);
    });
    try {
      const res = await fetch("https://quick-plate.onrender.com/community/create", {
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
        <form onSubmit={handleSubmit} className="form w-9/10 mx-auto md:w-[75%] xl:w-[65%] 2xl:w-[50%]">
          <h1 className="text-center mt-4 font-semibold text-md">Create a Recipe</h1>
          <div className="inputs w-[90%] mx-auto mt-3 relative">
            <div className="input flex flex-col">
              <label htmlFor="title" className="inline-block">Recipe Name</label>
              <input
                id="title"
                type="text"
                onChange={handleChange}
                value={recipe.title}
                name="title"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description">How to cook</label>
              <ReactQuill theme="snow" value={description} onChange= {setDescription} id="description" className="h-[8rem]"/>

            </div>
            <div className="mt-[4rem] flex flex-col">
              <label htmlFor="picturePath">Food Image</label>
              <input
                id="picturePath"
                type="file"
                className="file mt-2"
                onChange={handleFileChange}
                name="picturePath"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="ingredients">Ingredients</label>
              <ReactQuill theme="snow" value={ingredients} onChange= {setIngredients} id="ingredients" className="h-[8rem]" />
            </div>
            <button className="submit mt-[4rem] absolute right-1 bg-[#512e0e] hover:bg-[#bc7d39] text-white px-3 py-1 rounded-md ">Submit</button>
          </div>
        </form>
      ) : (
        "You need to login"
      )}
    </div>
  );
}
