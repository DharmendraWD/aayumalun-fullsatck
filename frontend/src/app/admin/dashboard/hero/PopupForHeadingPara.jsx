"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaEdit } from 'react-icons/fa'
import { MdAdd, MdClose } from 'react-icons/md'

import { useRouter } from 'next/navigation'

const PopupForHeadingPara = ({ ParaAndTitleOfCards, tokeN }) => {
    const [isPopupOpend, setisPopupOpend] = useState(false)
    const [isloading, setisloading] = useState(false);
const router = useRouter()

    const [payload, setpayload] = useState({
        a: ParaAndTitleOfCards.data.a,
        b: ParaAndTitleOfCards.data.b,
        c: ParaAndTitleOfCards.data.c,
        d: ParaAndTitleOfCards.data.d,
        e: ParaAndTitleOfCards.data.e,
        f: ParaAndTitleOfCards.data.f,
        g: ParaAndTitleOfCards.data.g,
        h: ParaAndTitleOfCards.data.h,
        i: ParaAndTitleOfCards.data.i,
        j: ParaAndTitleOfCards.data.j,
        k: ParaAndTitleOfCards.data.k,
        l: ParaAndTitleOfCards.data.l,
        m: ParaAndTitleOfCards.data.m,
        n: ParaAndTitleOfCards.data.n,
        o: ParaAndTitleOfCards.data.o,
        p: ParaAndTitleOfCards.data.p,
        q: ParaAndTitleOfCards.data.q,
        r: ParaAndTitleOfCards.data.r,
        s: ParaAndTitleOfCards.data.s,
        t: ParaAndTitleOfCards.data.t,
        u: ParaAndTitleOfCards.data.u,
        v: ParaAndTitleOfCards.data.v,
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(payload)
        try {
            setisloading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contents/paraHeadingOfCards`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${tokeN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success(" section updated!");
                router.refresh();
                setisPopupOpend(false);
            } else {
                toast.error(result?.message || "Update failed");
            }
        } catch (error) {
            toast.error("Connection error", error);
        } finally {
            setisloading(false);
        }
    };




    return (
        <div>

            <div className="flex mt-4 flex-col md:flex-row items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl mb-10 backdrop-blur-md gap-4">
                <div className="flex items-center gap-4">


                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white"> <span className="text-indigo-500">{ParaAndTitleOfCards?.data?.a}</span></h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{ParaAndTitleOfCards?.data?.b|| ""}</p>
                    </div>
                </div>
                <div  className="p-3 bg-indigo-600/20 rounded-2xl">
                    <FaEdit onClick={() => setisPopupOpend(true)} className="text-indigo-400 cursor-pointer text-l animate-spin-slow" />
                </div>
            </div>

{
    isPopupOpend && (

            <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4'>
                <div className='bg-[#1e293b] w-full max-w-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b border-white/5'>
                        <h2 className='text-xl font-bold flex items-center gap-2'><MdAdd className='text-blue-500' /> Update Middle Hero Section Para and Heading</h2>
                        <button onClick={() => setisPopupOpend(false)} className='p-2 hover:bg-white/10 rounded-full transition-colors'><MdClose size={24} /></button>
                    </div>
                    <form className='p-6 space-y-5'>
                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Heading Of Middle Hero Section</label>
                            <textarea
                                value={payload.a}
                                onChange={(e) =>
                                    setpayload(prev => ({
                                        ...prev,
                                        a: e.target.value,
                                    }))
                                }
                                placeholder="e.g., What is your return policy?"
                                className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-400 mb-2">Paragraph Of Middle Hero Section</label>
                            <textarea
                                value={payload.b}
                                onChange={(e) =>
                                    setpayload(prev => ({
                                        ...prev,
                                        b: e.target.value,
                                    }))
                                }
                                placeholder="Provide a detailed ans..."
                                className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[150px]"
                            />
                        </div>
                        <div className='flex gap-3 pt-4'>
                            <button
                                onClick={handleSubmit}
                                className='flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20'>Update </button>
                            <button type="button" onClick={() => setisPopupOpend(false)} className='flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
        </div>
    )
}

export default PopupForHeadingPara