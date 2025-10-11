import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
   <nav className="fixed w-full z-50 border-b border-gray-200
    bg-gradient-to-r from-white/30 via-white/10 to-white/30
    backdrop-blur-md shadow-md">
      <div className="max-w-7xl md:flex hidden  md:h-20 h-20 mx-auto px-6  justify-between items-center">
        <div onClick={() => window.location.href = "/"} className="md:text-2xl text-lg font-bold tracking-wide text-gray-900">
          Alumni<span className="text-red-600">Talks</span>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          {["Home", "Talks" , "Admin"].map(
            (item) => (
              <li key={item}>
                <NavLink to={`${item === 'Home' ? '/' : item === 'Admin' ?  "/admin" : item.toLowerCase()}`}>{item}</NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
