import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';

import { IoClose } from "react-icons/io5";
import InfoItem from './InfoItem';
import { FaGraduationCap, FaTimeline } from 'react-icons/fa6';
import { GoBriefcase } from "react-icons/go";
import { RiBuilding2Fill, RiBuilding2Line } from "react-icons/ri";
import { MdAlternateEmail } from 'react-icons/md';
import { ImLinkedin2 } from "react-icons/im";
import Timeline from './Timeline';



function Alumni({values , setters}) {
    const {isTimelineOpen ,RpEmail , RpName , RpProfile , Rpachievement , Rpbatch , RpcareerTimeline , RpcurrentCompany , RpcurrentRole , RplinkedIn , Rpquote } = values
    const {setIsTimelineOpen , setIsRightPanelOpen} = setters
  return (
    <>
              {/* Header */}
              <div className="flex items-center">
                {isTimelineOpen && (
                  <IoMdArrowRoundBack
                    className="text-red-500 text-xl cursor-pointer hover:scale-110 transition"
                    onClick={() => setIsTimelineOpen(false)}
                  />
                )}
                <IoClose
                  onClick={() => setIsRightPanelOpen(false)}
                  className="ml-auto text-red-500 text-xl cursor-pointer hover:rotate-90 transition"
                />
              </div>
    
              {/* Profile */}
              <div className="flex flex-col items-center text-center mt-4">
                <div className="relative">
                  <img
                    src={RpProfile}
                    alt={RpName}
                    className="w-28 h-28 object-top rounded-full border-4 border-red-500 shadow-lg object-cover"
                  />
                  
                  
                </div>
                <h1 className="mt-4 text-xl font-bold text-red-600">{RpName}</h1>
                <p className="text-sm italic text-gray-800 dark:text-gray-200 opacity-90 max-w-[90%]">
                  {Rpquote}
                </p>
              </div>
    
              {/* Content */}
              {!isTimelineOpen ? (
                <div className="mt-6 flex flex-col gap-6 flex-1">
                  {/* Details */}
                  <div className="space-y-4">
                    <InfoItem
  icon={<FaGraduationCap className="text-indigo-500" />}
  label="Batch"
  value={Rpbatch}
/>

<InfoItem
  icon={<GoBriefcase className="text-amber-600" />}
  label="Current Role"
  value={RpcurrentRole}
/>

<InfoItem
  icon={<RiBuilding2Line className="text-green-600" />}
  label="Current Company"
  value={RpcurrentCompany}
/>

<InfoItem
  icon={<MdAlternateEmail className="text-blue-500" />}
  label="Email"
  value={RpEmail}
/>

<InfoItem
  icon={<ImLinkedin2 className="text-sky-600" />}
  label="LinkedIn"
  value={
    <a
      href={RplinkedIn}
      target="_blank"
      className="text-red-500 underline font-medium hover:text-red-700 transition"
    >
      View Profile
    </a>
  }
/>

                  </div>
    
                  {Rpachievement.length > 0 && (
                    <div>
                    <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide">
                      Achievements
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Rpachievement.map((achieve, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-red-500/90 to-red-400/90 text-white rounded-full shadow-md"
                        >
                          {achieve}
                        </span>
                      ))}
                    </div>
                  </div>
                  )}
    
                  <button
  onClick={() => setIsTimelineOpen(true)}
  className="mt-auto text-center flex justify-center w-full  gap-2 px-3 py-2 
             rounded-md border border-gray-200 bg-white 
             text-gray-700 font-medium shadow-sm 
             hover:border-blue-400 hover:text-blue-900 hover:shadow-md 
             transition-all duration-200"
>
  <FaTimeline className="text-blue-900" size={18} />
  <span className="text-sm">Career Timeline</span>
</button>

                </div>
              ) : (
                <div className=" md:h-[25rem] h-[30rem]  ">
                  <Timeline careerTimeline={RpcareerTimeline} />
                </div>
              )}
            </>
  )
}

export default Alumni
