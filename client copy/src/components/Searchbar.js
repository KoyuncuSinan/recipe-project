import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function Searchbar() {
  const [recipes, setRecipes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const token = localStorage.getItem("token");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = recipes.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  useEffect(() => {
    const allRecipes = async () => {
      try {
        const res = await fetch("https://quick-plate.onrender.com/community/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data) {
          
          setRecipes(data);
        }
      } catch (err) {
        
        return err;
      }
    };
    allRecipes();
  }, [token]);

  return (
    <div className="">
      <div className="searchInputs w-4/5 md:w-1/2 mx-auto relative my-4 rounded-xl border-none shadow-sm shadow-[#E0A96D]">
        <input
          type="text"
          placeholder="Search a recipe"
          value={wordEntered}
          onChange={handleFilter}
          className = "w-full text-inherit font-light rounded-xl px-2 h-7 md:h-9 border-transparent focus:border-[#512e0e] focus:ring-0"
        />
        <div className="searchIcon absolute bottom-0.5 md:bottom-1 right-2">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult w-4/5 md:w-1/2 mx-auto bg-white p-2 -mt-2.5 rounded-md">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem hover:text-[#E0A96D]"
                href={`https://quickplate.onrender.com/community/recipes/${value._id}`}
                target="_blank"
                key={value._id}
              >
                <p>{value.title}</p>
              </a>
            )
          })}
        </div>
      )}
    </div>
  );
}
