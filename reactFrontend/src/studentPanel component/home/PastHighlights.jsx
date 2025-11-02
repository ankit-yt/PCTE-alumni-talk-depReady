import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fetchTalksOnFrontend } from "../../api/meet.api";
import { FaPlay } from "react-icons/fa6";

function PastHighlights({timeLeft}) {
  console.log(timeLeft)
  const [talks, setTalks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(-1);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPastMeets = async () => {
      try {
        const data = await fetchTalksOnFrontend("randomPast");
        setTalks(data.data);
      } catch (err) {
        console.error("err in fetching random past meets : ", err.message);
      }
    };
    fetchPastMeets();
  }, []);

  return (
    <section className="w-full bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 overflow-hidden py-16 sm:py-24  sm:px-12 relative">
      
      <div className={`absolute ${(timeLeft === null) ? " -left-20" :" -right-40"} -top-40  w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl`} />
      <div className={`absolute ${(timeLeft === null) ? " -right-20" :" -left-20"} -bottom-40  w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl`} />

      
     <div className="text-center relative z-10 mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Past{" "}
          <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Highlights
          </span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Visionaries and changemakers who inspire our community.
        </p>
      </div>

      
      <div className="flex md:flex-row md:justify-center flex-col w-full  md:mt-30   md:gap-10 gap-1  ">
  {talks.map((h, i) => (
    <motion.div
      key={i}
      onClick={() => {
        if (index !== i) {
          setIsPlaying(true);
          setIndex(i);
          setTimeout(() => {
            videoRef.current.play();
          }, 100);
        }
      }}
      className="relative flex items-center justify-center  group md:rounded-3xl md:w-86  overflow-hidden bg-white/5 backdrop-blur-sm border border-gray-100 hover:border-red-200 transition-all duration-500"
      whileHover={{ y: -6 }}
    >
      <img
        src={h.media.images[0]?.image || 'https://pcte.edu.in/wp-content/uploads/2025/04/Logo-1-28_4.png'}
        alt={h.alumni[0].name}
        className={` ${h.media.images[0]? "w-full h-56 sm:h-53 object-cover" :"w-full grayscale-30 "}  object-top transform group-hover:scale-105 transition duration-500`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90"></div>

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-lg sm:text-xl font-semibold leading-snug">
          {h.topic}
        </h3>
        <p className="text-sm opacity-80 mt-1">
          <span className="font-extrabold">{h.alumni[0].name}</span> @ <span className="italic">{h.alumni[0].currentCompany}</span>
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="relative w-14 h-14 sm:w-16 sm:h-10  rounded-full bg-white/10 backdrop-blur-lg border border-white/20 
            flex items-center justify-center hover:scale-110 transition duration-300"
        >
          <motion.span
            className="absolute inset-0 rounded-full border-2  border-red-500"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <FaPlay className="relative text-white text-lg ml-1" />
        </button>
      </div>

      {index === i && isPlaying && (
        <video
          ref={videoRef}
          className="w-full h-full absolute inset-0 object-cover rounded-2xl"
          controls
          src={h.media.videoLink || ""}
        />
      )}
    </motion.div>
  ))}
</div>

    </section>
  );
}

export default PastHighlights;
