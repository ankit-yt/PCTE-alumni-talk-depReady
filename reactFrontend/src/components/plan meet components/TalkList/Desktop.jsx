import React from 'react'
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
function Desktop({props}) {
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
  } = props;
  return (
    <table className="w-full  table-fixed text-sm text-gray-700">
         
            <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left  w-[5%]">#</th>
                <th className="px-4 py-3  w-[15%]">Alumni Pic</th>
                <th className="px-4 py-3 text-left  w-[20%]">Alumni's Name</th>
                <th className="px-4 py-3 text-left  w-[15%]">Date</th>
                <th className="px-4 py-3 text-left  w-[15%]">Location</th>
                <th className="px-4 py-3 text-left  w-[15%]">Organized By</th>
                <th className="px-4 py-3    w-[15%]">status</th>
                <th className="px-4 py-3 text-left  w-[15%]">Action</th>
              </tr>
            </thead>

            <tbody>
              {list
                .filter((meet) => {
                  if (search.trim().length === 0) return true;
                  const lowerSearch = search.toLowerCase();
                  return (
                    meet.title.toLowerCase().includes(lowerSearch) ||
                    meet.location.toLowerCase().includes(lowerSearch) ||
                    meet.organizedBy.toLowerCase().includes(lowerSearch)
                  );
                })
                .map((meet, index) => (
                  <tr
                    onClick={() => {
                      setters.setMeetId(meet._id)
                      setSelectedMeetArray(meet);
                      setIsRightPanelOpen(true);
                      setClickedItem(-1);
                              setIsAction(false);
                    }}
                    key={index}
                    className="hover:bg-red-50 transition-all duration-200 border-b border-gray-200"
                  >
                    <td className="px-4 py-3 font-medium">{index + 1}</td>
                    <td className="px-4 py-3  ">
                      <img
                        src={meet.alumni[0]?.profilePic || ''}
                        alt="Profile"
                        className="w-12 h-12 mx-auto object-top rounded-full border-2 border-red-300 object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 truncate">
                      {meet.alumni[0].name}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(meet.time).toLocaleDateString('en-us',{
                        month:'short',
                        day:'2-digit',
                        year:'2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3 truncate">{meet.location}</td>
                    <td className="px-4 py-3 truncate">{meet.organizedBy}</td>
                    <td className="px-4 py-3 w-full  ">
                      <span
                        className={`px-3 py-1  rounded-full w-fit mx-auto block  text-center  text-xs  font-semibold
      ${
        (meet.status === "Upcoming" ) &&
        "bg-yellow-100 text-yellow-700 border border-yellow-300"
      }
      ${
        meet.status === "Ongoing" &&
        "bg-blue-100 text-blue-700 border border-blue-300"
      }
      ${
        meet.status === "Completed" &&
        "bg-green-100 text-green-700 border border-green-300"
      }
      ${
        meet.status === "Cancelled" &&
        "bg-red-100 text-red-700 border border-red-300"
      }
    `}
                      >
                        {meet.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (clickedItem === index && isAction) {
                            setIsAction(false);
                            setClickedItem(-1);
                          } else {
                            setIsAction(true);
                            setClickedItem(index);
                          }
                        }}
                        className="py-1 px-4 rounded-md hover:bg-red-100 transition"
                      >
                        ⋮
                      </button>

                      {/* Dropdown Menu */}
                      {isAction && clickedItem === index && (
                        <div className="absolute right-2 top-10 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              
                                setStep(1);
                              setters.setTitle(meet.title);
                              setters.setAlumniName(meet.alumni[0].name);
                              setters.setDate(
                                new Date(meet.time).toISOString().slice(0, 16)
                              );
                              setters.setLocation(meet.location);
                              setters.setMeetId(meet._id);
                              setters.setClassJoined(meet.classJoined);
                              setters.setOrganizedBy(meet.organizedBy);
                              setters.setDescription(meet.description);
                              setters.setAlumni(meet.alumni[0]._id);
                              setters.setPreviewURL(meet.alumni[0].profilePic);
                              setters.setUpdatingMeetId(meet._id);
                              setters.setIsEditing(true);
                              setClickedItem(-1);
                              setIsAction(false);
                              if (meet.media.images.length != 0) {
                                setters.setIsImagesUploaded(true);
                              } else {
                                setters.setIsImagesUploaded(false);
                              }
                              if (meet.media.videoLink) {
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
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("clicked");
                              setShowDeleteConfirm(true);
                              console.log(meet._id);
                              setDeletingMeetId(meet._id);
                              setClickedItem(-1);
                              setIsAction(false);
                            }}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                          >
                            <MdOutlineDeleteOutline size={19} className="text-red-500 inline" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
  )
}

export default Desktop
