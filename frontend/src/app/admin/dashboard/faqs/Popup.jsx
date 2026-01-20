"use client"
import React, { useEffect, useState } from 'react'
import { MdDeleteForever, MdQuestionAnswer, MdAdd, MdClose, MdHelpOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation'


const Popup = ({tokeN, fetchedData}) => {
        const router = useRouter()

    const [faqToBeDeleted, setFaqToBeDeleted] = useState(null);
    const [isFaqAddPopupOpen, setisFaqAddPopupOpen] = useState(null);
    const [ques, setquestion] = useState("");
    const [ans, setanswer] = useState("");
    const [yesNo, setYesNo] = useState(null);
    const [faq, setFaq] = useState([]) 

   
    const addFaq = async (e) => {
        try {
            e.preventDefault()
            if (!ques || !ans) return toast.error("Please fill all fields");
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contents/faqs`, {
                method: "POST",
                 headers: {
        Authorization: `Bearer ${tokeN}`,
        "Content-Type": "application/json",
      }, 
                body: JSON.stringify({ ques, ans }),
            });
            if (!res.ok) throw new Error("Failed to add faq");
            const data = await res.json();
            // fetchedData.data.push(data.data)
            toast.success("FAQ added successfully");
                 router.refresh()

            setquestion(""); setanswer(""); setisFaqAddPopupOpen(null)
        } catch (error) {
            toast.error("Failed to add faq");
        }
    }

    return (
        <div className='relative bg-[#0f172a] p-4 lg:p-8 font-sans text-slate-200'>
            
            {/* Add FAQ Overlay Popup */}
            {isFaqAddPopupOpen && (
                <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4'>
                    <div className='bg-[#1e293b] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
                        <div className='flex justify-between items-center p-6 border-b border-white/5'>
                            <h2 className='text-xl font-bold flex items-center gap-2'><MdAdd className='text-blue-500'/> Add New FAQ</h2>
                            <button onClick={() => setisFaqAddPopupOpen(null)} className='p-2 hover:bg-white/10 rounded-full transition-colors'><MdClose size={24}/></button>
                        </div>
                        <form className='p-6 space-y-5'>
                            <div>
                                <label className="block text-sm font-semibold text-slate-400 mb-2">Question</label>
                                <textarea 
                                    value={ques}
                                    onChange={(e) => setquestion(e.target.value)}
                                    placeholder="e.g., What is your return policy?"
                                    className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-400 mb-2">Description / Answer</label>
                                <textarea
                                    value={ans}
                                    onChange={(e) => setanswer(e.target.value)}
                                    placeholder="Provide a detailed ans..."
                                    className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[150px]"
                                />
                            </div>
                            <div className='flex gap-3 pt-4'>
                                <button onClick={addFaq} className='flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20'>Add FAQ</button>
                                <button type="button" onClick={() => setisFaqAddPopupOpen(null)} className='flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 backdrop-blur-sm gap-4">
                <div className='flex items-center gap-3'>
                    <div className='p-3 bg-blue-600/20 rounded-xl'><MdQuestionAnswer className='text-blue-400' size={28}/></div>
                    <h1 className='text-2xl font-extrabold tracking-tight'>Manage <span className='text-blue-500'>FAQs</span></h1>
                </div>
                <button 
                    onClick={() => setisFaqAddPopupOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                >
                    <MdAdd size={20}/> Create FAQ
                </button>
            </div>



          
        </div>
    )
}

export default Popup