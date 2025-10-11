import React from "react";
import AlumniList  from '../../add alumni components/AlumniList/Desktop'
import TalksList from "../../plan meet components/TalkList/Desktop";

function Desktop({ props }) {
  const {
    section,
    list,
    setSelectedMeetArray,
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
    setDeletingMeetId,
    setStep,
    Step,
    setImageIds
  } = props;
  return (
    <div className="w-full flex-1 overflow-auto px-10 pb-6">
      <div className={` ${list.length > 0 ? "rounded-xl shadow-xl border  border-red-100 bg-white/95 backdrop-blur-md" : ""}`}>
        {section === "addAlumni" ? (
          <AlumniList props={{
            section,
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
    setStep,
    Step,
    setImageIds
          }}/>
        ) : (
          <TalksList props={{
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
          }}/>
        )}
      </div>
    </div>
  );
}

export default Desktop;
