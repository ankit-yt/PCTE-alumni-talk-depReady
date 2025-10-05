import React from "react";
import { IoClose, IoAdd } from "react-icons/io5";

function Header({ values, setters }) {
  const {
    toggle,
    mediaInputFields,
    isDesktop,
    isMobile,
    mediaRef,
  } = values;
  const {
    setToggle,
    setIsGalleryOpen,
    handleMediaUpdate,
    setIsMediaUploadModelOpen,
    handleMobileMediaChange,
  } = setters;
  console.log(isMobile, isDesktop);

  return (
    <div className="mr-auto flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 w-full gap-4 sm:gap-0">
      
      <div>
        <h1 className="font-bold text-xl sm:text-2xl text-red-700">
          Meet's Memories
        </h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm max-w-md">
          {toggle
            ? "Experience the event through our captured videos and highlights."
            : "A collection of moments that connect hearts, friendships, and stories."}
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 sm:gap-10 self-end sm:self-auto">
        <label
          htmlFor={
            isDesktop
              ? toggle
                ? mediaInputFields[0].label
                : mediaInputFields[1].label
              : ""
          }
          onClick={() => {
            if (isMobile) {
              console.log("clicked");
              setIsMediaUploadModelOpen(true);
            }
          }}
          className="relative flex items-center p-1  bg-white border-2 border-green-500 text-green-500 rounded-full cursor-pointer transition-colors duration-300 shadow-md"
        >
          <IoAdd size={26} className="sm:size-9" />
        </label>

        <div
          onClick={() => setToggle(!toggle)}
          className="hidden sm:flex relative items-center w-28 h-12 bg-white border-2 border-red-500 rounded-full cursor-pointer transition-colors duration-300 shadow-md"
        >
          <div
            className={`absolute left-1 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg transform transition-all duration-300 
              ${
                toggle
                  ? "translate-x-[3.81rem] bg-red-600"
                  : "translate-x-0 bg-red-500"
              }`}
          >
            {toggle ? "📸" : "🎥"}
          </div>

          <div className="flex justify-between w-full px-4 text-red-600 font-semibold text-sm select-none">
            <span
              className={`${
                !toggle ? "opacity-100" : "opacity-40"
              } transition-opacity duration-300`}
            >
              🎥
            </span>
            <span
              className={`${
                toggle ? "opacity-100" : "opacity-40"
              } transition-opacity duration-300`}
            >
              📸
            </span>
          </div>
        </div>

        <div
          onClick={() => setIsGalleryOpen(false)}
          className="text-red-500 w-10 h-fit flex justify-center items-center hover:text-red-700 hover:rotate-90 transition-all duration-300"
        >
          <IoClose size={20} />
        </div>
      </div>

      <input
        ref={mediaRef}
        type="file"
        className="hidden"
        id={toggle ? mediaInputFields[0].label : mediaInputFields[1].label}
        multiple={
          toggle ? mediaInputFields[0].multiple : mediaInputFields[1].multiple
        }
        accept={
          toggle ? mediaInputFields[0].accept : mediaInputFields[1].accept
        }
        onChange={isMobile ? (e)=>handleMobileMediaChange(e) : (e) => handleMediaUpdate(e, toggle)}
      />
    </div>
  );
}

export default Header;
