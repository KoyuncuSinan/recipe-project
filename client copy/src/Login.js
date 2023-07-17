import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch("https://quick-plate.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setErrorMessage(data.msg);
      }else{
        localStorage.setItem("token", data.token);
        navigate("/community/recipes");
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.msg);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6">
        <h1 className="text-center mb-3 font-semibold underline">Login</h1>
        {isError && <p className="font-bold text-center text-red-600">{errorMessage}</p>}
        <div
          className="mx-auto w-4/5 py-2 px-6 bg-[#E0A96D] text-white rounded-md
        xs:w-[65%] sm:w-[55%] sx:w-[45%] md:w-[40%] lg:w-[30%] xl:w-[25%]"
        >
          <div className="flex flex-col mt-2">
          <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              className= "form-input rounded-md text-black"
              onChange={(e) =>
                setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
              }
              name="email"
              value={loginForm.email}
              placeholder="Your email"
            ></input>
          </div>
          <div className="flex flex-col mt-2">
          <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              id="password"
              className= "form-input rounded-md text-black"
              onChange={(e) =>
                setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
              }
              name="password"
              value={loginForm.password}
              placeholder="Your password"
            ></input>
            <button type="submit" className="mt-4 p-2 bg-[#201E20] hover:bg-[#512e0e] hover:cursor-pointer w-3/5 mx-auto">Login</button>
            {isLoading && <Box sx={{ display: "flex"}} className="mt-10 mx-auto items-center justify-center"> 
      <CircularProgress />
    </Box>}
          </div>
        </div>
      </form>
    </>
  );
}
