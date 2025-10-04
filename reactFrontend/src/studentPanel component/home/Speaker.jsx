import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSomeRandomAlumni } from "../../api/alumni.api";

function Speaker() {
  const [alumnis, setAlumnis] = useState([]);

  useEffect(() => {
    const fetchAlumnis = async () => {
      try {
        const data = await getSomeRandomAlumni();
        setAlumnis(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlumnis();
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 px-6 sm:px-10 bg-gradient-to-r from-white via-gray-50 to-white">
      {/* Subtle blurred gradient orbs */}
      <div className="absolute -top-40 -right-40 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-20 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />

      {/* Section Header */}
      <div className="text-center relative z-10 mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Alumni's
          </span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Visionaries and changemakers who inspire our community.
        </p>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-12 max-w-7xl mx-auto relative z-10">
        {alumnis.map((sp, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col group  items-center text-center"
          >
            {/* Circular floating avatar */}
            <div className="relative w-32 group-hover:border-4 border-red-600 h-32 sm:w-50 sm:h-50 md:mt-15 rounded-full overflow-hidden shadow-md shadow-gray-200 hover:shadow-lg transition-all duration-500">
              <img
                src={sp.profilePic}
                alt={sp.name}
                className="w-full h-full object-cover object-center"
              />
              {/* subtle gradient overlay on hover */}
            
            </div>

            {/* Speaker Info */}
            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              {sp.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600">{sp.currentRole}</p>
            <p className="mt-1 text-xs font-medium text-red-600 uppercase tracking-wide">
              {sp.currentCompany}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Speaker;
