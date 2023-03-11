import React from "react";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function Navbar(){

    const [isLogin, setIsLogin] = useState(null);
    const [userId, setUserId] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            const decoded = jwt_decode(token)
            setIsLogin(token)
            setUserId(decoded.id)
            console.log(userId)
        }else{
            setIsLogin(null);
            setUserId(null);
        }
    }, [localStorage.getItem("token")]);

    const logout = () => {
        localStorage.removeItem("token")
        setIsLogin(null)
        setUserId(null)
        navigate("/")
        console.log("Logged out")
    }

    const profileClick = () => {
        navigate(`/user/${userId}`)
    }

    return(
        <>
            <div className="header-container">
                <div id="home-img">
                    <img src="https://www.transparentpng.com/thumb/food/n0nASj-food-plate-cut-out.png"
                    onClick = {() => navigate("/")}
                    className= "logo">            
                    </img>
                </div>
                <div className="sections">
                    <a onClick = {() => navigate("/recipes")}>Recipes</a>
                    <a onClick = {isLogin ? () => navigate("/community/recipes"):  () => alert("You need to log in to see community recipes")}>Community</a>
                    {isLogin && userId && (<a onClick = {profileClick}>Profile</a>)}
                </div>
                <div className="register">
                    {isLogin ? "" : 
                    <a onClick = {()=> navigate("/auth/register")}>Sign up</a>}

                    {isLogin ? <a onClick={logout}
                    >
                    Logout
                    </a> 
                    : <a onClick={() => navigate("/auth/login")}>Login </a>}
                </div>
            </div>
        </>
    )
}