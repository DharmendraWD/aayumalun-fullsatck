"use client";
import {useRouter} from 'next/navigation'

import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegCircleQuestion } from 'react-icons/fa6';

export default function PopupModal({tokeN}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  let gallaryData = [];

    const [images, setImages] = useState(
      gallaryData?.map((imgPath) => ({ preview: `${BASE_CONTENT}/uploads/clients/${imgPath.image}` })) || []
    );

  const [isImage, setisImageOrNot] = useState(false);
  const [payload, setpayload] = useState(
    {
        fullName: "",
        mobNo: "",
        email: "",
        password: "",
        cPassword: "",
        isAdmin: false,
        image: "",
    }
  )
  const router = useRouter()
  
  
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
  
  
const [showHelp, setShowHelp] = useState(false);
    

  // Handle file selection
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setImages((prev) => [...prev, ...newImages]);

  // Set image once here
  if (files[0]) {
    setpayload(prev => ({ ...prev, image: files[0] }));
  }

  setisImageOrNot(true);
};




// ------to post on click submit 
const handleSubmit = async (e) => {
  e.preventDefault();

  if(payload.password !== payload.cPassword){
    toast.error("Password and Confirm Password should be same");
    return;
  }

  if (!payload.image) {
    toast.error("Please upload an image");
    return;
  }

  try {
    setisloading(true);
    
    const formData = new FormData();
    formData.append("fullName", payload.fullName);
    formData.append("email", payload.email);
    formData.append("isAdmin", payload.isAdmin ? 1 : 0);
    formData.append("mobNo", payload.mobNo); 
    formData.append("password", payload.password); 
    formData.append("image", payload.image); 
    
    console.log(formData.isAdmin, "insi")

    const response = await fetch(`${BASE_API}/create/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokeN}`, 
      },
      body: formData,
    });

    const result = await response.json();
    console.log(result)

    if (!response.ok) {
        toast.error(result.message);
    }

   if(result.success){
    toast.success("Hero Card added successfully!");
    setIsOpen(false);
    router.refresh();
    setImages([])
    setpayload({fullName: "", mobNo: "", email: "", password: "", cPassword: "", isAdmin: false, image: ""})
    setisImageOrNot(false);
   }

  } catch (error) {
    toast.error(error.message);;
  } finally {
    setisloading(false);
  }
};

// ...


console.log(payload.isAdmin)
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
Add 
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
              Add Admin
            </h2>




           {/* images  */}
           <div>
  <div className="p-4">




<div className=''>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
                {/* Input */}
                <div className="mb-6 mx-4">
                  <label className="block popupTextClr text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={payload.fullName  || ""}
                     onChange={(e) =>
    setpayload(prev => ({ ...prev, fullName: e.target.value }))
  }
                    placeholder="Write here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div className="mb-6 mx-4">
                  <label className="block popupTextClr text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={payload.email || ""}
                      onChange={(e) =>
    setpayload(prev => ({ ...prev, email: e.target.value }))
  }
                    placeholder="Write here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>       
                              <div className="mb-6 mx-4">
                  <label className="block popupTextClr text-sm font-medium mb-2">
                   Mob Number
                  </label>
                  <input
                    type="text"
                    value={payload.mobNo || ""}
                     onChange={(e) =>
    setpayload(prev => ({ ...prev, mobNo: e.target.value }))
  }
                    placeholder="Write here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

    <div className="relative z-20 mb-6 flex justify-center gap-4 items-center mx-4">
      
      {/* --- START: POPUP DIV --- */}
      <div 
        className={`
          absolute bottom-full mb-2 w-[200px] bg-white rounded-lg shadow-2xl border border-gray-200 p-3
          transition-all duration-300 ease-in-out transform origin-bottom
          ${showHelp ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Header + Close Button */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-2 mb-2">
          <h3 className="text-sm font-bold text-gray-800">Super Admin Access</h3>
          <button 
            onClick={() => setShowHelp(false)} 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaTimes size={12} />
          </button>
        </div>

        {/* Paragraph Content */}
        <p className="text-xs text-gray-600 leading-relaxed">
         Super Admin can manage other users. Standard admins can only manage content <span className='font-semibold'> (add, edit, or delete).</span>
        </p>

        {/* Optional: Little Arrow pointing down */}
        <div className="absolute -bottom-1.5 right-[18px] w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45"></div>
      </div>
      {/* --- END: POPUP DIV --- */}


      {/* YOUR EXISTING CHECKBOX CODE */}
      <label
        className="relative text-[white] flex cursor-pointer items-center justify-center gap-[1em]"
        htmlFor="tick"
      >
        <input className="peer appearance-none" id="tick" name="tick" type="checkbox" 
         value={payload.isAdmin || ""}
                    onChange={(e) =>
    setpayload(prev => ({ ...prev, isAdmin: e.target.checked }))
  }
        />
        <span
          className="absolute left-0 top-1/2 h-[1.5em] w-[1.5em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[2px] border-[white]"
        >
        </span>
        <svg
          viewBox="0 0 69 89"
          className="absolute left-0 top-1/2 h-[1.5em] w-[1.5em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
          fill="none"
          height="89"
          width="69"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1"
            strokeWidth="6px"
            stroke="pink"
            pathLength="100"
          ></path>
        </svg>

        <p className="text-[1em] font-bold [user-select:none]">Is Super Admin</p>
      </label>

      {/* The Trigger Icon */}
      <button 
        type="button" // Important to prevent form submission
        onClick={() => setShowHelp(!showHelp)}
        className="text-white hover:text-pink-300 transition-colors"
      >
        <FaRegCircleQuestion size={18} />
      </button>

    </div>
                              <div className="mb-6 mx-4">
                  <label className="block popupTextClr text-sm font-medium mb-2">
                   Password
                  </label>
                  <input
                    type="password"
                    value={payload.password || ""}
                     onChange={(e) =>
    setpayload(prev => ({ ...prev, password: e.target.value }))
  }
                    placeholder="Write here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                              <div className="mb-6 mx-4">
                  <label className="block popupTextClr text-sm font-medium mb-2">
                   Confirm Password
                  </label>
                  <input
                    type="password"
                    value={payload.cPassword || ""}
                     onChange={(e) =>
    setpayload(prev => ({ ...prev, cPassword: e.target.value }))
  }
                    placeholder="Write here..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
                   
</div>

{
  !isImage ? (
      <input
        type="file"  
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 mx-4 block w-full text-sm text-slate-500
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
      <div className="grid-container mx-4">
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
                {isloading ? 'Adding...' : 'Add '}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
