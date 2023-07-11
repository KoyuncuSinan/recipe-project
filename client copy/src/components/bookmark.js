import React,{useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

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
                    const res = await fetch(`https://quick-plate.onrender.com/users/${userId}`,{
                        method: "GET",
                        headers: {
                            "Content-Type":"application/json",
                        },
                    });
                    const data = await res.json();
                    const bookmarks = data.bookmarks;
                    const recipeIds = bookmarks.map(bookmark => bookmark._id);
                    if(recipeIds.includes(recipeId)){
                        setIsBookmarked(true)
                        console.log(data.bookmarks)
                    }else{
                        setIsBookmarked(false);
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
        try {
            const res = await fetch(`https://quick-plate.onrender.com/community/recipes/${recipeId}`,{
              method: "POST",
              headers:{
                "Content-Type": "application/json",
              },
              body: JSON.stringify({recipeId,userId})
            });
        
            const data = await res.json();
            if (res.ok) {
                setIsBookmarked(!isBookmarked)
              console.log(data.msg);
            } else {
              console.log(data.msg);
            }
          } catch (err) {
            console.error(err);
          }
    }

    if(!fetchCompleted){
        return <div>Loading...</div>
    }

    return(
        <button onClick={handleBookmark} className= "absolute right-0">
            {userId && fetchCompleted && isBookmarked ? <BookmarkRemoveIcon/> : <BookmarkAddIcon/>}
        </button>
    )
}