import React from "react";

function Loader({progress , statusText}) {

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#fafafa] text-gray-800">
      {/* Logo */}
      <img
        src="https://pcte.edu.in/wp-content/uploads/2025/04/Logo-1-28_4.png"
        alt="PCTE Logo"
        className="w-40 mb-8 mr-8 opacity-90 select-none transition-all duration-500"
      />

      {/* Progress Bar Container */}
      <div className="relative w-80 h-[4px] bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 animate-pulse transition-[width] duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Text Section */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-sm font-medium text-gray-700 tracking-wide">
          {statusText}
        </p>
        <p className="text-xs text-gray-500 font-light">
          Please wait while we confirm your session integrity.
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          System status:{" "}
          <span className="font-semibold text-red-600">
            {Math.floor(progress)}%
          </span>
        </p>
      </div>

      {/* Subtle footer indicator */}
      <div className="absolute bottom-6 text-[10px] text-gray-400 font-light">
        © {new Date().getFullYear()} PCTE AlumniTalks. All rights reserved.
      </div>
    </div>
  );
}

export default Loader;
