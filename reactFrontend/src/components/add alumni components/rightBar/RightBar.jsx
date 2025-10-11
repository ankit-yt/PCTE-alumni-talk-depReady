import React, { useEffect, useState } from "react";
import InfoItem from "./InfoItem";
import Timeline from "./Timeline";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoCamera } from "react-icons/io5";
import Alumni from "./alumni";
import Meet from "./Meet";

function RightBar({ values }) {
  const {
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
    setIsGalleryOpen,
    meetId,
    allMeets,
    isGalleryOpen,
  } = values;

  const selectedMeetArray =
    allMeets?.find((meet) => String(meet._id) === String(meetId)) || [];

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  return (
    <div className="w-full md:mt-0  pt-20 pb-5 px-6 absolute overflow-auto rounded-sm bg-white/90 backdrop-blur-3xl border border-white/20 shadow-xl md:p-6 h-full text-gray-900 dark:text-white flex flex-col">
      {section === "addAlumni" ? (
        <Alumni
          values={{
            isTimelineOpen,
            RpEmail,
            RpName,
            RpProfile,
            Rpachievement,
            Rpbatch,
            RpcareerTimeline,
            RpcurrentCompany,
            RpcurrentRole,
            RplinkedIn,
            Rpquote,
          }}
          setters={{ setIsTimelineOpen, setIsRightPanelOpen }}
        />
      ) : (
        <Meet
          values={{ isTimelineOpen, selectedMeetArray, isGalleryOpen }}
          setters={{ setIsGalleryOpen, setIsRightPanelOpen, setIsTimelineOpen }}
        />
      )}
    </div>
  );
}

export default RightBar;
