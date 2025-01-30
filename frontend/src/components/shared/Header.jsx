import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
import { signOutSuccess } from '@/redux/user/userSlice';
 

const Header = () => {
   const dispatch = useDispatch();
   const {currentUser} = useSelector((state) => state.user);
   const handleSignout = async () =>{
    try {
          const res = await fetch("/api/user/signout", {
            method: "POST",
          })
    
          const data = await res.json()
    
          if (!res.ok) {
            console.log(data.message)
          } else {
            dispatch(signOutSuccess())
          }
        } catch (error) {
          console.log(error)
        }
   }
   //console.log(currentUser)
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
 {currentUser ? (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div>
        <img
          src={currentUser.profilePicture}
          alt="user photo"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-60">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gray-400" />
      <DropdownMenuItem className="block text-sm font-semibold">
        <div className='flex flex-col gap-1'>
          <span>@{currentUser.username}</span>
          <span>@{currentUser.email}</span>

        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="mt-2 font-semibold ">
        <Link to="/dashboard?tab=profile" >Profile</Link>
        </DropdownMenuItem>
      <DropdownMenuItem className="mt-2 font-semibold " onClick={handleSignout}>Sign Out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
) : (
  <Link to="/sign-in">
    <Button>Sign In</Button>
  </Link>
)}
</div>
</header>
  )
}


export default Header
