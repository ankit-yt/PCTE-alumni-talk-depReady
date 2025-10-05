import React from 'react'
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function Desktop({props}) {
      const {
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
  } = props;
  return (
              <table className="w-full table-fixed text-sm  text-gray-700">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-red-500 to-red-600  text-white">
              <tr>
                <th className="px-4 py-3 text-left w-[5%]">#</th>
                <th className="px-4 py-3 text-left w-[12%]">Profile</th>
                <th className="px-4 py-3 text-left w-[20%]">Name</th>
                <th className="px-4 py-3 text-left w-[12%]">Batch</th>
                <th className="px-4 py-3 text-left w-[20%]">Company</th>
                <th className="px-4 py-3 text-left w-[15%]">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {list
                .filter((alumni) => {
                  if (search.trim().length === 0) {
                    return true;
                  }
                  const lowerSearch = search.toLowerCase();
                  return (
                    alumni.name.toLowerCase().includes(lowerSearch) ||
                    alumni.batch.toLowerCase().includes(lowerSearch) ||
                    alumni.currentCompany.toLowerCase().includes(lowerSearch) ||
                    alumni.currentRole.toLowerCase().includes(lowerSearch)
                  );
                })
                .map((alumni, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setRpProfile(alumni.profilePic);
                        setRpName(alumni.name);
                        setRpQuote(alumni.quote);
                        setRpBatch(alumni.batch);
                        setRpCurrentRole(alumni.currentRole);
                        setRpCurrentCompany(alumni.currentCompany);
                        setRpEmail(alumni.email);
                        setRpLinkedIn(alumni.linkedIn);
                        setRpAchievement(alumni.achievements);
                        setRpCareerTimeline(alumni.careerTimeline);
                        if(section === 'planMeet'){
                          setImageIds([])
                        }
                         setClickedItem(-1);
                                setIsAction(false);
                        setIsRightPanelOpen(true);
                      }}
                      key={index}
                      className="hover:bg-red-50 transition-all duration-200 border-b border-gray-200"
                    >
                      <td className="px-4 py-3 font-medium">{index + 1}</td>
                      <td className="px-4 py-3">
                        <img
                          src={alumni.profilePic}
                          alt="Profile"
                          className="w-12 h-12 object-top rounded-full border-2 border-red-300 object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {alumni.name}
                      </td>
                      <td className="px-4 py-3">2023</td>
                      <td className="px-4 py-3">Google</td>
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

                        {/* Dropdown Menu - Fixed Width to Avoid Table Shift */}
                        {isAction && clickedItem === index && (
                          <div className="absolute right-2 top-10 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();

                                setStep(1);
                                  console.log(Step)
                                setters.setname(alumni.name);
                                setters.setBatch(alumni.batch);
                                setters.setCurrentCompany(
                                  alumni.currentCompany
                                );
                                setters.setCurrentRole(alumni.currentRole);
                                setters.setLinkedIn(alumni.linkedIn);
                                setters.setEmail(
                                  alumni.email ? alumni.email : ""
                                );
                                setters.setQuote(alumni.quote);
                                setters.setCareerTimeline(
                                  alumni.careerTimeline
                                );
                                setters.setAchievement(alumni.achievements);
                                setters.setUpdatingAlumniId(alumni._id);
                                setters.setIsEditing(true);
                                setClickedItem(-1);
                                setIsAction(false);
                                setIsAdding(!isAdding);
                                setSearch("");
                              }}
                              className="flex items-center gap-2  w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-gray-700"
                            >
                             <CiEdit size={20} className="text-blue-700 inline" /> Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirm(true);
                                setDeletingAlumniId(alumni._id);
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
                  );
                })}
            </tbody>
          </table>
  )
}

export default Desktop
