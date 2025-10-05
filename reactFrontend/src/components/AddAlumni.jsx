import React, { useEffect, useState } from "react";
import { addNewAlumni, deleteAlumni, updateAlumni } from "../api/alumni.api";
import Card1 from "./common/Form/FormCards/Card1";
import Card2 from "./common/Form/FormCards/Card2";
import SearchAlumni from "./common/Search";
import { FiSearch } from "react-icons/fi";
import { RiResetLeftFill } from "react-icons/ri";
import Header from "./common/Header";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteModel from "./common/DeleteModel";
import loading from "../../public/loader.json";
import Lottie from "lottie-react";
import { setAlumniLoading } from "../redux/slices/loadingSlice";
import { toast, Toaster } from "sonner";

function AddAlumni() {
  const dispatch = useDispatch();

  const { reFetch, setReFetch } = useOutletContext();
  const allAlumni = useSelector((state) => state.alumni);

  const [name, setname] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [batch, setBatch] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [email, setEmail] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [careerTimeline, setCareerTimeline] = useState([
    { year: "", role: "", company: "", location: "" },
  ]);
  const [achievement, setAchievement] = useState([]);
  const [quote, setQuote] = useState("");
  const [Step, setStep] = useState(1);
  const [newAch, setNewAch] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [allAlumniList, setAllAlumniList] = useState([]);
  const [search, setSearch] = useState("");
  const [isAction, setIsAction] = useState(false);
  const [clickedAlumni, setClickedAlumni] = useState(-1);
  const [isAddingAlumni, setIsAddingAlumni] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatingAlumniId, setUpdatingAlumniId] = useState(-1);
  const [width, setWidth] = useState(window.innerWidth);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingAlumniId, setDeletingAlumniId] = useState("");

  const [triggerReset, setTriggerReset] = useState(false);

  const { alumniLoading } = useSelector((state) => state.loading);

  const inputFields = [
    {
      label: "Name",
      type: "text",
      value: name,
      setter: setname,
      required: true,
    },
    {
      label: "Batch",
      type: "number",
      value: batch,
      setter: setBatch,
      required: true,
    },
    {
      label: "Email",
      type: "email",
      value: email,
      setter: setEmail,
      required: false,
    },
    {
      label: "LinkedIn",
      type: "text",
      value: linkedIn,
      setter: setLinkedIn,
      required: true,
    },
    {
      label: "Current Company",
      type: "text",
      value: currentCompany,
      setter: setCurrentCompany,
      required: true,
    },
    {
      label: "Current Role",
      type: "text",
      value: currentRole,
      setter: setCurrentRole,
      required: true,
    },
    {
      label: "Quotes",
      type: "text",
      value: quote,
      setter: setQuote,
      required: false,
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Move this inside the function body

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePic", profilePic);
    formData.append("batch", batch);
    formData.append("linkedIn", linkedIn);
    formData.append("email", email);
    formData.append("currentCompany", currentCompany);
    formData.append("currentRole", currentRole);
    formData.append("careerTimeline", JSON.stringify(careerTimeline));
    formData.append("achievement", JSON.stringify(achievement));
    formData.append("quote", quote);

    console.log("checking picture");
    console.log(formData.profilePic);
    dispatch(setAlumniLoading(true));
    try {
      const response = await addNewAlumni(formData);
      console.log(response);
      toast.success("🎉 Alumni added successfully!");

      setname("");
      setProfilePic(null);
      setBatch("");
      setLinkedIn("");
      setEmail("");
      setCurrentCompany("");
      setCurrentRole("");
      setCareerTimeline([{ year: "", role: "", company: "", location: "" }]);
      setAchievement([]);
      setQuote("");
      setStep(1);
      setNewAch("");
      setPreviewURL(null);
      setReFetch(!reFetch);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Something went wrong";

        setErrorMessage(message);

        if (status !== 422) {
          toast.error("❌ Failed to add alumni. Try again.");
        }
      } else if (error.request) {
        toast.error("❌ No response from server. Please try again.");
      } else {
        toast.error(`❌ ${error.message}`);
      }
    } finally {
      dispatch(setAlumniLoading(false));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (profilePic !== null) {
      formData.append("profilePic", profilePic);
    }
    formData.append("batch", batch);
    formData.append("linkedIn", linkedIn);
    formData.append("email", email);
    formData.append("currentCompany", currentCompany);
    formData.append("currentRole", currentRole);
    formData.append("careerTimeline", JSON.stringify(careerTimeline));
    formData.append("achievement", JSON.stringify(achievement));
    formData.append("quote", quote);

    console.log("checking picture");
    console.log(formData.profilePic);
    dispatch(setAlumniLoading(true));
    try {
      const response = await updateAlumni(formData, updatingAlumniId);
      console.log(response);
      toast.success(" Alumni Updated successfully!");

      setname("");
      setProfilePic(null);
      setBatch("");
      setLinkedIn("");
      setEmail("");
      setCurrentCompany("");
      setCurrentRole("");
      setCareerTimeline([{ year: "", role: "", company: "", location: "" }]);
      setAchievement([]);
      setQuote("");
      setStep(1);
      setNewAch("");
      setPreviewURL(null);
      setUpdatingAlumniId(-1);
      setIsEditing(false);
      setReFetch(!reFetch);
      setErrorMessage("");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Something went wrong";

        setErrorMessage(message);

        if (status !== 422) {
          toast.error("❌ Failed to add alumni. Try again.");
        }
      } else if (error.request) {
        toast.error("❌ No response from server. Please try again.");
      } else {
        toast.error(`❌ ${error.message}`);
      }
    } finally {
      dispatch(setAlumniLoading(false));
    }
  };

  const handleDeleteAlumni = async (alumniId) => {
    dispatch(setAlumniLoading(true));
    try {
      const response = await deleteAlumni(alumniId);
      console.log(response);
      toast.success("🎉 Alumni deleted successfully!");
      setDeletingAlumniId("");
      setReFetch(!reFetch);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      console.log(error.message);
    } finally {
      dispatch(setAlumniLoading(false));
    }
  };

  const handleReset = () => {
    setname("");
    setProfilePic(null);
    setBatch("");
    setLinkedIn("");
    setEmail("");
    setCurrentCompany("");
    setCurrentRole("");
    setCareerTimeline([{ year: "", role: "", company: "", location: "" }]);
    setAchievement([]);
    setQuote("");
    setStep(1);
    setNewAch("");
    setPreviewURL(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (triggerReset) {
      handleReset();
      setTriggerReset(false);
    }
  }, [triggerReset]);

  useEffect(() => {
    setAllAlumniList(allAlumni);
  }, [allAlumni]);

  useEffect(() => {
    const handleSize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  });

  return (
    <div className="flex relative flex-col h-full w-full p-6 gap-6">
      <Toaster richColors position="top-right" />
      {showDeleteConfirm && (
        <DeleteModel
          handler={{ handleDelete: handleDeleteAlumni }}
          values={{ id: deletingAlumniId }}
          setters={{ setShowDeleteConfirm }}
        />
      )}

      {alumniLoading && (
        <div className="w-full bg-white/10 z-99 backdrop-blur-sm h-full absolute top-0 left-0 flex justify-center items-center">
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            className="w-20 "
          />
        </div>
      )}

      {!isAddingAlumni && (
        <SearchAlumni
          handleDelete={handleDeleteAlumni}
          values={{
            search,
            list: allAlumniList,
            clickedItem: clickedAlumni,
            isAction,
            isAdding: isAddingAlumni,
            width,
            section: "addAlumni",
          }}
          setters={{
            setname,
            setProfilePic,
            setBatch,
            setLinkedIn,
            setEmail,
            setCurrentCompany,
            setCurrentRole,
            setCareerTimeline,
            setAchievement,
            setQuote,
            setStep,
            setNewAch,
            setUpdatingAlumniId,
            setIsEditing,
            setPreviewURL,
            setErrorMessage,
            setShowDeleteConfirm,
            setDeletingAlumniId,
            setSearch,
            setClickedItem: setClickedAlumni,
            setIsAction,
            setIsAdding: setIsAddingAlumni,
          }}
        />
      )}

      <div className="md:px-10 h-full no-scrollbar overflow-auto  ">
        <Header
          value={{
            isEditing,
            errorMessage,
            section: "addAlumni",
            title1: "Add New Alumni",
            description1:
              "Provide the alumni's details below to add them to the system.",
            title2: "Edit Alumni Information",
            description2:
              "Update the details below to edit this alumni’s record in the database.",
            triggerReset,
          }}
          setters={{
            setErrorMessage,
            setIsAdding: setIsAddingAlumni,
            setTriggerReset,
          }}
          handleReset={handleReset}
        />

        <div className="w-full mt-4 gap-4 md:h-5/6 h-auto flex flex-col md:flex-row">
          {width >= 1024 && width >= 768 ? (
            <Card1
              profilePic={profilePic}
              handleImageChange={handleImageChange}
              values={{
                title: "Upload Profile Picture",
                inputType: "file",
                previewURL,
              }}
              setters={{}}
            />
          ) : null}
          <Card2
            values={{
              section: "AddAlumni",
              name,
              batch,
              linkedIn,
              email,
              currentCompany,
              currentRole,
              careerTimeline,
              achievement,
              quote,
              Step,
              newAch,
              isEditing,
              updatingAlumniId,
              previewURL,
              profilePic,
              inputFields,
            }}
            handleImageChange={handleImageChange}
            setters={{
              setname,
              setBatch,
              setLinkedIn,
              setEmail,
              setCurrentCompany,
              setCurrentRole,
              setCareerTimeline,
              setAchievement,
              setQuote,
              setStep,
              setNewAch,
            }}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default AddAlumni;
