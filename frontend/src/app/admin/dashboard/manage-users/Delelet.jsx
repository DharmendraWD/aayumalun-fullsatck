
"use client"

import {useRouter} from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';


const Delelet = ({data, delPath, img, tokeN}) => {
      const router = useRouter()
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
    const [isloading, setisloading] = useState(false)

// image preview 



  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);


  // Handle delete confirmation
  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };

  // Confirm deletion
const confirmDelete = () => {
    setConfirmDeleteIndex(null);
    handleImageDelete(delPath)
};


const handleImageDelete = async (delPath) => {

  try {
    const response = await fetch(`${BASE_API}/user/${delPath}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokeN}`,
        "Content-Type": "application/json",
      }, 
    });

    const result = await response.json();
    if (response.ok) {
      setisloading(false);
     toast.success("User deleted successfully");
     router.refresh()
    } else {
      console.error("API Error:", result);
      toast.error("Failed to delete User");
    }
  } catch (error) {
    setisloading(false);
    console.error(error);
    toast.error("Connection error. Check console for details.");
  }
};



  // Cancel deletion
  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };









  return (
    <div>
           <button
        onClick={() => handleDelete()}   // <-- save index to state
        className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
      >
        <FaTrash />
      </button>

      
    {/* ✅ Popup moved OUTSIDE map */}
{confirmDeleteIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Delete ? </h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete {data?.fullName}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={cancelDelete}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={() => confirmDelete(img)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Delelet