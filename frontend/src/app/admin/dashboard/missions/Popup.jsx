"use client";
import Loading from "../../loading";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import { FaTrash } from "react-icons/fa";

export default function PopupModal({missionData}) {

  const [isOpen, setIsOpen] = useState(false);

  // upper heading
  const [upperHeading, setUpperHeading] = useState(missionData?.mission[0]?.upper?.title ?? " ");
  const [UperDesc, setUpperDesc] = useState(missionData?.mission[0]?.upper?.desc ?? " ");

  //mission 1
  const [mission1Title, setMission1Title] = useState(missionData?.mission[0]?.box1?.title ?? " ");
  const [mission1Desc, setMission1Desc] = useState(missionData?.mission[0]?.box1?.desc ?? " ");
  // mission 2
  const [mission2Title, setMission2Title] = useState(missionData?.mission[0]?.box2?.title ?? " ");
  const [mission2Desc, setMission2Desc] = useState(missionData?.mission[0]?.box2?.desc ?? " ");
  // mission 3
  const [mission3Title, setMission3Title] = useState(missionData?.mission[0]?.box3?.title ?? " ");
  const [mission3Desc, setMission3Desc] = useState(missionData?.mission[0]?.box3?.desc ?? " ");



  const [isloading, setisloading] = useState(false);
  const [message, setMessage] = useState("");

  
  
  const [hideMessageInterval, setHideMessageInterval] = useState(true);
  
  
  
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT;
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
  
  
  
  // image preview 
  // const [images, setImages] = useState([missionData?.mission[0]?.images]);
  const [images, setImages] = useState(
    missionData?.mission[0]?.images?.map((imgPath) => ({ preview: `${BASE_CONTENT}${imgPath}` })) || []
  );

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  // Handle file selection
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  // Append new images to existing images
  setImages((prev) => [...prev, ...newImages]);
};

  // Handle delete confirmation
  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  // Confirm deletion
const confirmDelete = (imageToBeDeleted) => {
  const imgObj = images[confirmDeleteIndex];

  // 1️⃣ Remove from React state
  setImages(prev => prev.filter((_, i) => i !== confirmDeleteIndex));
  setConfirmDeleteIndex(null);

  // 2️⃣ If image has NO file → it's from server → call DELETE API
  if (!imgObj.file) {
    // Extract /uploads/... path
    const match = imgObj.preview.match(/uploads\/.+$/);
    if (match) {
      const delPath = match[0];
      handleImageDelete(delPath);
    } else {
      console.warn("Image is not from server, skipping delete API.");
    }
  }
};


  // Cancel deletion
  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };



// ------to post on click submit 
const handleSubmit = async (e) => {
    e.preventDefault();

const formData = new FormData();

// headingDesc
formData.append("upper.title", upperHeading);
formData.append("upper.desc", UperDesc);

// mission 1
formData.append("box1.title", mission1Title);
formData.append("box1.desc", mission1Desc);


// mission 2
formData.append("box2.title", mission2Title);
formData.append("box2.desc", mission2Desc);

// mission 3
formData.append("box3.title", mission3Title);
formData.append("box3.desc", mission3Desc);



    // -------------------------------------------------------------------
    // FIX HERE: Use the same field name 'images' for every file.
    // -------------------------------------------------------------------
    images.forEach((image) => {
      // ONLY append the file object if it's a new file (has 'file' property)
      // Existing images loaded from missionData only have 'preview'
      if (image.file) { 
        // The field name 'images' must match the array name in your backend Multer setup.
        formData.append("images", image.file); 
      }
    });
    // -------------------------------------------------------------------

    // ... rest of the fetch logic ...
    try {
      // ... (fetch code remains the same)
      setisloading(true);
      const response = await fetch(`${BASE_API}/homepage/mission`, {
        method: "PUT",
        body: formData,
      });
      // ...
      
      // I also recommend checking the backend response for a clearer error message:
      const result = await response.json(); 

      if (response.ok) {
        setisloading(false);
        setMessage(`Success: ${result.message}`);
        setIsOpen(false);

        toast.success(" submitted successfully");
      } else {
        setisloading(false);
        setMessage(`Error: ${result.message || "Failed to submit form"}`);
        console.error("API Error:", result);
        toast.error("Failed to submit form");
      }
    } catch (error) {
      setisloading(false);
      setMessage("Connection error. Check console for details.");
      console.error("Error submitting form:", error);
      toast.error("Connection error. Check console for details.");
    }
  }
// ...


const handleImageDelete = async (delPath) => {
  try {
    const response = await fetch(`${BASE_API}/homepage/mission`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: delPath }),  
    });

    const result = await response.json();

    if (response.ok) {
      setisloading(false);
      setMessage(`Success: ${result.message}`);
             setHideMessageInterval(false);

        setTimeout(() => {
          setHideMessageInterval(true);
        }, 3000);
    } else {
      setisloading(false);
      setMessage(`Error: ${result.message || "Failed to delete image"}`);
      console.error("API Error:", result);
    }
  } catch (error) {
    setisloading(false);
    setMessage("Connection error. Check console for details.");
    console.error(error);
  }
};

  return (
    <>

<div className="w-full flex justify-center ">
          <button
      onClick={() => setIsOpen(true)}
  className="inline-flex items-center justify-center px-4 py-2 cursor-pointer bg-blue-600 ease-in-out delay-75 hover:bg-blue-700 text-white text-xl font-medium rounded-md hover:-translate-y-1 min-w-[100px] hover:scale-105 active:scale-100 transition-all duration-200"
>
  <svg
    className="h-5 w-5 mr-1 self-center items-center"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
    ></path>
  </svg>
  Edit
</button>
</div>


      {/* Overlay (Blurred Background) */}
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)} // closes when clicking outside
        >
{/* 
          <div className="absoulte">
            <Loading></Loading>
          </div> */}
          {/* Popup Container */}
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className={`relative bg-gray-500 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out
              w-[90%] sm:w-[80%] max-w-8xl p-6
              animate-slideDown`}
          >


            {/* Heading */}
            <h2 className="text-2xl ml-4 font-semibold text-gray-800 mb-4">
              Update mission Section
            </h2>

{
  !hideMessageInterval && (
    <>
    { message.toLowerCase().includes("successfully") ? (
  <h1 className="text-xl text-center mb-2 text-[#3dee3d]">{message}</h1>
) : (
  <h1 className="text-xl text-center mb-2 text-red-500">{message}</h1>
)}
</>
  )
}

<form action="" method="PUT">
           <div className="grid grid-cols-1 ">
             {/* Input */}
       {/* 1st  */}
<div>
     <label className="text-l adminCardTextClr2 font-medium mb-2">
             Upper Tittle and Description
              </label>
<div className="flex gap-2 w-full">
     <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <input
                type="text"
                value={upperHeading}
                onChange={(e) => setUpperHeading(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Description
              </label>
              <input
                type="text"
                value={UperDesc}
                onChange={(e) => setUpperDesc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 

</div>
                </div>
                {/* 2md */}
<div>
     <label className="text-l adminCardTextClr2 font-medium mb-2">
            Mission 1
              </label>
<div className="flex gap-2 w-full">
     <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <input
                type="text"
                value={mission1Title}
                onChange={(e) => setMission1Title(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Description
              </label>
              <input
                type="text"
                value={mission1Desc}
                onChange={(e) => setMission1Desc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 

</div>
                </div>
 {/* 3nd  */}
 <div>
     <label className="text-l adminCardTextClr2 font-medium mb-2">
          Mission 2
              </label>
<div className="flex gap-2 w-full">
     <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <input
                type="text"
                value={mission2Title}
                onChange={(e) => setMission2Title(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Description
              </label>
              <input
                type="text"
                value={mission2Desc}
                onChange={(e) => setMission2Desc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 

</div>
                </div>

{/* 4rd  */}
<div>
     <label className="text-l adminCardTextClr2 font-medium mb-2">
            Mission 3
              </label>
<div className="flex gap-2 w-full">
     <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <input
                type="text"
                value={mission3Title}
                onChange={(e) => setMission3Title(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block popupTextClr text-sm font-medium mb-2">
          Description
              </label>
              <input
                type="text"
                value={mission3Desc}
                onChange={(e) => setMission3Desc(e.target.value)}
                placeholder="Type your name..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> 
            

</div>
   
                </div>


            
           </div>
</form>
           {/* images  */}
           <div>
  <div className="p-4">
      {/* File Input */}
{
  images?.length >= 1 ?   <h1 className="text-red-300 mb-2 text-xl text-center">Only 1 Images are Allowed.</h1>    : 
   <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
}

      {/* Image Preview Grid */}
      <div className="grid-container">
  {images.map((img, index) => (
    <div
      key={index}
      className="relative w-full h-52 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center"
    >
      <img
        src={img.preview}
        alt={`preview-${index}`}
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => handleDelete(index)}   // <-- save index to state
        className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
      >
        <FaTrash />
      </button>
    </div>
  ))}
</div>

{/* ✅ Popup moved OUTSIDE map */}
{confirmDeleteIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Delete Image?</h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete this image?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={() => confirmDelete(images[confirmDeleteIndex].preview)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}


  
    </div>
           </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-md cursor-pointer border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 cursor-pointer py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isloading ? 'Updateing...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
