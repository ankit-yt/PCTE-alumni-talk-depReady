import React from 'react'

import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function CareerTimelineInput({careerTimeline , setCareerTimeline}) {
  return (
    <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                     Career Timeline
                  </h2>
    
                  <div className="space-y-6 relative">
                    {(careerTimeline || []).map((step, index) => (
                      <div key={index} className="relative pl-8 group">
                        
                        <div className="absolute top-0 left-2 w-0.5 h-full bg-gradient-to-b from-red-400 to-red-600"></div>
    
                        <div className="absolute left-[.1rem] top-2 w-4 h-4 rounded-full bg-white border-2 border-red-500"></div>
    
                        <div className="  flex items-center gap-2 border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                          <div className="grid  grid-cols-1 md:grid-cols-4 gap-3">
                            {["year", "role", "company", "location"].map(
                              (field) => (
                                <input
                                  key={field}
                                  type={field === "year" ? "number" : "text"}
                                  placeholder={
                                    field.charAt(0).toUpperCase() + field.slice(1)
                                  }
                                  value={step[field]}
                                  onChange={(e) => {
                                    const updated = [...careerTimeline];
                                    updated[index][field] = e.target.value;
                                    setCareerTimeline(updated);
                                  }}
                                  className="
                      w-full rounded-3xl border border-gray-200 px-3 py-2
                      text-sm text-gray-700 bg-gray-50
                      focus:outline-none 
                      transition
                    "
                                />
                              )
                            )}
                          </div>
    
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setCareerTimeline(
                                  careerTimeline.filter((_, i) => i !== index)
                                )
                              }
                              className="text-red-500 hover:text-red-700 text-xl font-medium"
                            >
                              <IoClose />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
    
                  <button
                    type="button"
                    onClick={() =>
                      setCareerTimeline([
                        ...careerTimeline,
                        { year: "", role: "", company: "", location: "" },
                      ])
                    }
                    className="
          mt-6 flex items-center gap-2 px-5 py-2 rounded-full
          bg-gradient-to-r from-red-600 to-red-400
          text-white text-sm font-semibold shadow-md
          hover:from-red-700 hover:to-red-500 transition
        "
                  >
                    <IoAdd size={20}/> Add Career Step
                  </button>
                </div>
  )
}

export default CareerTimelineInput
