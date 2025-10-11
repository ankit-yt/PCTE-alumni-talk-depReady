import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { addFeedback, randomFeedbacks } from "../../api/feedback.api";
import { toast, Toaster } from "sonner";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await randomFeedbacks();
        if (response.data.status === "success") {
          setTestimonials(response.data.feedbacks);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchTestimonials();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFeedback(formData);
      setFormData({ name: "", company: "", comment: "" });
      toast.success("Feedback added successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-28 bg-white overflow-hidden">
      <Toaster richColors position="top-right"/>
      
      <div className="absolute w-60 sm:w-72 h-60 sm:h-72 bg-red-500/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-60 sm:w-72 h-60 sm:h-72 bg-blue-500/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center relative z-10 mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
          Voices that{" "}
          <span className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Inspires
          </span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Visionaries and changemakers who inspire our community.
        </p>
      </div>

        
        <div className="grid md:mt-25 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white relative rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100"
            >
              <span className="absolute text-5xl sm:text-6xl text-red-500/20 top-4 left-4">
                “
              </span>

              <p className="text-gray-700 text-sm sm:text-md leading-relaxed mb-6">
                {t.comment}
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-red-500"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{t.role} <span>@ {t.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
        <div className="max-w-lg mx-auto mt-30 relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 sm:w-60 h-40 sm:h-60 bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-6">
                💬 Share Your Feedback
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>

                
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-sm font-semibold text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your organization"
                    className="rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                
                <div className="flex flex-col">
                  <label htmlFor="comment" className="text-sm font-semibold text-gray-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Write your thoughts..."
                    className="rounded-xl border border-gray-200 px-4 py-2.5 sm:py-3 bg-white/90 shadow-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>

                
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-6 rounded-lg font-semibold tracking-wide
                             text-gray-800 bg-white border border-gray-200
                             hover:border-[#1e3a8a] hover:text-[#1e3a8a]
                             shadow-sm hover:shadow-md
                             active:scale-[0.98]
                             transition-all duration-200 ease-out"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
