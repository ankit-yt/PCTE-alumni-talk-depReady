import React from "react";
import MobileHeader from "./../MobileHeader";
import ImageField from "./../ImageField";
import { IoArrowBack, IoChevronBackOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import CareerTimelineInput from "./../../customInputFields/CareerTimelineInput";
import AchievementInput from "../../customInputFields/AchievementInput";

import MediaInputs from "../../customInputFields/MediaInputs";

function Card2({
  values,
  setters,
  handleSubmit,
  handleUpdate,
  handleImageChange,
}) {
  const {
    section,
    Step,
    careerTimeline,
    achievement,
    newAch,
    isEditing,
    previewURL,
    inputFields,
    mediaInputFields,
    isVideoSelected,
    isImagesSelected,
    newClass,
    classJoined,
    isVideoUploaded,
    isImagesUploaded,
    videoRef,
    imageRef,
    
  } = values;

  const {
    setStep,
    setAchievement,
    setNewAch,
    setProfilePic, // pass from parent so mobile upload can update photo
    setIsImagesSelected,
    setIsVideoSelected,
    setNewClass,
    setClassJoined,
    setCareerTimeline,
  } = setters;
  console.log(section)

  const onMobileImageChange = (e) => {
    if (handleImageChange) return handleImageChange(e);
    const file = e.target.files?.[0];
    if (file && setProfilePic) setProfilePic(file);
  };


  const progressWidth = Step === 1 ? "50%" : "100%";

  console.log("printing step number")
  console.log(Step)

  return (
    <div
      className="
        w-full md:w-3/5 no-scrollbar h-full overflow-auto
        px-0 md:p-8
        bg-transparent md:bg-white
        border-none md:border md:border-red-100
        rounded-none md:rounded-3xl
        md:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition-all duration-300 ease-in-out
      "
    >
      {/* mobile header */}
      <MobileHeader
        props={{ previewURL,section, isEditing, Step, setStep, progressWidth }}
      />

      {/* desktop header */}
      <h1 className="hidden md:block text-red-600 text-2xl font-extrabold mb-6 tracking-wide">
        Bio & Other Details
      </h1>

      <form
        id="alumniForm"
        onSubmit={isEditing ? handleUpdate : handleSubmit}
        className="space-y-6 pb-3 md:pb-0 px-4 md:px-0"
        action="post"
      >
        {Step === 1 && (
          <div className="space-y-6">
            {/* Mobile-only photo upload */}
            {section === "AddAlumni" &&  <ImageField
              previewURL={previewURL}
              onMobileImageChange={onMobileImageChange}
            />}

            {/* Group: Basic Info */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-3">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {inputFields.map(
                  ({ label, type, value, setter, required, options }, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="text-xs md:text-sm text-gray-700 font-semibold mb-1 md:mb-2">
                        {label}
                      </label>

                      {type === "select" ? (
                        <select
                          value={value}
                          required={required}
                          onChange={(e) => setter(e.target.value)}
                          className="
            rounded-xl md:rounded-full  bg-gray-50 border border-gray-300
            px-3 md:px-4 py-2 md:py-3  text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-red-400
            transition-all
          "
                        >
                          <option value="">Select {label}</option>
                          {options?.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          value={value}
                          required={required}
                          onChange={(e) => setter(e.target.value)}
                          placeholder={`Enter ${label}`}
                          className="
            rounded-xl md:rounded-full bg-gray-50 border border-gray-300
            px-3 md:px-4 py-2 md:py-3 text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-red-400
            transition-all
          "
                        />
                      )}
                    </div>
                  )
                )}
              </div>
              {section === "planMeet" && (
                <AchievementInput
                  values={{
                    newAch: newClass,
                    achievement: classJoined,
                    title: "Classes Joined",
                    placeholder: "Add class",
                  }}
                  setters={{
                    setNewAch: setNewClass,
                    setAchievement: setClassJoined,
                  }}
                />
              )}
            </div>

            <div className="hidden md:flex md:justify-end mt-4">
              <button
                onClick={() => {
                  if(!(isImagesUploaded && isVideoUploaded)){
                    setStep(2)
                  }else{
                    console.log("cj;lla")
                    isEditing ? handleUpdate : handleSubmit
                  }
                }}
                className="
                  flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400
                  hover:from-red-700 hover:to-red-500 text-white py-3 px-6
                  rounded-full shadow-lg text-sm font-semibold tracking-wide
                "
              >
                {(isImagesUploaded && isVideoUploaded) ? 'Submit' : 'Next'}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 2 ===== */}
        {!(isVideoUploaded && isImagesUploaded ) && Step === 2 && (
          <>
            {section === "AddAlumni" && (
              <CareerTimelineInput
                careerTimeline={careerTimeline}
                setCareerTimeline={setCareerTimeline}
              />
            )}

            {section === "AddAlumni" && (
              <AchievementInput
                values={{
                  newAch,
                  achievement,
                  title: "Achievements",
                  placeholder: "New Achievement",
                }}
                setters={{ setNewAch, setAchievement }}
              />
            )}

            {section === "planMeet" && (
              <MediaInputs
                mediaInputFields={mediaInputFields}
                setters={{ setIsImagesSelected, setIsVideoSelected }}
                values={{
                  isImagesSelected,
                  isVideoSelected,
                  isImagesUploaded,
                  isVideoUploaded,
                  videoRef,
                  imageRef,
                }}
              />
            )}

            {/* Desktop nav buttons */}
            <div className="hidden md:flex justify-between mt-10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full shadow-sm"
              >
                <IoChevronBackOutline /> Back
              </button>
              <button
                onClick={isEditing ? handleUpdate : handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-medium py-2 px-6 rounded-full shadow-md"
              >
                Submit 
              </button>
            </div>
          </>
        )}
      </form>

      {/* ===== Mobile bottom action bar ===== */}
      <div className="md:hidden  bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-red-100 px-4 py-3">
        <div className="flex items-center justify-between">
          {Step === 1 ? (
            <>
              <span className="text-[12px] text-gray-500">Step 1 of 2</span>
              <button
              
                type="submit"
                form="alumniForm"
                onClick={(e) => {
                  if(!(isImagesUploaded && isVideoUploaded)){
                    
                  e.preventDefault()
                    setStep(2)
                  }else{
                    console.log("cj;lla")
                    isEditing ? handleUpdate : handleSubmit
                  }
                }}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold"
              >
               {(isImagesUploaded && isVideoUploaded) ? 'Submit' : 'Next'}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
              >
                <IoArrowBack /> Back
              </button>
              <button
                type="submit"
                form="alumniForm"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold"
                onClick={isEditing ? handleUpdate : handleSubmit}
              >
                 Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card2;
