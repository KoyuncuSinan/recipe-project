import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        const res = await fetch("http://localhost:3001/community/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data) {
          console.log(data);
          setRecipes(data);
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    allRecipes();
  }, []);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search an recipe"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className="dataItem"
                href={`http://localhost:3001/community/recipes/${value._id}`}
                target="_blank"
              >
                <p>{value.title}</p>
              </a>
            );
          })}
          ;
        </div>
      )}
      ;
    </div>
  );
}
