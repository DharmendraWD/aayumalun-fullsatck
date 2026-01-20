"use client";
import {useRouter} from 'next/navigation'

import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import { FaTrash } from "react-icons/fa";

export default function PopupModal({gallaryData}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setisloading] = useState(false);

  const [message, setMessage] = useState("");
  const [hideMessageInterval, setHideMessageInterval] = useState(true);
  const [isImage, setisImageOrNot] = useState(false);
  
  const router = useRouter()
  
  
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
  let noImageDummy =  []
  
  // image preview 
  // const [images, setImages] = useState([HeroData?.hero[0]?.images]);
  const [images, setImages] = useState(
      noImageDummy?.map((imgPath) => ({ preview: `${BASE_CONTENT}/uploads/clients/${imgPath.image}` })) || []
    );
    

  // Handle file selection
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  // Append new images to existing images
  setImages((prev) => [...prev, ...newImages]);
  setisImageOrNot(true);
};



// ------to post on click submit 
const handleSubmit = async (e) => {
if(!isImage){
  toast.error("Please upload an image");
  return
}
setisImageOrNot(false)
    e.preventDefault();
    const formData = new FormData();

 
    images.forEach((image) => {
      // ONLY append the file object if it's a new file (has 'file' property)
      // Existing images loaded from HeroData only have 'preview'
      if (image.file) {
          // The field name 'images' must match the array name in your backend Multer setup.
          formData.append("image", image.file); 
        }
    });
    // -------------------------------------------------------------------
// console.log(images)
    // ... rest of the fetch logic ...
    try {
      // ... (fetch code remains the same)
      setisloading(true);
      const response = await fetch(`${BASE_API}/contents/upload/clients`, {
        method: "POST",
        body: formData,
      });
      // ...
      
      // I also recommend checking the backend response for a clearer error message:
      const result = await response.json(); 

      if (response.ok && result.success) {
        setisloading(false);
        setMessage(`Success: ${result.message}`);
        toast.success(result.message);
        setIsOpen(false);
        router.refresh()
        setImages([]);
        // Optionally update the images state with the new paths from the successful response
      } else {
        toast.error(result.message || "Failed to submit form");
        setisloading(false);
        setMessage(`Error: ${result.message || "Failed to submit form"}`);
        console.error("API Error:", result);
      }
    } catch (error) {
        toast.error("Connection error. Check console for details.");
      setisloading(false);
      setMessage("Connection error. Check console for details.");
      console.error("Error submitting form:", error);
    }
  }
// ...



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
Add Image
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
              Update Client Image
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


           {/* images  */}
           <div>
  <div className="p-4">


{
  !isImage ? (
      <input
        type="file"  
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-300 cursor-pointer"
      />
     
  ) : (
    <h1 className="text-xl text-center mb-2 text-red-500"></h1>
  )
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

    </div>
  ))}
</div>





  
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
                {isloading ? 'Adding...' : 'Add Images'}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
