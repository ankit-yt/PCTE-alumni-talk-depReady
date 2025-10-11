import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setScreenWidth } from "../redux/slices/uiSlice";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";

import { FaTimes } from "react-icons/fa";


function TalkInsight() {
  const location = useLocation();
  const { talk } = location.state || {};
  const [isTalkInfo, setIsTalkInfo] = useState(true);
  const scrollRef = useRef(null);
  const { isMobile } = useSelector((state) => state.ui);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 800;
    if (current) {
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen py-5 relative overflow-hidden bg-gray-50">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="w-full h-48 flex relative  justify-center items-center text-center space-y-3 px-4">
        <div className=" space-y-3  ">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-extrabold">
            <span className="text-black">Talk</span>{" "}
            <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl">
            Get all info and memories captured in each talk
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className=" text-black  text-2xl absolute md:right-30 hidden md:block hover:text-red-500 transition"
        >
          <IoMdArrowRoundBack />
        </button>
      </div>

      <div className="alumni-info mb-20 w-full relative z-10 h-96 justify-center mt-10 md:mt-0 flex md:flex-row flex-col py-10">
        <div className="profilePic md:w-1/2  h-full flex flex-col justify-center items-end px-5">
          <div className="md:w-64 w-42 h-42 mx-auto md:mx-0 relative md:h-64 rounded-full border-red-600 border-4 ">
            <div className="absolute inset-0 bg-gradient-to-bl animate-spin [animation-duration:6s] rounded-full from-red-500 to-blue-600 blur-xl"></div>
<div className="absolute bottom-5 z-20 left-0 -rotate-5 
                px-4 py-1.5 rounded-full 
                bg-gradient-to-r from-red-500 via-pink-500 to-orange-400
                text-white text-xs sm:text-sm font-semibold tracking-wide
                shadow-lg shadow-red-500/30 
                backdrop-blur-md border border-white/20
                hover:scale-105 transition-transform duration-300">
  @ {talk.alumni[0].currentCompany}
</div>

            <img
              className="w-full h-full rounded-full relative object-cover z-10"
              src={talk.alumni[0].profilePic}
              alt=""
            />
          </div>
        </div>

        <div className=" h-full flex-col flex md:mt-0 mt-4  md:w-1/2 py-5 px-5 ">
          <div className="flex mx-auto md:mx-0 gap-5 mb-6">
            <button
              onClick={() => setIsTalkInfo(true)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                isTalkInfo
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Talk
            </button>
            <button
              onClick={() => setIsTalkInfo(false)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !isTalkInfo
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Alumni
            </button>
          </div>

          <div className="  rounded-xl p-6   overflow-auto">
            {isTalkInfo ? (
              <div className="space-y-3 text-gray-700">
                <InfoRow label="Title" value={talk.title} />
                <InfoRow label="Organized by" value={talk.organizedBy} />
                <InfoRow
                  label="Time"
                  value={new Date(talk.time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                />
                <InfoRow label="Venue" value={talk.location} />
                <InfoRow
                  label="Classes Joined"
                  value={talk.classJoined.join(",") || "loading..."}
                />
                
                <InfoRow label="Description"  value={talk.description} />
                
              </div>
            ) : (
              <div className="space-y-3 text-gray-700">
                <InfoRow label="Alumni Name" value={talk.alumni[0].name} />
                <InfoRow
                  label="Profession"
                  value={talk.alumni[0].currentRole}
                />
                <InfoRow
                  label="Company"
                  value={talk.alumni[0].currentCompany}
                />
                <InfoRow label="Batch" value={talk.alumni[0].batch} />
                
              </div>
            )}
          </div>
        </div>
      </div>

      {talk.alumni[0].careerTimeline.length >= 2 && <div className="my-10 md:mt-0 overflow-visible  md:mb-30 w-full relative mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl sm:text-3xl mx-auto w-fit lg:text-4xl md:mb-10 font-extrabold text-gray-900 tracking-tight">
          Careerr{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            Timeline
          </span>
        </h2>

        <div className="w-full z-10 relative">
          {talk.alumni[0].careerTimeline.length !== 1 && (
            <>
              <BsChevronRight
                onClick={() => handleScroll("right")}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-10 text-blue-700 cursor-pointer"
                size={20}
              />
              <BsChevronLeft
                onClick={() => handleScroll("left")}
                className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-6 lg:-left-10 text-red-700 cursor-pointer"
                size={20}
              />
            </>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar w-full py-25 sm:py-25"
          >
            <div className="relative flex w-max mx-auto px-6 sm:px-10 md:px-20">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-purple-600 rounded-full"></div>

              {talk.alumni[0].careerTimeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative shrink-0 flex flex-col items-center w-40 sm:w-48 md:w-56 lg:w-64 mx-4 sm:mx-8 md:mx-16 group`}
                >
                  <div
                    className={`group-hover:opacity-0 opacity-100 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 transition-all duration-500 rounded-full bg-gradient-to-r from-red-500 to-blue-500 border-4 border-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20`}
                  ></div>

                  <div
                    className={`mt-8 p-3 sm:p-4 md:p-6 w-full bg-white/90 backdrop-blur-md  rounded-2xl border border-gray-200 relative transition-all duration-500
              group-hover:scale-105 group-hover:-translate-y-3 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]
              ${
                i % 2 === 0
                  ? 'md:block md:-translate-y-28 -translate-y-23'
                  : " md:block md:translate-y-24 translate-y-15"
              }`}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 sm:px-3 py-1 text-xs font-bold bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-full shadow-md">
                        {item.year}
                      </span>
                      {talk.alumni[0].careerTimeline[i] ===
                        talk.alumni[0].careerTimeline[
                          talk.alumni[0].careerTimeline.length - 1
                        ] && (
                        <span className="px-2 sm:px-3 py-1 text-xs font-bold text-green-600 border border-green-600 rounded-full shadow-md">
                          current
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-extrabold mt-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-600 transition">
                      {item.company}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.role}</p>

                    <div
                      className={`absolute ${
                        talk.alumni[0].careerTimeline.length === 1
                          ? "opacity-20"
                          : "opacity-0 group-hover:opacity-20"
                      } -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur transition duration-500`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>}

      {talk.media.videoLink && <div className="w-full md:w-4/5  mx-auto mb-16  mt-10 relative">
        <h2 className="text-3xl sm:text-3xl mx-auto md:mb-20 w-fit lg:text-4xl md:mb-10 font-extrabold text-gray-900 tracking-tight mb-10">
          Relive the Talk{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            in Motion
          </span>
        </h2>
        {talk.media.videoLink && (
          <div className="absolute w-72 h-72 bg-red-500/30 rounded-full blur-3xl -bottom-20 -right-20"></div>
        )}
        <div className="relative md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          {talk.media.videoLink && (
            <video
              className="w-full md:h-96 object-cover object-top"
              src={talk.media.videoLink}
              controls
            />
          )}
          {!isMobile && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
              🎥 Alumni Talk
            </div>
          )}
        </div>
      </div>}

      {talk.media.images?.length > 0 && <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:mb-20 sm:text-3xl mb-10 mx-auto w-fit lg:text-4xl md:mb-10 font-extrabold text-gray-900 tracking-tight">
          Memories from{" "}
          <span className="md:bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-red-600 bg-clip-text text-transparent">
            Talk
          </span>
        </h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {talk.media.images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
              onClick={() => setSelected(src.image)}
            >
              <img
                src={src.image}
                alt={`Memory ${i}`}
                className="w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-start p-4">
                <span className="text-white font-semibold text-sm sm:text-base">
                  Memory {i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white text-2xl hover:text-red-500 transition"
            >
              <FaTimes />
            </button>
            <motion.img
              key={selected}
              src={selected}
              alt="Selected memory"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>
        )}
      </div>}
    </div>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 py-1">
      {/* Label */}
      <span className="text-sm sm:text-base  font-medium text-gray-500 sm:w-44 tracking-wide">
        {label}
      </span>

      {/* Value */}
      <span className={`text-sm ${label === 'Description' ? "italic" : "sm:text-base font-semibold"}    text-gray-900 dark:text-gray-100 break-words`}>
        {value}
      </span>
    </div>
  );
}


export default TalkInsight;
