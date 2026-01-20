import React from 'react'
import { MdDeleteForever, MdQuestionAnswer, MdAdd, MdClose, MdHelpOutline } from "react-icons/md";
import { cookies } from "next/headers";

import Popup from './Popup'
import Delelet from './Delelet';

const page = async () => {

 const cookieStore = await cookies(); 
  const tokeN = cookieStore.get('tokeN')?.value; 

  let fetchedData = [];

  try {
    const res = await fetch(`${process.env.BASE_API}/contents/faqs`);
    const data = await res.json();
    fetchedData = data;
  
  } catch (error) {
    console.error("Failed to fetch client messages:", error);
    fetchedData = [];
  }
// console.log(fetchedData)

  return (
    <div>
<Popup tokeN={tokeN}/>


   {/* FAQ List */}
            <div className="max-w-6xl mx-auto space-y-6">
                {fetchedData.data?.length === 0 ? (
                    <div className='text-center py-20 opacity-40'>
                        <MdHelpOutline size={64} className='mx-auto mb-4'/>
                        <p className='text-xl'>No FAQs found. Start by creating one!</p>
                    </div>
                ) : (
                    fetchedData.data?.map((item, index) => (
                        <div 
                            key={item?.id} 
                            className="group relative w-full bg-white/5 border border-white/10 hover:border-blue-500/50 p-6 lg:p-10 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
                        >
                            <span className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-black uppercase tracking-widest px-6 py-1.5 rounded-br-2xl rounded-tl-3xl shadow-lg">
                                Question {index + 1}
                            </span>
                            
                            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4'>
                                <div className='flex-1'>
                                    <h2 className="text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                                        {item?.ques}
                                    </h2>
                                    <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                                        {item?.ans}
                                    </p>
                                </div>
                 
                                 <Delelet delPath={item?.id} tokeN={tokeN} fetchedData={fetchedData}/>
                           
                                {/* <button 
                                    onClick={() => HandleYesNo(item.id)}
                                    className='self-end lg:self-center flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 border border-red-500/20'
                                >
                                    <MdDeleteForever size={20} />
                                    <span className='text-sm font-bold'>Delete</span>
                                </button> */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        
    </div>
  )
}

export default page