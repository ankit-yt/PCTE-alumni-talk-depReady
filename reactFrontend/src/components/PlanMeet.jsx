import React, { useRef, useState } from "react";
import Header from "./common/Header";
import FormCard from "./plan meet components/Form";
import loading from "../../public/loader.json";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./common/Search";
import DeleteModel from "./common/DeleteModel";
import { deleteMeet, updateMeet, updateMeetMedia } from "../api/meet.api";
import { useOutletContext } from "react-router-dom";
import { setMeetLoading } from "../redux/slices/loadingSlice";
import { toast, Toaster } from "sonner";

function PlanMeet() {
  const dispatch = useDispatch();

  const { reFetch, setReFetch } = useOutletContext();
  const allMeets = useSelector((state) => state.meet);
  console.log(allMeets)
  const { meetLoading } = useSelector((state) => state.loading);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdding, setIsAdding] = useState(true);
  const [triggerReset, setTriggerReset] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [clickedMeet, setClickedMeet] = useState(-1);
  const [isAction, setIsAction] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  //form component states
  const [isSeaching, setIsSeaching] = useState(false);
  const [query, setQuery] = useState("");
  const [Step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [newClass, setNewClass] = useState("");
  const [classJoined, setClassJoined] = useState([]);
  const [organizedBy, setOrganizedBy] = useState("");
  const [location, setLocation] = useState("");
  const [alumniId, setAlumniId] = useState("");
  const [alumniName, setAlumniName] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [deletingMeetId, setDeletingMeetId] = useState("");
  const [meetId, setMeetId] = useState("");

  const [isImagesSelected, setIsImagesSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);

  //seach components states
  const [search, setSearch] = useState("");

  //checking is video and photos already uploaded in meet
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [isImagesUploaded, setIsImagesUploaded] = useState(false);

  //gallery component states
  const [imageIds, setImageIds] = useState([]);

  //gallery component states for mobile view
  const [isMediaUploadModelOpen, setIsMediaUploadModelOpen] = useState(false);
  const [mobileViewVideo, setMobileViewVideo] = useState(null);
  const [mobileViewImages, setMobileViewImages] = useState([]);
  const [filesSelected, setFilesSelected] = useState(false);

  const handleDeleteMeet = async (id) => {
    try {
      await deleteMeet(id);
      setReFetch(!reFetch);
      toast.success("Meet Deleted Successfully");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("time", date);
    formData.append("classJoined", JSON.stringify(classJoined));
    formData.append("organizedBy", organizedBy);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("meetId", meetId);
    if (images.length > 0) {
      images.forEach((img) => {
        formData.append("images", img);
      });
    }
    if (video) {
      formData.append("video", video);
    }
    dispatch(setMeetLoading(true));
    try {
      await updateMeet(formData, meetId);
      setTriggerReset(!triggerReset)
      setReFetch(!reFetch);
      toast.success("Meet Updated Successfully");
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

  const handleMediaUpdate = async (e, toggle) => {
    const formData = new FormData();
    const input = e.target;

    if (!toggle) {
      const videoFile = e.target.files[0];
      if (!videoFile) {
        console.log("No video selected");
        return;
      }
      formData.append("video", videoFile);
    } else {
      const imageFiles = Array.from(e.target.files);
      if (imageFiles.length === 0) {
        toast.error("No images selected");
        return;
      }
      imageFiles.forEach((img) => formData.append("images", img));
    }

    formData.append("meetId", meetId);
    dispatch(setMeetLoading(true));
    try {
       await updateMeetMedia(formData, meetId);
      toast.success("Meet Updated Successfully");
      setReFetch(!reFetch);
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      dispatch(setMeetLoading(false));

      //  Reset file input so selecting the same file again will re-trigger onChange
      input.value = "";
    }
  };

  const handleMobileMediaChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const firstFile = files[0];

    if (firstFile.type.startsWith("image/")) {
      setMobileViewImages(files);
      setIsImagesSelected(true);
      setIsVideoSelected(false);
    } else if (firstFile.type.startsWith("video/")) {
      setMobileViewVideo(firstFile);
      setIsVideoSelected(true);
      setIsImagesSelected(false);
    }
  };

  const handleMobileViewMediaSubmit = async () => {
    const formData = new FormData();
    if (mobileViewVideo) {
      formData.append("video", mobileViewVideo);
    }
    if (mobileViewImages.length > 0) {
      mobileViewImages.forEach((element) => {
        formData.append("images", element);
      });
    }
    formData.append("meetId", meetId);
    dispatch(setMeetLoading(true));
    try {
      const response = await updateMeetMedia(formData, meetId);
      console.log(response);
      setReFetch((prev) => !prev);
      toast.success("Meet Updated Successfully");
      setReFetch(!reFetch);
      setIsMediaUploadModelOpen(false);
      setIsVideoSelected(false);
      setIsImagesSelected(false);
      setMobileViewImages([]);
      setMobileViewVideo(null);
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      dispatch(setMeetLoading(false));
    }
  };

  const handleImageChange = (e) => {
    setIsImagesSelected(true);
    const files = Array.from(e.target.files);
    setImages(files);
    console.log(e.target.files);
  };

  const handleVideoChange = (e) => {
    setIsVideoSelected(true);
    setVideo(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const mediaInputFields = [
    {
      label: "Images",
      type: "file",
      value: images,
      change: handleImageChange,
      accept: "image/*",
      multiple: true,
      required: false,
    },
    {
      label: "Video",
      type: "file",
      value: video,
      change: handleVideoChange,
      accept: "video/*",
      required: false,
    },
  ];

  return (
    <div className="flex relative flex-col h-full w-full p-6 gap-6">
      <Toaster richColors position="top-right"/>
      {showDeleteConfirm && (
        <DeleteModel
          handler={{ handleDelete: handleDeleteMeet }}
          values={{ id: deletingMeetId }}
          setters={{ setShowDeleteConfirm }}
        />
      )}
      {meetLoading && (
        <div className="w-full bg-white/10 z-99 backdrop-blur-sm h-full absolute top-0 left-0 flex justify-center items-center">
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            className="w-20 "
          />
        </div>
      )}
      <div className="md:px-10 h-full no-scrollbar overflow-auto ">
        <Header
          value={{
            isEditing,
            section: "planMeet",
            errorMessage,
            triggerReset,
            title1: "Schedule Talk",
            description1:
              "Provide the required details below to create and schedule a new alumni meet.",
            title2: "Update Talk Details",
            description2:
              "Modify the information below to update the scheduled alumni meet in the database.",
          }}
          setters={{
            setErrorMessage,
            setIsAdding,
            setTriggerReset,
            setIsSeaching,
          }}
        />
        <FormCard
          values={{
            isEditing,
            Step,
            title,
            date,
            errorMessage,
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
            isImagesUploaded,
            isVideoUploaded,
            mediaInputFields,
            reFetch,
          }}
          setters={{
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
            handleUpdate,
            setReFetch,
            setErrorMessage,
          }}
          setTriggerReset={setTriggerReset}
          triggerReset={triggerReset}
        />
        {!isAdding && (
          <Search
            values={{
              isGalleryOpen,
              search,
              isAdding,
              list: allMeets,
              section: "planMeet",
              clickedItem: clickedMeet,
              isAction,
              Step,
              showDeleteConfirm,
              mediaInputFields,
              imageIds,
              mobileViewImages,
              mobileViewVideo,
              isVideoSelected,
              isImagesSelected,
              isMediaUploadModelOpen,
              meetId,
              allMeets,
            }}
            setters={{
              setSearch,
              setAlumniId,
              setTitle,
              setClassJoined,
              setOrganizedBy,
              setLocation,
              setDate,
              setAlumni: setAlumniId,
              setUpdatingMeetId: setMeetId,
              setDescription,
              setImages,
              setPreviewURL,
              setIsAdding,
              setIsGalleryOpen,
              setClickedItem: setClickedMeet,
              setIsAction,
              setIsEditing,
              setShowDeleteConfirm,
              setDeletingMeetId,
              setAlumniName,
              setMeetId,
              setIsVideoUploaded,
              setIsImagesUploaded,
              setStep,
              setImageIds,
              handleMediaUpdate,
              handleMobileMediaChange,
              setIsMediaUploadModelOpen,
              setMobileViewImages,
              setMobileViewVideo,
              setIsVideoSelected,
              setIsImagesSelected,
              handleMobileViewMediaSubmit,
              setVideo,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PlanMeet;
