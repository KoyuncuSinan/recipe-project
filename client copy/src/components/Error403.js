import { useNavigate } from "react-router-dom"
import noEntry from "../images/no-entry.png"
export default function Error403(){
    const navigate = useNavigate()
    return(
        <div className="mx-auto w:4/5 text-center">
            <img src={noEntry} className="w-3/5 sx:w-2/5 md:w-[30%] xl:w-[20%] mx-auto mt-5 object-cover" alt="Error image"></img>
            <h1 className="text-center font-black text-red-500 mt-10 mx-auto text-xl">You need to login to see the community recipes!</h1>
            <button type="submit" className="sx:w-2/5 md:w-[30%] xl:w-[20%] mt-4 p-2 bg-[#512e0e] hover:bg-[#201E20] hover:cursor-pointer w-3/5 mx-auto text-white text-center" onClick={() => navigate("/auth/login")}>Login</button>
        </div>
    )
}