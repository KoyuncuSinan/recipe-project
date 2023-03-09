import React from "react";
import Signup from "../src/Signup"
import Login from "../src/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "../src/Homepage"
import Navbar from "../src/Navbar"
import Recipes from "../src/Recipes"
import RecipePage from "../src/RecipePage"
import CreateRecipe from "../src/CreateRecipe";
import CommunityRecipes from "../src/CommunityRecipes";
import CommunitySingle from "../src/CommunitySingle";
import ProfilePage from "./ProfilePage";

import "../src/style/index.css"
import "../src/style/navbar.css"
import "../src/style/login.css"
import "../src/style/recipes.css"
import "../src/style/recipePage.css"
import "../src/style/homepage.css"


export default function App(){ 
    return(
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path= "/" element = <Homepage /> />
                    <Route path= "/auth/register" element= <Signup/> />
                    <Route path = "/auth/login" element = <Login /> />
                    <Route path = "/recipes" element = <Recipes /> />
                    <Route path = "/recipes/:id" element = <RecipePage /> />
                    <Route path = "/community/create" element = <CreateRecipe/> />
                    <Route path = "/community/recipes" element = <CommunityRecipes/> />
                    <Route path = "/community/recipes/:id" element = <CommunitySingle/> />
                    <Route path = "/user/:id" element= <ProfilePage/> />
                </Routes>
            </BrowserRouter>

        </div>
    )

}
