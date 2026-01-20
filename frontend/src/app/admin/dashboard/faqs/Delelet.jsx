
"use client"

import {useRouter} from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { MdAdd, MdClose } from 'react-icons/md';


const Delelet = ({data, delPath, img, tokeN}) => {
      const router = useRouter()
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
    const [isloading, setisloading] = useState(false)

// image preview 



  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [editPopupOpened, seteditPopupOpened] = useState(false);


  // Handle delete confirmation
  const handleDelete = (index) => {
    setConfirmDeleteIndex(index);
  };
  const handleEdit = (index) => {
    seteditPopupOpened(true);
  };

  // Confirm deletion
const confirmDelete = () => {
    setConfirmDeleteIndex(null);
    handleImageDelete(delPath)
};


const handleImageDelete = async (delPath) => {

  try {
    setisloading(true);
    const response = await fetch(`${BASE_API}/contents/faqs/${delPath}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokeN}`,
        "Content-Type": "application/json",
      }, 
    });

    
    const result = await response.json();
console.log(result)
    if (response.ok) {
      setisloading(false);
     toast.success(" Deleted successfully");
     router.refresh()
    } else {
      toast.error("Failed to delete ");
    }
  } catch (error) {
    setisloading(false);
    toast.error("Connection error. Check console for details.");
  }
};



  // Cancel deletion
  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };









  return (
    <div>
          {
            editPopupOpened && (
                <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4'>
                            <div className='bg-[#1e293b] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
                                <div className='flex justify-between items-center p-6 border-b border-white/5'>
                                    <h2 className='text-xl font-bold flex items-center gap-2'><MdAdd className='text-blue-500'/> Add New FAQ</h2>
                                    <button onClick={() => seteditPopupOpened(null)} className='p-2 hover:bg-white/10 rounded-full transition-colors'><MdClose size={24}/></button>
                                </div>
                                <form className='p-6 space-y-5'>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-400 mb-2">Question</label>
                                        <textarea 
                                            // value={question}
                                            // onChange={(e) => setquestion(e.target.value)}
                                            placeholder="e.g., What is your return policy?"
                                            className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-400 mb-2">Description / Answer</label>
                                        <textarea
                                            // value={answer}
                                            // onChange={(e) => setanswer(e.target.value)}
                                            placeholder="Provide a detailed answer..."
                                            className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[150px]"
                                        />
                                    </div>
                                    <div className='flex gap-3 pt-4'>
                                        <button 
                                        // onClick={addFaq}
                                         className='flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20'>Add FAQ</button>
                                        <button type="button"
                                         onClick={() => seteditPopupOpened(null)} 
                                         className='flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all'>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
            )
          }
    <div className='absolute top-2 right-2'>
        <div className='flex flex-col gap-4 '>
           <button
        onClick={() => handleDelete()}   // <-- save index to state
        className=" cursor-pointer top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
      >
        <FaTrash />
      </button>
           <button
        onClick={() => handleEdit()}   // <-- save index to state
        className=" cursor-pointer top-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
      >
        <FaEdit />
      </button>
</div>
      
    {/* ✅ Popup moved OUTSIDE map */}
{confirmDeleteIndex !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Delete ? </h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete this? </p>
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
    </div></div>
  )
}

export default Delelet