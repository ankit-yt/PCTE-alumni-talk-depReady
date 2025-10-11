import React, { useEffect } from 'react'
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";

import { MdOutlineDeleteOutline } from 'react-icons/md';


function MediaInputs({mediaInputFields , setters , values}) {
    const {isImagesSelected , isVideoSelected , isVideoUploaded , isImagesUploaded , videoRef , imageRef} = values
    const {setIsImagesSelected , setIsVideoSelected} = setters
   useEffect(()=>{
     console.log('is images uploaded' , isImagesUploaded)
    console.log('is video uploaded', isVideoUploaded)
   },[isImagesUploaded , isVideoUploaded])
  return (
   <div className="space-y-6">
       {mediaInputFields.map((field, index) => (
         <div key={index} className={`w-full ${(field.label === "Images" && isImagesUploaded) ? "hidden" : ''} ${(field.label === 'Video' && isVideoUploaded ) ? 'hidden' : ''}`} ref={field.label === 'video' ? videoRef : imageRef}>
          
           <div className='flex gap-4 items-center mb-2 '>
            <label
             htmlFor={field.label}
             className="block text-sm font-semibold text-gray-700 "
           >
             {field.label}
           </label>
           <div onClick={field.reset} className='text-md text-red-500 '><MdOutlineDeleteOutline/></div>
           </div>
           <div
  className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition cursor-pointer
    ${field.label === "Images" && isImagesSelected
      ? "border-green-400 bg-green-50"
      : field.label === "Video" && isVideoSelected
      ? "border-green-400 bg-green-50"
      : "border-red-300 bg-red-50 hover:bg-red-100"}`}
  
  onClick={() => document.getElementById(field.label).click()}
  onDragOver={(e) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-red-100", "border-red-500");
  }}
  onDragLeave={(e) => {
    e.currentTarget.classList.remove("bg-red-100", "border-red-500");
  }}
  onDrop={(e) => {
    e.preventDefault();
    
    e.currentTarget.classList.remove("bg-red-100", "border-red-500");
    const files = e.dataTransfer.files;

    if (field.multiple) {
      field.change({ target: { files } });
      setIsImagesSelected(true);
      console.log("chala")
    } else {
      field.change({ target: { files: [files[0]] } });
      setIsVideoSelected(true);
    }
  }}
>
  <div className={`text-center `}>
    {(field.label === "Images" && isImagesSelected) ||
    (field.label === "Video" && isVideoSelected) ? (
      <>
        <IoCheckmark className='mx-auto text-4xl  text-green-600' />
        <p className="mt-2 text-sm font-semibold text-green-600">
          {field.label} uploaded successfully!
        </p>
        <p className="text-xs text-gray-400">
          Click or drag & drop to Upload Again!
        </p>
      </>
    ) : (
      <>
        {field.label === "Images" ? (
          <CiImageOn className="mx-auto text-4xl text-red-500" />
        ) : (
          <CiVideoOn className="mx-auto text-4xl text-red-500" />
        )}
        <p className="mt-2 text-sm text-gray-600">
          Click or drag & drop {field.label.toLowerCase()}
        </p>
        <p className="text-xs text-gray-400">
          {field.accept.replace("/*", "")} files only
        </p>
      </>
    )}
  </div>
</div>

   
           <input
             id={field.label}
             type="file"
             multiple={field.multiple}
             accept={field.accept}
             onChange={field.change}
             className="hidden"
           />
         </div>
       ))}
     </div>
  )
}

export default MediaInputs
