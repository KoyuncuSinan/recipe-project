import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const [isLogin, setIsLogin] = useState(false);
  // const [create, setCreate] = useState({
  //   title: "",
  //   description: "",
  //   picturePath: "",
  //   ingredients: "",
  // });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [ingredients, setIngredients] = useState('');

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("title",title);
    data.append("description",description);
    data.append("picturePath",picturePath);
    data.append("ingredients",ingredients);

    const res = await fetch("http://localhost:3001/community/create", {
        method: "POST",
        body: data,
      });
    console.log(res)

      if(res.status === 200 || res.status === 201){
        const data = await res.json();
        console.log(data);
        navigate("/");
      }else{
        throw new Error(res.statusText);
      }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(token);
    }
  }, [localStorage.getItem("token")]);

  return (
    <>
      {isLogin ? (
        <form onSubmit={handleSubmit} className= "form">
          <h1>Create a Recipe</h1>
          <div className="inputs">
            <div className="input">
              <label htmlFor="title">Recipe Name</label>
              <input
                id="title"
                type="text"
                onChange={(e) =>
                  setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="input">
              <label htmlFor="description">How to cook</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)}
                name= "description"
                rows="10"
                cols= "41"
              />
            </div>
            <div className="input">
              <label htmlFor="picturePath">Food Image</label>
              <input
                id="picturePath"
                type="file"
                className="file"
                onChange={(e) =>
                  setPicturePath(e.target.files[0])}

                name="picturePath"
              />
            </div>
            <div className="input">
              <label htmlFor="ingredients">Ingredients</label>
              <input
                id="ingredients"
                type="text"
                onChange={(e) =>
                  setIngredients(e.target.value)}
                name= "ingredients"
                value={ingredients}
              />
            </div>
            <button className="submit">Submit</button>
          </div>
        </form>
      ) : (
        "You need to login"
      )}
    </>
  );
}
