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
      navigate("/auth/login");
    } catch (err) {
      return err;
    }
  };

  return (
    <>
    <main>
      <form onSubmit={handleSubmit} className= "mt-6" encType="multipart/form-data">
        <h1 className="text-center mb-3 font-semibold underline">Register</h1>
        <div className="mx-auto w-4/5 p-5 bg-[#E0A96D] text-white rounded-md
        xs:w-[65%] sm:w-[55%] sx:w-[45%] md:w-[40%] lg:w-[30%] xl:w-[25%]">
          <div className="flex flex-col mt-2">
            <label htmlFor="firstname" className="te">Firstname*</label>
            <input
              type="text"
              className= "form-input rounded-md text-black h-[2rem] " 
              required
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="firstname"
              id="firstname"
              value={form.firstname}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
          <label htmlFor="lastname">Lastname*</label>
            <input
              type="text"
              required
              className= "rounded-md text-black h-[2rem] "
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="lastname"
              id="lastname"
              value={form.lastname}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
          <label htmlFor="email">Email*</label>
            <input
              type="email"
              required
              className= "rounded-md text-black h-[2rem] "
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              id= "email"
              name="email"
              value={form.email}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
          <label htmlFor="password">Password*</label>
            <input
              type="password"
              required
              className= "rounded-md text-black h-[2rem] "
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="password"
              id="password"
              value={form.password}
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="picturePath">Image*</label>
            <input
              type="file"
              required
              className="rounded-md file:bg-[#512e0e]" 
              onChange={(e) => setImagePath(e.target.files[0])}
              name="picturePath"
              id="picturePath"
            ></input>
          </div>
          <div className="flex flex-col mt-3">
          <label htmlFor="location">Location</label>
            <input
              type="text"
              className= "rounded-md text-black h-[2rem] "
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="location"
              value={form.location}
              id="location"
            ></input>
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="profession">Profession</label>
            <input
              type="text"
              className= "rounded-md text-black h-[2rem] "
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              name="profession"
              value={form.profession}
              id= "profession"
            ></input>
            <button type="submit" className="mt-4 p-2 bg-[#201E20] hover:bg-[#512e0e] hover:cursor-pointer ">Register</button>
          </div>
        </div>
      </form>
      </main>
    </>
  );
}
