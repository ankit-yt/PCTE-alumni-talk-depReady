import React from "react";
import { useSelector } from "react-redux";

import { IoClose } from "react-icons/io5";

function Card1({ handleImageChange, values, setters }) {
  const {
    title,
    inputType,
    isSeaching,
    query,
    previewURL,
    alumniName,
    isEditing,
  } = values;
  const {
    setIsSeaching,
    setQuery,
    setAlumniId,
    setPreviewURL,
    setAlumniName,
    setTitle,
  } = setters;
  const allAlumni = useSelector((state) => state.alumni);
  console.log(allAlumni);
  let filteredQuery;
  if (query) {
    filteredQuery =
      query.trim().length === 0
        ? allAlumni
        : allAlumni.filter((alumni) => {
            const lowerSearch = query.toLowerCase();
            return (
              (alumni.name || "").toLowerCase().includes(lowerSearch) ||
              (alumni.batch || "").toLowerCase().includes(lowerSearch) ||
              (alumni.currentCompany || "")
                .toLowerCase()
                .includes(lowerSearch) ||
              (alumni.currentRole || "").toLowerCase().includes(lowerSearch)
            );
          });
  }

  return (
    <div className="w-full md:w-2/5 h-96 md:h-full overflow-hidden no-scrollbar flex flex-col items-center gap-6 p-6 md:p-8 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-in-out border border-red-100">
    
      <div className="w-full">
        <label
          htmlFor="profilePic"
          className="block text-red-600 text-lg md:text-xl font-bold tracking-wide mb-3"
        >
          {title}
           {/* <span className="text-black">{title.split(" ").splice(0,1)}</span> <span>{title.split(" ").splice(1,2)}</span> */}
        </label>
        <div>
          <div className="relative w-full">
            <input
              onFocus={() => {
                if (!isEditing) {
                  setQuery("");
                  setIsSeaching(true);
                }
              }}
              value={inputType === "file" ? "" : query}
              type={inputType}
              name="profilePic"
              id="profilePic"
              accept="image/*"
              placeholder="search"
              onChange={
                inputType === "file"
                  ? handleImageChange
                  : isEditing
                  ? setQuery(alumniName)
                  : (e) => setQuery(e.target.value)
              }
              className="w-full px-3 md:px-4 py-2 pr-10 border-2 border-red-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
            />

            {isSeaching && inputType !== "file" && (
              <button
                type="button"
                onClick={() => {
                  setIsSeaching(false);
                  setQuery("");
                }}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:rotate-90 transition-all duration-200 hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-5/6 relative flex  flex-col items-center no-scrollbar justify-center gap-10 ">
        <div
          className={`w-full absolute ${
            isSeaching ? "top-0 z-80 opacity-100" : "top-110 opacity-0 "
          } transition-all duration-500 left-0 no-scrollbar md:max-h-96 h-full  overflow-y-auto bg-white  rounded-md`}
        >
          {(filteredQuery || allAlumni).map((alumni) => (
            <div
              onClick={() => {
                setAlumniId(alumni._id);
                setPreviewURL(alumni.profilePic);
                setAlumniName(alumni.name);
                setTitle(
                  `${alumni.name.trim()[0].toUpperCase()}${alumni.name
                    .trim()
                    .slice(1)} Talk's`
                );
                setIsSeaching(false);
              }}
              key={alumni._id}
              className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              <img
                src={alumni.profilePic}
                alt={alumni.name}
                className="w-12 h-12 rounded-full object-cover border"
              />

              <div className="flex flex-col">
                <span className="font-medium text-gray-900">{alumni.name}</span>
                <span className="text-sm text-gray-600">
                  {alumni.currentRole} @ {alumni.currentCompany}
                </span>
                <span className="text-xs text-gray-400">
                  Batch {alumni.batch}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`w-full h-full flex flex-col absolute ${
            isSeaching ? "translate-y-110" : "md:translate-y-10"
          } transition-all duration-500  gap-5  items-center`}
        >
          {title === "Choose Alumni" && previewURL && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
              {alumniName.trim().charAt(0).toUpperCase() +
                alumniName.trim().slice(1)}
              <span className="block w-12 h-1 bg-red-500 mx-auto mt-2 rounded-full"></span>
            </h1>
          )}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-100 border-4 border-red-300 hover:border-red-500 rounded-full overflow-hidden shadow-md transition-all duration-300 ease-in-out group relative">
            <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-md z-0"></div>
            {previewURL ? (
              <img
                src={previewURL}
                alt="Selected"
                className="w-full h-full object-cover object-top rounded-full z-10 transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <img
                src="https://www.gravatar.com/avatar/?d=mp&s=200"
                alt="Default Avatar"
                className="w-full h-full object-cover rounded-full animate-pulse z-10 transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>

          <p className="text-xs md:text-sm text-gray-500 italic text-center">
            Accepted formats: JPG, PNG, SVG – Max size 2MB
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card1;
