import React from 'react'

function DeleteModel({setters , values, handler}) {
    const {handleDelete} = handler
    const {setShowDeleteConfirm } = setters
    const {id , section} = values
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 animate-fadeIn">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
              Delete {section === 'planMeet' ? 'Talk' : "Alumni"}?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. Are you sure you want to permanently
              remove this {section === 'planMeet' ? 'talk' : "alumni"}?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(id);
                  setShowDeleteConfirm(false);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
 
  )
}

export default DeleteModel
