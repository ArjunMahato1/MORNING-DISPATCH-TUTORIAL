import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutSuccess } from "@/redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto lg:max-w-7xl">
        <Link to={"/"}>
          <h1 className="flex flex-wrap text-xl font-bold sm:text-2xl">
            <span className="text-slate-500">Daily</span>
            <span className="text-slate-900">Newzz</span>
          </h1>
        </Link>

        <form
          className="flex items-center p-3 rounded-lg bg-slate-100"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <nav>
          <ul className="flex items-center gap-4">
            <Link to={"/"}>
              <li className="hidden lg:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hidden lg:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            <Link to={"/news"}>
              <li className="hidden lg:inline text-slate-700 hover:underline">
                News Articles
              </li>
            </Link>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <img
                      src={currentUser.profilePicture || "/default-avatar.png"}
                      alt="user"
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2 w-60">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="block text-sm font-semibold">
                    <div className="flex flex-col gap-1">
                      <span>@{currentUser.username}</span>
                      <span className="text-xs text-gray-500">
                        {currentUser.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/dashboard?tab=profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer hover:text-red-600"
                    onClick={handleSignout}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/sign-in"}>
                <Button className="px-4 py-2 text-white bg-slate-700 hover:bg-slate-800">
                  Sign In
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
