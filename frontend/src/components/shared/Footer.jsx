
import React from "react"
import { Link } from "react-router-dom"
const Footer = () => {
return (
<div className="py-8 bg-gray-800 Itext-white">
<div className="container grid grid-cols-1 gap-8 px-6 mx-auto lg:px-8 md:grid-cols-3">
{/* About Us */}
<div>
<h2 className="mb-4 text-lg font-semibold text-white">About Us</h2>
<p className="text-sm text-gray-400">
"We are dedicated to keeping you informed with reliable and timely news. Our mission is to empower lives by delivering accurate, engaging, and seamless digital experiences, tailored for today's fast-paced world." </p>
</div>
{/* Quick Links */}
<div>
<h2 className="mb-4 text-lg font-semibold text-white">Quick Links</h2>
<ul className="text-gray-400 spay-y-2">
    <li>
        <Link to={"/"} className="hover:text-white">Home
        </Link>
    </li>
    <li>
        <Link to={"/about"} className="hover:text-white">About Us
        </Link>
    </li>
    <li>
        <Link to={"/news"} className="hover:text-white">News Articles
        </Link>
    </li>
    <li>
        <Link to={"/"} className="hover:text-white">Contact Us
        </Link>
    </li>
</ul>
</div>
{/* Contact Us */}
<div>
<h2 className="mb-4 text-lg font-semibold text-white">Contact Us</h2>
<p className="text-sm text-gray-400">Rk University,Rajkot, Gujrat</p>
<p className="text-sm text-gray-400">Email:amahato992@rku.ac.in,</p>

<p className="text-sm text-gray-400">ryadav943@rku.ac.in,</p>
<p className="text-sm text-gray-400">kyadav847@rku.ac.in</p>
<p className="text-sm text-gray-400">Phone:8271620566</p>
</div>
</div>
{/* Social Media and Copyright */}
<div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gary-700">
    <p>Follow us on</p>
    <div className="flex justify-center mt-3 space -x-4">
        <a href="#" className="hover:text-white">
            Facebook
        </a>
        <a href="#" className="hover:text-white">
            Instagram
        </a>
        <a href="#" className="hover:text-white">
            Twitter
        </a>

    </div>
    <p className="mt-4">@Copy; {new Date().getFullYear()} Daily Newzz. All rights reserved

    </p>
</div>
</div>
)
}
export default Footer