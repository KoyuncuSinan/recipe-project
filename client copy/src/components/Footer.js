import logo from "../images/logo.png"
export default function Footer(){
    return(
        
<footer class="bg-white shadow dark:bg-gray-900 mt-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="https://quickplate.onrender.com/" class="flex items-center mb-4 sm:mb-0">
                <img src={logo} class="h-8 mr-3" alt="Quickplate Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Quickplate</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <p class="mr-4 hover:underline md:mr-6 ">About</p>
                </li>
                <li>
                    <p class="mr-4 hover:underline md:mr-6">Privacy Policy</p>
                </li>
                <li>
                    <p class="mr-4 hover:underline md:mr-6 ">Licensing</p>
                </li>
                <li>
                    <p class="hover:underline">Contact</p>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://quickplate.onrender.com/" class="hover:underline">Quickplate</a>. All Rights Reserved.</span>
    </div>
</footer>


    )
}