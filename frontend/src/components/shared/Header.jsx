import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="sticky shadow-1g">
        <div className="flex items-center justify-between p-4 mx-auto max-w-6x1 1g: max-w-7x1">
    <Link to={"/"} >
    <h1 className="flex flex-wrap font-bold text-x1 sm: text-2x1"> 
        <span className="text-slate-500">Daily</span>
        <span className="text-slate-900">Neuzz</span>
    </h1>
 </Link>

<form className="flex items-center p-3 rounded-lg bg-slate-100"> 
<input
type="text"
placeholder="Search..."
className="w-24 bg-transparent outline-none focus: sm:w-64"
/>
<button>
<FaSearch className="text-state-600"/>
 

</button>
 </form>
 <ul className='flex gap-4'>
 <Link to={"/"} >
    <li className="hidden lg:inline text-slate-700 hover:underline">Home</li>
 </Link>
 <Link to={"/about"} >
    <li className="hidden lg:inline text-slate-700 hover:underline">About</li>
 </Link>
 <Link to={"/news"} >
    <li className="hidden lg:inline text-slate-700 hover:underline">News Articles</li>
 </Link>
 
 </ul>
 <Link to={"/sign-in"} >
 <Button>Sign In</Button>
 </Link>
</div>
</header>
  )
}

export default Header