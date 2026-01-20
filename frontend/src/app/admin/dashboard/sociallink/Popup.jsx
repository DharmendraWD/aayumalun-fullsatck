"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PopupModal({ HeroData, ParaAndTitleOfCards, tokeN }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setisloading] = useState(false);

    const [payload, setPayload] = useState({
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
        w: ParaAndTitleOfCards.data.w,
        x: ParaAndTitleOfCards.data.x,
        y: ParaAndTitleOfCards.data.y,
    })

  const router = useRouter();
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

     const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.log(result)
            if (response.ok && result.success) {
                toast.success(" section updated!");
                router.refresh();
                setIsOpen(false);
                
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
    <>
      {/* Trigger Button */}
      <div className="w-full flex justify-center md:justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
        >
          <FaEdit />
          Update
        </button>
      </div>

      {/* Modern Modal Overlay */}
      {isOpen && (
        <div className="absolute w-full top-0 z-50 inset-0 z-[100] flex items-start custom-scroll justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative custom-scroll w-full max-w-full max-h-[90vh] overflow-y-auto bg-[#1e293b] border border-white/10 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#1e293b]/80 backdrop-blur-md px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="p-2 bg-blue-600/20 rounded-lg text-blue-400"><FaEdit size={18}/></span>
                Update Social Media Link
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                

       

                {/* Buttons Config */}
                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {/* <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Primary Button</p> */}
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Instagram Url</label>
                    <input
                      type="text"
                      value={payload.r || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, r: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Facebook Url</label>
                    <input
                      type="text"
                      value={payload.s || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, s: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {/* <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Secondary Button</p> */}
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Twitter</label>
                    <input
                      type="text"
                      value={payload.t || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, t: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={payload.u || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, u: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-6">
                

       

                {/* Buttons Config */}
                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {/* <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Primary Button</p> */}
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Company Email</label>
                    <input
                      type="text"
                      value={payload.v || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, v: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Mob. Number</label>
                    <input
                      type="text"
                      value={payload.w || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, w: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  {/* <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Secondary Button</p> */}
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Company Address</label>
                    <input
                      type="text"
                      value={payload.x || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, x: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Footer above Paragraph</label>
                    <input
                      type="text"
                      value={payload.y || ""}
                      onChange={(e) => setPayload(prev => ({ ...prev, y: e.target.value }))}
                      className="w-full bg-slate-950/40 border border-white/10 rounded-lg p-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="order-2 sm:order-1 px-8 py-3 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 transition-all"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isloading}
                  className="order-1 sm:order-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isloading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Updating...
                    </span>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}