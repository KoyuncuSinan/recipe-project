import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Recipes from "./Recipes";
import RecipePage from "./RecipePage";
import CreateRecipe from "./CreateRecipe";
import CommunityRecipes from "./CommunityRecipes";
import CommunitySingle from "./CommunitySingle";
import ProfilePage from "./ProfilePage";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <div className="app flex flex-col min-h-screen ">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element=<Homepage /> />
            <Route path="/auth/register" element=<Signup /> />
            <Route path="/auth/login" element=<Login /> />
            <Route path="/recipes" element=<Recipes /> />
            <Route path="/recipes/:id" element=<RecipePage /> />
            <Route path="/community/create" element=<CreateRecipe /> />
            <Route path="/community/recipes" element=<CommunityRecipes /> />
            <Route path="/community/recipes/:id" element=<CommunitySingle /> />
            <Route path="/user/:id" element=<ProfilePage /> />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
