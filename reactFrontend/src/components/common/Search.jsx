import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import RightBar from "../add alumni components/rightBar/RightBar";
import Timeline from "../add alumni components/rightBar/Timeline";
import { useSelector } from "react-redux";
import GalleryModel from "../plan meet components/gallery-components/GalleryModel";
import DesktopList from "../common/List/Desktop";
import MobileList from "../common/List/Mobile";

function Search({ handleDelete, values, setters }) {
  const {
    section,
    Step,
    search,
    list,
    clickedItem,
    isAction,
    isAdding,
    isGalleryOpen,
    mediaInputFields,
    imageIds,
    mobileViewImages,
    mobileViewVideo,
    isVideoSelected,
    isImagesSelected,
    isMediaUploadModelOpen,
    meetId,
    allMeets,
  } = values;

  const {
    setShowDeleteConfirm,
    setDeletingAlumniId,
    setDeletingMeetId,
    setSearch,
    setClickedItem,
    setIsAction,
    setIsAdding,
    setIsGalleryOpen,
    setStep,
    handleMediaUpdate,
    setImageIds,
    handleMobileMediaChange,
    setIsMediaUploadModelOpen,
    setMobileViewImages,
    setMobileViewVideo,
    setIsVideoSelected,
    setIsImagesSelected,
    handleMobileViewMediaSubmit,
  } = setters;
  console.log(setters);

  const { isTablet, screenWidth, isDesktop } = useSelector((state) => state.ui);
  console.log(isDesktop, screenWidth);
  const [RpProfile, setRpProfile] = useState("");
  const [RpName, setRpName] = useState("");
  const [Rpquote, setRpQuote] = useState("");
  const [Rpbatch, setRpBatch] = useState("");
  const [RpcurrentRole, setRpCurrentRole] = useState("");
  const [RpcurrentCompany, setRpCurrentCompany] = useState("");
  const [RpEmail, setRpEmail] = useState("");
  const [RplinkedIn, setRpLinkedIn] = useState("");
  const [Rpachievement, setRpAchievement] = useState([]);
  const [RpcareerTimeline, setRpCareerTimeline] = useState([{}]);

  //states for meet right panel

  const [selectedMeetArray, setSelectedMeetArray] = useState([]);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  return (
    <div className="absolute w-full h-full overflow-hidden glass-cardd md:p-5 py-3 top-0 left-0 flex flex-col  z-10">
      <div className="w-full relative    px-10 py-4 flex flex-col gap-4">
        <div
          className={`z-10 absolute md:-top-6 -top-20 w-80 h-[100vh] right-0 transform ${
            isRightPanelOpen
              ? " md:translate-x-8"
              : "md:translate-x-[30vw] translate-x-full"
          } transition-transform duration-300 mt-1 rounded-l-2xl`}
        >
          <RightBar
            values={{
              isGalleryOpen,
              setIsGalleryOpen,
              section,
              RpProfile,
              RpName,
              Rpquote,
              Rpbatch,
              RpcurrentRole,
              RpcurrentCompany,
              RpEmail,
              RplinkedIn,
              Rpachievement,
              RpcareerTimeline,
              setIsRightPanelOpen,
              selectedMeetArray,
              meetId,
              allMeets,
            }}
          />
        </div>
        {section === "planMeet" && (
          <div
            className={`
    fixed top-0 right-0 h-screen z-50 
    bg-white shadow-lg transition-all duration-500 
    ${
      isGalleryOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    }
    w-full sm:w-[calc(100vw-16rem)]
  `}
          >
            <GalleryModel
              values={{
                selectedMeetArray,
                mediaInputFields,
                imageIds,
                isGalleryOpen,
                mobileViewImages,
                mobileViewVideo,
                isVideoSelected,
                isImagesSelected,
                isMediaUploadModelOpen,
                meetId,
                allMeets,
              }}
              setters={{
                setIsGalleryOpen,
                handleMediaUpdate,
                setImageIds,
                handleMobileMediaChange,
                setIsMediaUploadModelOpen,
                setMobileViewImages,
                setMobileViewVideo,
                setIsVideoSelected,
                setIsImagesSelected,
                handleMobileViewMediaSubmit,
              }}
            />
          </div>
        )}

        <div className=" search md:w-1/2   h-12  bg-white/90 rounded-full flex items-center px-4 shadow-lg border border-red-200 backdrop-blur-sm transition-all hover:shadow-red-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-full bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400"
            placeholder="Search alumni..."
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-extrabold  dark:text-white tracking-tight 
               bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent 
               text-center sm:text-left">
  {section === "addAlumni" ? " Alumni Profiles" : " Alumni Talks"}
</h1>


          <button
            onClick={() => {
              console.log("clicked");
              if (section === "addAlumni") {
                
                setters.setname("");
                setters.setProfilePic(null);
                setters.setBatch("");
                setters.setLinkedIn("");
                setters.setEmail("");
                setters.setCurrentCompany("");
                setters.setCurrentRole("");
                setters.setCareerTimeline([
                  { year: "", role: "", company: "", location: "" },
                ]);
                setters.setAchievement([]);
                setters.setQuote("");
                setters.setErrorMessage("");
              setters.setNewAch("");
              } else {
                setImageIds([]);
                setters.setSearch("");
                setters.setAlumniId("");
                setters.setTitle("");
                setters.setClassJoined([]);
                setters.setOrganizedBy("");
                setters.setLocation("");
                setters.setDate("");
                setters.setAlumni("");
                setters.setUpdatingMeetId("");
                setters.setDescription("");
                setters.setImages([]);
                setters.setPreviewURL("");
                setters.setClickedItem(-1);
                setters.setIsAction(false);
                setters.setIsEditing(false);
                setters.setDeletingMeetId("");
                setters.setAlumniName("");
                setters.setMeetId("");
                setters.setIsVideoUploaded(false);
                setters.setIsImagesUploaded(false);
                setters.setImageIds([]);
                setters.setMobileViewImages([]);
                setters.setMobileViewVideo(null);
                setters.setIsVideoSelected(false);
                setters.setIsImagesSelected(false);
                setters.setVideo(null)
              }

              setIsAdding(!isAdding);
              setters.setIsEditing(false);
              setters.setStep(1);
              setters.setPreviewURL(null);
            }}
            className="flex justify-center items-center gap-2 
               bg-gradient-to-r from-red-500 to-red-600 
               hover:from-red-600 hover:to-red-700 
               text-white px-4 sm:px-5 py-2 
               rounded-lg shadow-lg shadow-red-200 
               transition-all w-full sm:w-auto"
          >
            <IoAddOutline size={20} />
            <span className="text-sm font-medium">Add New Alumni</span>
          </button>
        </div>
      </div>

      {/*  Table */}
      {isTablet || isDesktop ? (
        <DesktopList
          props={{
            selectedMeetArray,
            section,
            list,
            setClickedItem,
            handleDelete,
            clickedItem,
            isAction,
            setIsAction,
            setters,
            setSelectedMeetArray,
            setRpProfile,
            setRpAchievement,
            setRpBatch,
            setRpCareerTimeline,
            setRpCurrentCompany,
            setRpCurrentRole,
            setRpEmail,
            setIsAdding,
            setIsRightPanelOpen,
            setRpLinkedIn,
            setRpName,
            setRpQuote,
            setSearch,
            isAdding,
            search,
            setShowDeleteConfirm,
            setDeletingAlumniId,
            setDeletingMeetId,
            setStep,
            Step,
            setImageIds,
          }}
        />
      ) : (
        <MobileList
          props={{
            selectedMeetArray,
            section,
            list,
            setClickedItem,
            handleDelete,
            clickedItem,
            isAction,
            setIsAction,
            setters,
            setSelectedMeetArray,
            setRpProfile,
            setRpAchievement,
            setRpBatch,
            setRpCareerTimeline,
            setRpCurrentCompany,
            setRpCurrentRole,
            setRpEmail,
            setIsAdding,
            setIsRightPanelOpen,
            setRpLinkedIn,
            setRpName,
            setRpQuote,
            setSearch,
            isAdding,
            search,
            setShowDeleteConfirm,
            setDeletingAlumniId,
            setDeletingMeetId,
            setStep,
            Step,
            setImageIds,
          }}
        />
      )}
    </div>
  );
}

export default Search;
