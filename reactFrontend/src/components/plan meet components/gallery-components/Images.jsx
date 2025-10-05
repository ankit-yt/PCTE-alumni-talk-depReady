import React from "react";

function Images({ values, setters }) {
  const { images, imageIds } = values;
  const { setImageIds } = setters;

  const toggleSelect = (imageId) => {
    if (imageIds.includes(imageId)) {
      setImageIds(imageIds.filter((id) => id !== imageId));
    } else {
      setImageIds([...imageIds, imageId]);
    }
  };

  return (
    <div className="w-full relative  max-w-6xl px-2 sm:px-4 mt-6 sm:mt-10 ">
      <div className="columns-2 -w-full sm:columns-3 lg:columns-4 gap-3 sm:gap-6">
        {images.map((image, index) => {
          const isSelected = imageIds.includes(image.imageId);

          return (
            <div
              key={index}
              className={`mb-3 break-inside-avoid  group relative overflow-hidden 
                          rounded-xl shadow-md hover:shadow-xl 
                          transition-all duration-500 cursor-pointer ${
                            isSelected ? "ring-2 ring-red-500" : ""
                          }`}
              onClick={() => toggleSelect(image.imageId)}
            >
              <img
                src={image.image}
                alt={`Memory ${index + 1}`}
                className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-600 text-white 
                                rounded-full flex items-center justify-center shadow-lg text-xs sm:text-sm">
                  ✔
                </div>
              )}

              <div className="hidden sm:block absolute bottom-4 left-4 right-4 text-white opacity-0 
                              group-hover:opacity-100 transform translate-y-6 
                              group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-sm sm:text-base font-bold tracking-wide drop-shadow-lg">
                  Alumni Meet {index + 1}
                </h3>
                <p className="text-xs text-gray-200 italic">
                  Cherished memories captured forever
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Images;
