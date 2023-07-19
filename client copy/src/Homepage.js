import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import image1 from "./images/cake-mix-cookie-bars-recipe-4.jpeg";
import image2 from "./images/dragon-roll1-1655475546.jpeg";
import image3 from "./images/FCFD8B25-BD7F-4A2F-BC49-6923B80DF791.jpeg";
import image4 from "./images/Garlicky Lemon Baked Tilapia.jpg";
import image5 from "./images/strawberry-popsicles-recipe-1-of-4.jpeg";
import image6 from "./images/stuffed-shells-5-2.jpeg";


export default function Homepage() {
  const navigate = useNavigate();

useEffect(() => {
  const invokeBackend = async () => {
    try{
      const res = await fetch("https://quickplate-backend.vercel.app",{
        method:"GET"
      });
      const data = await res.json()
      
    }catch(err){
      console.error("Failed to invoke", err)
    }
  }
  invokeBackend();
}, [])

  return (
    <main className="mt-12 md:mt-24 max-w-xs mx-auto sm:max-w-sm md:max-w-[50rem] lg:max-w-4xl xl:max-w-6xl 2xl:max-w-6xl md:flex md:flex-row md:justify-between">
      <section className="flex 2xl:flex-1 flex-col justify-between items-center text-center md:mr-4 lg:mr-8 xl:mr-10 2xl:mr-16">
        <div className="homepage md:mt-20 2xl:mt-16">
          <h1 className="tracking-wide text-5xl font-semibold md:text-7xl">
            Easy, fast and short
          </h1>
          <h3 className="text-2xl mt-5 md:text-3xl">
            Don't waste your time with complicated descriptions to cook a fine
            dish
          </h3>
          <p className="mt-5">
            Register now and reach thousands of community made easy recipes
            alongside official meals
          </p>
        </div>
        <div>
          <button
            className="mt-8 bg-[#E0A96D] hover:bg-[#512e0e] p-2 rounded-lg ring-2  text-slate-200 font-semibold hover:cursor-pointer"
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            Sign up now
          </button>
        </div>
      </section>
      <section className="grid grid-cols-3 mx-auto mt-5 gap-2">
        <img
          src={image1}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>
        <img
          src={image2}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>
        <img
          src={image3}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>
        <img
          src={image4}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>
        <img
          src={image5}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>
        <img
          src={image6}
          alt="Recipe"
          className="object-cover h-[5rem] w-[5rem] mx-auto sx:h-[7rem] sx:w-[7rem] md:h-[15rem] md:w-[15rem]"
        ></img>

        <div className="flex items-center w-full col-span-3">
          <button
            onClick={() => navigate("/recipes")}
            className="bg-[#E0A96D] hover:bg-[#512e0e] p-2 rounded-lg ring-2  text-slate-200 font-semibold hover:cursor-pointer mt-8 mx-auto"
          >
            See random recipes
          </button>
        </div>
      </section>
    </main>
  );
}
