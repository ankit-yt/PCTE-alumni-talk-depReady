import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTalksOnFrontend } from "../../api/meet.api";
import { IoPinSharp } from "react-icons/io5";

function UpcomingTalks() {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    const fetchMeet = async () => {
      try {
        const data = await fetchTalksOnFrontend("allUpcomings");
        setTalks(data.data || []);
      } catch (err) {
        console.error("Failed to fetch talks:", err.message);
      }
    };

    fetchMeet();
  }, []);

  const AlumniAvatar = ({ alumni }) => {
    if (!alumni) return null;
    return (
      <div className="relative md:w-42 md:h-42 w-24 h-24 rounded-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-red-500 to-blue-500 blur-2xl opacity-70"></div>
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img
            src={alumni.profilePic}
            alt={alumni.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    );
  };

  return (
    <section className="w-full z-10 bg-gradient-to-r from-white via-gray-50 to-white text-gray-900 overflow-hidden py-24 px-2 relative">
      <div className="absolute -top-40 -left-20 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[22rem] sm:w-[32rem] h-[22rem] sm:h-[32rem] bg-red-300/30 rounded-full blur-3xl" />

      <div className="text-center relative z-10 mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Upcoming{" "}
          <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Talk's
          </span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Visionaries and changemakers who inspire our community.
        </p>
      </div>
      <div className="max-w-5xl md:mt-35 mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 to-blue-500"></div>

        <div className="space-y-16 ">
          {talks.map((talk, i) => {
            const alumni = talk.alumni?.[0];

            return (
              <motion.div
                key={talk._id || i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  i % 2 === 0 ? "md:pr-5" : "md:pl-5"
                }`}
              >
                <div className="md:block hidden w-6 h-6 bg-blue-900 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10 shadow-lg"></div>

                {i % 2 !== 0 && (
                  <div className="md:block hidden ml-auto">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                )}

                <div
                  className={`md:w-1/2 w-full flex flex-row p-6 rounded-2xl shadow-sm bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                    i % 2 === 0 ? "md:mr-6" : "md:ml-6"
                  }`}
                >
                  {/* Date + Location */}
                  <div className=" flex flex-col justify-center">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>
                        {new Date(talk.time).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="mx-2">·</span>
                      <span>
                        {new Date(talk.time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="mx-2">·</span>
                      <IoPinSharp className="text-red-500" size={16} />
                      <span className="ml-1 font-medium text-gray-700">
                        {talk.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mt-3 text-gray-900 leading-snug">
                      {talk.title || talk.description}
                    </h3>

                    {/* Alumni */}
                    {alumni && (
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">
                          {alumni.name}
                        </span>{" "}
                        —{" "}
                        <span className="text-red-600">
                          {alumni.currentCompany || "Independent"}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Mobile avatar */}
                  <div className="mt-4 md:hidden">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                </div>

                {i % 2 === 0 && (
                  <div className="md:block hidden mr-auto">
                    <AlumniAvatar alumni={alumni} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UpcomingTalks;
