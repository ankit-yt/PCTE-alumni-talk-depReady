import React, { useEffect } from "react";
import Card1 from "../common/Form/FormCards/Card1";
import Card2 from "../common/Form/FormCards/Card2";
import { addMeetApi } from "../../api/meet.api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setMeetLoading } from "../../redux/slices/loadingSlice";

function Form({ triggerReset, values, setters }) {
  const {
    Step,
    title,
    date,
    classJoined,
    organizedBy,
    location,
    alumniId,
    alumniName,
    images,
    video,
    description,
    isSeaching,
    query,
    newClass,
    isImagesSelected,
    isVideoSelected,
    previewURL,
    isEditing,
    isVideoUploaded,
    isImagesUploaded,
    videoRef,
    imageRef,
    mediaInputFields,
    reFetch,
  } = values;

  const {
    setStep,
    setTitle,
    setDate,
    setClassJoined,
    setOrganizedBy,
    setLocation,
    setAlumniId,
    setAlumniName,
    setImages,
    setVideo,
    setDescription,
    setIsSeaching,
    setQuery,
    setNewClass,
    setIsImagesSelected,
    setIsVideoSelected,
    setPreviewURL,
    setIsEditing,
    handleUpdate,
    setReFetch,
    setErrorMessage,
  } = setters;

  const dispatch = useDispatch();
  const { meetLoading } = useSelector((state) => state.loading);

  const handleReset = () => {
    setStep(1);
    setTitle("");
    setDate("");
    setClassJoined("");
    setAlumniId("");
    setAlumniName("");
    setDescription("");
    setImages([]);
    setIsImagesSelected(false);
    setIsVideoSelected(false);
    setLocation("");
    setNewClass("");
    setOrganizedBy("");
    setVideo(null);
    setPreviewURL(null);
  };

  useEffect(() => {
    handleReset();
  }, [triggerReset]);

  const inputFields = [
    {
      label: "Title",
      type: "text",
      value: title,
      setter: setTitle,
      required: true,
    },
    {
      label: "Date",
      type: "datetime-local",
      value: date,
      setter: setDate,
      required: true,
    },
    {
      label: "Organized By",
      type: "text",
      value: organizedBy,
      setter: setOrganizedBy,
      required: true,
    },
    {
      label: "Location",
      type: "select",
      value: location,
      setter: setLocation,
      required: true,
      options: ["SH1", "SH2", "ET101", "ET102"],
    },
    {
      label: "Description",
      type: "textarea",
      value: description,
      setter: setDescription,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    console.log(meetLoading);
    dispatch(setMeetLoading(true));
    console.log(meetLoading);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("organizedBy", organizedBy);
    formData.append("alumni", alumniId);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("alumniId", alumniId);
    formData.append("classJoined", JSON.stringify(classJoined));
    formData.append("video", video);
    if (images && images.length > 0) {
      Array.from(images).forEach((img) => {
        formData.append("images", img);
      });
    }
    console.log(Object.fromEntries(formData.entries()));

    try {
      await addMeetApi(formData);
      dispatch(setMeetLoading(false));
      toast.success("Meet Planned Successfully");
      handleReset();
      setReFetch(!reFetch);
      setErrorMessage("")
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
      dispatch(setMeetLoading(false));
    }
  };

  return (
    <div className="w-full mt-4 gap-4 md:h-5/6 h-auto flex flex-col md:flex-row">
      <Card1
        values={{
          title: "Choose Alumni",
          inputType: "text",
          isEditing,
          isSeaching,
          query,
          previewURL,
          alumniId,
          alumniName,
        }}
        setters={{
          setIsSeaching,
          setQuery,
          setPreviewURL,
          setAlumniId,
          setAlumniName,
          setTitle,
        }}
      />
      <Card2
        values={{
          section: "planMeet",
          inputFields,
          Step,
          mediaInputFields,
          isImagesSelected,
          isVideoSelected,
          newClass,
          classJoined,
          isEditing,
          isVideoUploaded,
          isImagesUploaded,
          videoRef,
          imageRef,
        }}
        setters={{
          setStep,
          setIsImagesSelected,
          setIsVideoSelected,
          setClassJoined,
          setNewClass,
          setIsEditing,
        }}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default Form;
