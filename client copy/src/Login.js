import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[loginForm, setLoginForm] = useState({
        email:"",
        password:"",
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3001/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm)
            });
            
            if(!response.ok){
                throw new Error(response.statusText)
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            console.log(data)
            navigate("/")

        }catch(err){
            return err;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} id= "login-form">
                <h1>Login</h1>
                <div className="input">
                    <input 
                    type= "email"
                    onChange={(e)=> setLoginForm({...loginForm,[e.target.name]: e.target.value})}
                    name= "email"
                    value= {loginForm.email}
                    placeholder= "Your email"
                    >
                    </input>
                </div>
                <div className="input">
                    <input 
                    type= "password"
                    onChange={(e)=> setLoginForm({...loginForm,[e.target.name]: e.target.value})}
                    name= "password"
                    value= {loginForm.password}
                    placeholder= "Your password"
                    >
                    </input>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}