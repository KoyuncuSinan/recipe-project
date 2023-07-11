import error404 from "../images/error-404.png"
import Searchbar from "./Searchbar"
export default function Error404(){
    return(
        <div className="mx-auto w:4/5 text-center">
            <img src={error404} className="w-3/5 sx:w-2/5 md:w-[30%] xl:w-[20%] mx-auto mt-5 object-cover" alt="Error image"></img>
            <h1 className="text-center font-black text-red-500 mt-10 mx-auto text-xl">Sorry. The recipe you're looking for is not found.<span className="block">What about trying something else?</span></h1>
            <Searchbar />
        </div>
    )
}