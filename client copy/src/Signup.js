import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastsName: "",
    email: "",
    password: "",
    picturePath: "",
    location: "",
    profession: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      navigate("/auth/register");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: "",
        location: "",
        profession: "",
      });
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
      <form onSubmit={handleSubmit} className= "form">
        <h1>Signup</h1>
        <div className="inputs">
          <div className="input">
            <label>Firstname</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="firstName"
              value={form.firstName}
            ></input>
          </div>
          <div className="input">
          <label>Lastname</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="lastName"
              value={form.lastName}
            ></input>
          </div>
          <div className="input">
          <label>Email</label>
            <input
              type="email"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="email"
              value={form.email}
            ></input>
          </div>
          <div className="input">
          <label>Password</label>
            <input
              type="password"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="password"
              value={form.password}
            ></input>
          </div>
          <div className="input">
            <label>Image</label>
            <input
              type="file"
              className="file"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="picturePath"
              value={form.picturePath}
            ></input>
          </div>
          <div className="input">
          <label>Location</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="location"
              value={form.location}
            ></input>
          </div>
          <div className="input">
            <label>Profession</label>
            <input
              type="text"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="profession"
              value={form.profession}
            ></input>
            <input type="submit" className="submit"></input>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
