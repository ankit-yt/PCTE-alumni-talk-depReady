import { LucideGraduationCap } from "lucide-react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { MdDeleteOutline, MdOutlineDeleteOutline } from "react-icons/md";


function Mobile({props}) {
  const {
    list,
    setClickedItem,
    clickedItem,
    isAction,
    setIsAction,
    setters,
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
    Step,
    actionIndex,
    setActionIndex
  } = props;

  return list
    .filter((query) => {
      if (search.trim().length === 0) return true;
      const lowerSearch = search.toLowerCase();
      return (
        query.name.toLowerCase().includes(lowerSearch) ||
        query.batch.toLowerCase().includes(lowerSearch) ||
        query.currentCompany.toLowerCase().includes(lowerSearch) ||
        query.currentRole.toLowerCase().includes(lowerSearch)
      );
    })
    .map((item, index) => (
      <div
        key={index}
        onClick={() => {
          setRpProfile(item.profilePic);
          setRpName(item.name);
          setRpQuote(item.quote);
          setRpBatch(item.batch);
          setRpCurrentRole(item.currentRole);
          setRpCurrentCompany(item.currentCompany);
          setRpEmail(item.email);
          setRpLinkedIn(item.linkedIn);
          setRpAchievement(item.achievements);
          setRpCareerTimeline(item.careerTimeline);
          setIsRightPanelOpen(true);
          setActionIndex(-1);
          setIsAction(false);
        }}
        className={`bg-white/95 ${
          index === actionIndex ? "z-60" : "z-0"
        } backdrop-blur-md rounded-xl shadow-md border border-red-100 p-4 flex items-center gap-4 relative hover:shadow-lg transition-all duration-200`}
      >
        <img
          src={item.profilePic || item.alumni[0].profilePic}
          alt="Profile"
          className="w-14 h-14 rounded-full border-2 border-red-300 object-cover"
        />

        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
          <p className="text-xs flex items-center gap-1  text-gray-500">
            <LucideGraduationCap size={15} className="inline text-blue-800 " /> <span> Batch: <span className="font-medium">{item.batch}</span></span>
          </p>
          <p className="text-xs flex text-gray-500 items-center gap-1 truncate">
            <IoBriefcaseOutline size={15} className="inline text-amber-900 " />   <span className="truncate text-ellipsis overflow-hidden whitespace-nowrap w-40">{item.currentRole} @ {item.currentCompany}</span>
          </p>
        </div>

        <div className="relative ">
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
            className="p-1 px-4 py-3 rounded-md hover:bg-red-100 transition"
          >
            ⋮
          </button>

          {isAction && clickedItem === index && (
            <div className="absolute right-0  top-8 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setters.setname(item.name);
                  setters.setBatch(item.batch);
                  setters.setCurrentCompany(item.currentCompany);
                  setters.setCurrentRole(item.currentRole);
                  setters.setLinkedIn(item.linkedIn);
                  setters.setEmail(item.email || "");
                  setters.setQuote(item.quote);
                  setters.setCareerTimeline(item.careerTimeline);
                  setters.setAchievement(item.achievements);
                  setters.setUpdatingAlumniId(item._id);
                  setters.setIsEditing(true);
                  setClickedItem(-1);
                  setIsAction(false);
                  setIsAdding(!isAdding);
                  setSearch("");
                }}
                className=" w-full  text-left px-3 py-1 text-sm flex items-center hover:bg-red-50 text-gray-700 gap-2"
              >
                <CiEdit size={15} className="text-blue-700 inline" /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                  setDeletingAlumniId(item._id);
                  setClickedItem(-1);
                  setIsAction(false);
                }}
                className=" w-full text-left items-center flex gap-2 px-3  py-1 text-sm hover:bg-red-50 text-red-600"
              >
                <MdOutlineDeleteOutline size={17} className="text-red-500 inline" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    ));
}

export default Mobile;
