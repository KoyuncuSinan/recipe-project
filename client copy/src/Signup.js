import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    profession: "",
  });
  const [imagePath, setImagePath] = useState("")

  const addToFormData = (formData, fields) => {
    for (const field in fields){
      formData.append(field,fields[field]);
    }
  }

  const navigate = useNavigate();
  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addToFormData(formData, form)
      formData.append("picturePath",imagePath)
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      console.log(data);
      setForm(data)
      navigate("/recipes");
    } catch (err) {
      return err;
    }
  };

  return (
    <>
    <div id="main">
      <div className="slogan">
        <h1>Easy, fast, short </h1>
        <h3>Don't waste your time to find the best dish </h3>
        <p>Register now and reach thousands of community made easy recipes</p>
      </div>
      <form onSubmit={handleSubmit} className= "form" encType="multipart/form-data">
        <h1>Signup</h1>
        <div className="inputs">
          <div className="input">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="firstname"
              id="firstname"
              value={form.firstname}
            ></input>
          </div>
          <div className="input">
          <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="lastname"
              id="lastname"
              value={form.lastname}
            ></input>
          </div>
          <div className="input">
          <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              id= "email"
              name="email"
              value={form.email}
            ></input>
          </div>
          <div className="input">
          <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="password"
              id="password"
              value={form.password}
            ></input>
          </div>
          <div className="input">
            <label htmlFor="picturePath">Image</label>
            <input
              type="file"
              className="file"
              onChange={(e) => setImagePath(e.target.files[0])}
              name="picturePath"
              id="picturePath"
            ></input>
          </div>
          <div className="input">
          <label htmlFor="location">Location</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="location"
              value={form.location}
              id="location"
            ></input>
          </div>
          <div className="input">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="profession"
              value={form.profession}
              id= "profession"
            ></input>
            <input type="submit" className="submit"></input>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
