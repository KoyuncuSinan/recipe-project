import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Bookmark({recipeId}){
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [userId, setUserId] = useState(null)
    const [fetchCompleted, setFetchCompleted] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            setUserId(decodedToken.id)
        }
    },[])

    useEffect(() => {
        const fetchUser = async() => {
            if (userId){
                try{
                    const res = await fetch(`http://localhost:3001/users/${userId}`,{
                        method: "GET",
                        headers: {
                            "Content-Type":"application/json",
                        },
                    });
                    const data = await res.json();
                    if(res.ok){
                        setIsBookmarked(data.bookmarks.includes(recipeId))
                    }
                }catch(err){
                    console.error(err);
                }finally{
                    setFetchCompleted(true)
                }
            }
        };
        fetchUser()
    },[userId, recipeId])

    const handleBookmark = async () => {
        try{
            const res = await fetch(`http://localhost:3001/community/recipes/${recipeId}`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({recipeId,userId})
            });
            const data = await res.json()
            if(res.ok){
                setIsBookmarked(!isBookmarked);
                console.log(data.msg)
            }else{
                console.log(data.msg)
            }
        }catch(err){
            console.error(err)
        }
    }

    if(!fetchCompleted){
        return <div>Loading...</div>
    }

    return(
        <button onClick={handleBookmark}>
            {userId && isBookmarked ? "Remove Bookmark" : "Bookmark Recipe"}
        </button>
    )
}