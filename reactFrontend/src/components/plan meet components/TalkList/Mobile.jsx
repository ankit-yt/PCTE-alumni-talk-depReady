import React from "react";
import { MdOutlineDeleteOutline, MdTitle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { MapPin } from "lucide-react";
import { CiEdit } from "react-icons/ci";

function Mobile({ props }) {
  const {
    list,
    setSelectedMeetArray,
    setClickedItem,
    clickedItem,
    isAction,
    setIsAction,
    setters,
    setIsAdding,
    setIsRightPanelOpen,
    setSearch,
    isAdding,
    search,
    setShowDeleteConfirm,
    setDeletingMeetId,
    setStep,
    Step,
    actionIndex,
    setActionIndex,
  } = props;

  return list
    .filter((query) => {
      if (search.trim().length === 0) return true;
      const lowerSearch = search.toLowerCase();
      return (
        query.alumni[0].name.toLowerCase().includes(lowerSearch) ||
        query.alumni[0].batch.toLowerCase().includes(lowerSearch) ||
        query.organizedBy.toLowerCase().includes(lowerSearch) ||
        query.location.toLowerCase().includes(lowerSearch)
      );
    })
    .map((item, index) => (
      <div
        onClick={() => {
          setters.setMeetId(item._id);
          setSelectedMeetArray(item);
          setIsRightPanelOpen(true);
          setActionIndex(-1);
          setIsAction(false);
        }}
        key={index}
        className={`group relative justify-center  bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-200 p-5 flex items-start gap-4 cursor-pointer`}
      >
        <div
          className={`w-15 h-15 ${
            item.status === "Completed" ? "bg-green-500" : "bg-yellow-500"
          } flex justify-center items-center rounded-full`}
        >
          <img
            src={item.alumni[0]?.profilePic}
            alt={item.alumni[0]?.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-300"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-800 truncate">
            {item.alumni[0]?.name}
          </h2>

          <p className="mt-1 text-sm font-medium w-32 text-red-600 flex items-center gap-1">
            <FaRegEdit className="text-red-500" size={14} />
            <span className="truncate">{item.title}</span>
          </p>

          <p className="mt-1 text-xs text-gray-500 flex items-center flex-wrap gap-2">
            <CalendarDaysIcon className="w-4 text-blue-600" />
            {new Date(item.time).toLocaleDateString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            <span className="text-gray-400">•</span>
            <MapPin className="w-4 h-4 text-green-500" /> {item.location}
          </p>
        </div>

        <div className="relative flex gap-5 items-center self-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActionIndex(index);
              if (clickedItem === index && isAction) {
                setActionIndex(-1);
                setIsAction(false);
                setClickedItem(-1);
              } else {
                setIsAction(true);
                setClickedItem(index);
              }
            }}
            className="py-1 px-4 rounded-full hover:bg-gray-100 transition"
          >
            ⋮
          </button>

          {isAction && clickedItem === index && (
            <div className="absolute right-0 top-6 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setStep(1);
                  setters.setTitle(item.title);
                  setters.setAlumniName(item.alumni[0].name);
                  setters.setDate(
                    new Date(item.time).toISOString().slice(0, 16)
                  );
                  setters.setLocation(item.location);
                  setters.setMeetId(item._id);
                  setters.setClassJoined(item.classJoined);
                  setters.setOrganizedBy(item.organizedBy);
                  setters.setDescription(item.description);
                  setters.setAlumni(item.alumni[0]._id);
                  setters.setPreviewURL(item.alumni[0].profilePic);
                  setters.setUpdatingMeetId(item._id);
                  setters.setIsEditing(true);
                  setClickedItem(-1);
                  setIsAction(false);

                  if (item.media.images.length !== 0) {
                    setters.setIsImagesUploaded(true);
                  } else {
                    setters.setIsImagesUploaded(false);
                  }

                  if (item.media.videoLink) {
                    setters.setIsVideoUploaded(true);
                  } else {
                    setters.setIsVideoUploaded(false);
                  }

                  setIsAdding(!isAdding);
                  setSearch("");
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
              >
                <CiEdit size={20} className="text-blue-700 inline" /> Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setDeletingMeetId(item._id);
                  setClickedItem(-1);
                  setIsAction(false);
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
              >
                <MdOutlineDeleteOutline
                  size={19}
                  className="text-red-500 inline"
                />{" "}
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ));
}

export default Mobile;
