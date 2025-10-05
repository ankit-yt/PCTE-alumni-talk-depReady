import React, { useRef, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";


function Timeline({ careerTimeline }) {
  const containerRef = useRef(null);
  const lastItemRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current && lastItemRef.current) {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const lastItemTop = lastItemRef.current.getBoundingClientRect().top;

      // Calculate line height from top of container to bottom of last card
      setLineHeight(lastItemTop - containerTop);
    }
  }, [careerTimeline]);

  return (
    <div className="mt-6 h-full w-full">
      <h2 className="text-md font-bold text-black   mb-6">
        Career Timeline
      </h2>

      <div
        ref={containerRef}
        className="relative h-full no-scrollbar py-3 overflow-auto pl-8 space-y-10"
      >
        <div
          className="absolute left-[15px] w-[2px] bg-gradient-to-b from-red-500 via-red-400 to-red-600 animate-pulse shadow-[0_0_8px_#ef4444]"
          style={{ height: `${lineHeight}px` }}
        ></div>

        {([...careerTimeline].reverse()).map((timeline, idx) => (
          <div
  key={idx}
  ref={idx === careerTimeline.length - 1 ? lastItemRef : null}
  className="relative"
>
  <span className={`absolute -left-[23px] top-3 w-4 h-4 rounded-full  ${idx === 0 ? "bg-green-500 animate-ping [animation-duration:2s]":"bg-red-500"} border-2 border-white shadow-sm`}></span>
  {idx === 0 && <span className={`absolute -left-[23px] top-3 w-4 h-4 rounded-full  ${idx === 0 ? "bg-green-500 ":"bg-red-500"} border-2 border-white shadow-sm`}></span>}

<div className={`group relative bg-white border border-gray-200 ${idx === 0 ? "hover:border-green-400" : "hover:border-red-400"} rounded-md p-3 shadow-sm  hover:shadow-md transition-all duration-200`}>
 
  <div className="flex items-center justify-between">
    <h3 className={`text-sm font-semibold text-gray-900 ${idx === 0 ? "group-hover:text-green-600" : "group-hover:text-red-600"} transition`}>
      {timeline.company}
    </h3>
    <span className={`text-[11px] font-semibold ${idx === 0 ? "text-green-600 bg-green-100 group-hover:bg-green-50 group-hover:text-green-700" : "text-gray-500 bg-gray-100 group-hover:bg-red-50 group-hover:text-red-600"}  px-2 py-0.5 rounded-md  transition`}>
      {idx === 0 ? 'Current' : timeline.year}
    </span>
  </div>

  <p className="mt-1 text-[13px] text-gray-600 font-medium leading-tight">
    {timeline.role}
  </p>
</div>


</div>

        ))}
      </div>
    </div>
  );
}

export default Timeline;
