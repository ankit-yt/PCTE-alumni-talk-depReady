import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Hero({ values }) {
  const { meet, timeLeft } = values;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-16 overflow-hidden">
      
      <div className="absolute w-full bg-gray-400 blur-2xl h-5 bottom-0"></div>

      
      <FaGraduationCap
        size={120}
        className="z-20 absolute top-0 left-6 md:top-20 md:left-10 lg:top-25 lg:left-10 lg:-rotate-12 text-gray-700 opacity-30 lg:opacity-100"
      />

      
      <img
        className="absolute -bottom-10 blur- md:-bottom-20 w-[120%] md:w-full opacity-50 md:opacity-70 left-0"
        src="src/assets/28468.png"
        alt=""
      />

      <div className="absolute w-72 h-72 md:w-[500px] md:h-[500px] bg-pink-200 rounded-full blur-3xl opacity-40 -top-20 -left-20 animate-pulse"></div>

      
      <div className="w-full lg:w-1/2 flex flex-col  text-center lg:text-left pt-20 lg:pt-30 z-10 space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Connect. <span className="text-red-600">Inspire.</span> <br />
          <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Grow Together 
          </span>
        </h1>
        <p className="text-base md:text-lg  text-gray-600 max-w-md mix-blend-difference  mx-auto lg:mx-0 leading-relaxed">
          A next-generation alumni meet platform where connections turn into
          opportunities. Learn from mentors, explore global networks, and be
          part of something bigger.
        </p>

        
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
          
          <Link to={`/talks`} className="px-6 py-3 bg-white border border-gray-300 hover:shadow-md transition rounded-lg font-semibold text-gray-700">
            Explore Talks
          </Link>
        </div>
      </div>

      
      <div className="w-full  lg:w-1/2 relative flex justify-center  items-center mt-15 lg:mt-0">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 blur-2xl opacity-50 animate-pulse"></div>
          <div className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden relative shadow-2xl border-[6px] border-white">
            <img
              src={meet?.alumni[0]?.profilePic}
              alt={meet?.alumni?.name || "Alumni"}
              className="w-full h-full object-cover object-top"
            />
          </div>

          
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute bottom-6 md:bottom-10 -left-6 md:-left-14 bg-white/30 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-xl border border-white/40"
          >
            <p className="font-bold text-gray-900 text-sm md:text-lg drop-shadow">
              {meet?.alumni[0]?.name || "Alumni Name"}
            </p>
          </motion.div>

          
          <motion.div className="absolute top-6 md:top-16 -right-4 md:-right-10 bg-white/30 backdrop-blur-xl px-4 md:px-6 py-1.5 md:py-2 rounded-xl shadow-xl border border-white/40">
            <p className="text-xs md:text-sm text-gray-800 font-medium">
              {meet?.alumni[0]?.currentCompany || "Company"}
            </p>
          </motion.div>

          
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-8 md:-top-10  -rotate-6 md:-rotate-10 bg-white px-4 md:px-5 py-2 md:py-3 
             rounded-xl md:rounded-2xl shadow-2xl border-2 border-red-500 font-semibold 
             text-red-600 text-xs md:text-sm"
          >
            🌟 Upcoming Talk
          </motion.div>
        </motion.div>

        
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -bottom-22  md:-bottom-28 px-6 md:px-10 py-4 md:py-6 
             rounded-2xl text-center"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-mono text-black tracking-widest">
            {timeLeft || "--:--:--"}
          </p>

          <hr className="my-1" />
          <p className="text-[10px] md:text-xs text-gray-400 text-center mt-1 uppercase tracking-widest">
            Until Event Starts
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
