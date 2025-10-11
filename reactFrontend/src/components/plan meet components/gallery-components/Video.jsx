import React, { useState } from "react";
import { useSelector } from "react-redux";

function Video({ values }) {
  const { bgcolor, videoLink, videoRef } = values;
  const [hover, setHover] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => {
    if (!isPaused) setHover(false);
  };

   const { isTablet, screenWidth, isDesktop } = useSelector((state) => state.ui);

  return (
    <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl mt-10 sm:mt-20 px-2 sm:px-4">
  <div
    className="relative w-full h-[220px] sm:h-[320px] lg:h-[420px] 
               rounded-xl sm:rounded-2xl overflow-hidden border border-red-100 
               transition-shadow duration-500"
    style={{ boxShadow: `0 0 40px -10px ${bgcolor}` }}
  >
    {videoLink ? (
      <video
        ref={videoRef}
        crossOrigin="anonymous"
        className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
        controls
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPause={() => {
          setIsPaused(true);
          setHover(true);
        }}
        onPlay={() => setIsPaused(false)}
      >
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <p className="flex items-center justify-center h-full text-gray-600 text-sm sm:text-base">
        No video available
      </p>
    )}

    {isDesktop && (
      <>
    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 
                    bg-red-600 text-white text-[10px] sm:text-xs font-semibold 
                    px-2 sm:px-3 py-1 rounded-full shadow-md tracking-wider uppercase">
      Live Highlight
    </div>


      </>
    )}
  </div>
</div>

  );
}

export default Video;
