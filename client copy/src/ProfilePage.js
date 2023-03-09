import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    const getProfilePage = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        if(!res.ok){
            const errorData = await res.json()
            setErrorMessage(errorData.msg)
        }else{
            const data = await res.json()
            setProfile(data)
            console.log(data)
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("An error occurred while showing the page.")
      }
    };
    getProfilePage()
  },[id]);

  if(!profile){
    return <div>Loading...</div>
  }

  return(
    <>
        <section className="profile-page-head">
            <img src={profile.picturePath} alt="User profile picture"></img>
            <div className="name-surname">
                <p>{profile.firstname}</p>
                <p>{profile.lastname}</p>
            </div>
            <div className="location-profession">
                <p>{profile.location}</p>
                <p>{profile.profession}</p>
            </div>

        </section>
    </>
  )

}
