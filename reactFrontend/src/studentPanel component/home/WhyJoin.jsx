import { motion } from "framer-motion";
import { FaMicrophoneAlt, FaBriefcase, FaRocket } from "react-icons/fa";

function WhyTalks({ isMobile }) {
  const benefits = [
    {
      icon: <FaMicrophoneAlt size={28} className="text-red-500" />,
      title: "Real Stories, Real Impact",
      desc: "Hear authentic experiences from alumni who’ve walked the path before you.",
    },
    {
      icon: <FaBriefcase size={28} className="text-yellow-500" />,
      title: "Career Guidance",
      desc: "Get practical advice on job markets, interviews, and career growth.",
    },
    {
      icon: <FaRocket size={28} className="text-pink-500" />,
      title: "Industry Insights",
      desc: "Stay updated with cutting-edge knowledge directly from professionals.",
    },
  ];

  return (
    <section className="w-full relative bg-gradient-to-r from-white via-gray-50 to-white py-16 md:py-24 px-6 md:px-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
      <div className="absolute w-full bg-gray-400 blur-2xl h-5 top-0"></div>
      {!isMobile ? (
        <div className="absolute -bottom-40 -right-40 w-[20rem] md:w-[32rem] h-[20rem] md:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      ) : (
        <div className="absolute -bottom-40 -left-10 w-[20rem] md:w-[32rem] h-[20rem] md:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      )}

      <div className="w-full lg:w-1/2 lg:pr-12 space-y-6 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold  leading-snug text-gray-900">
          Why{" "}
          <span className="text-red-600 bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Alumni Talks
          </span>{" "}
          Matter
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
          Alumni talks bridge the gap between classrooms and real-world
          challenges. They inspire, guide, and equip students with knowledge
          that textbooks can’t provide.
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 p-4 md:p-6 rounded-2xl shadow-xl 
                       bg-white/70 backdrop-blur-lg border border-white/40
                       hover:scale-105 duration-300 transition-all transform cursor-pointer"
          >
            <div className="flex-shrink-0">{b.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyTalks;
