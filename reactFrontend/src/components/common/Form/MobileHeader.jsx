import React from 'react'

function MobileHeader({props}) {
    const {previewURL , isEditing ,section, Step , setStep , progressWidth} = props
  return (
    <div className="md:hidden  top-0  bg-white/90 backdrop-blur border-b border-red-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-red-200 bg-gray-100">
              <img
                src={
                  previewURL ||
                  "https://www.gravatar.com/avatar/?d=mp&s=100"
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-red-700">
                {section === 'AddAlumni' ? (isEditing ? "Edit Alumni" : "Add Alumni") : (isEditing ? "Edit Talk" : "Add new Talk")}
              </h2>
              <p className="text-[11px] text-gray-500">Step {Step} of 2</p>
            </div>
          </div>
        </div>

        {/* Segmented control */}
        <div className="mt-3">
          <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`py-2 text-sm font-medium rounded-lg transition ${Step === 1 ? "bg-white shadow" : "text-gray-600"
                }`}
            >
              Bio
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`py-2 text-sm font-medium rounded-lg transition ${Step === 2 ? "bg-white shadow" : "text-gray-600"
                }`}
            >
              {section === 'addAlumni' ? "Career & Achievements" : "Media"}
            </button>
          </div>
          {/* progress bar */}
          <div className="h-1 mt-3 rounded-full bg-gray-200">
            <div
              className="h-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 transition-all"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
  )
}

export default MobileHeader
