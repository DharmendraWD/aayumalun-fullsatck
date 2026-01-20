import React from 'react';
import { MdMessage, MdPerson, MdEmail, MdDescription, MdAccessTime, MdFeaturedVideo } from 'react-icons/md';
import Delelet from './Delelet';
import { cookies } from "next/headers";
import PopupModal from './Popup';
import PopupForHeadingPara from './PopupForHeadingPara';



const Page = async () => {
  
     const cookieStore = await cookies(); 
  
  const tokeN = cookieStore.get('tokeN')?.value; 
  let fetchedData = [];
      let ParaAndTitleOfCards = [];


  try {
    const res = await fetch(`${process.env.BASE_API}/contents/benefits`);
    const data = await res.json();
    fetchedData = data;
  
  } catch (error) {
    console.error("Failed to fetch client messages:", error);
    fetchedData = [];
  }


  // --------
      try {
    const resp = await fetch(`${process.env.BASE_API}/contents/paraHeadingOfCards`,);
    if (!resp.ok) throw new Error('Failed to fetch cards data');
    ParaAndTitleOfCards = await resp.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className='relative min-h-screen'>
             <div className="flex items-center p-4 gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
              <MdFeaturedVideo size={22} />
            </div>
            <h5 className="text-slate-100 font-bold tracking-tight">Benefits  Section</h5>
          </div>
          <div className='min-h-[80vh]'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full'>
  {fetchedData?.data?.length === 0 ? (
    <p className="text-slate-600 text-center mt-10 col-span-full">No Data available.</p>
  ) : (
    fetchedData?.data?.map((elem, index) => (
      <div
        key={index}
        /* 2. Changed w-96 to w-full and added md:max-w-md */
        className="group relative flex flex-col w-full md:max-w-md mx-auto p-6 
                   bg-white/10 backdrop-blur-lg border border-white/10 
                   rounded-3xl shadow-xl transition-all duration-500 
                   hover:bg-white/[0.15] hover:-translate-y-2 hover:shadow-blue-500/10 
                   overflow-hidden"
      >
        {/* Animated Background Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

      
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
              {/* <MdMessage size={22} /> */}
            </div>
            <h5 className="text-slate-100 font-bold tracking-tight">Card {index + 1}</h5>
          </div>
          {/* <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
         *   
          </span> */}
        </div>

    
        <div className="space-y-1">
          {/* Name Field */}
          <div className="flex items-start gap-4">
     
            <div>
              <p className="text-[10px] uppercase text-slate-300 font-semibold tracking-wider"> Heading</p>
              <h5 className="text-[#8c89ca] ml-2 text-sm  leading-tight">{elem.heading}</h5>
            </div>
          </div>

    

          {/* Description Section */}
          <div className="pt-4 mt-2 border-t border-white/5">
              <p className="text-[10px] uppercase text-slate-300 font-semibold tracking-wider"> Short Description</p>
     
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
         {elem.description}
            </p>
       
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        {/* <div className="mt-6 flex items-center justify-between">
           <div className="flex -space-x-2">
             <div className="w-6 h-6 rounded-full border-2 border-[#1e293b] bg-blue-500"></div>
             <div className="w-6 h-6 rounded-full border-2 border-[#1e293b] bg-slate-700"></div>
           </div>
           <button className="px-4 py-2 text-xs font-bold bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
             View Details
           </button>
        </div> */}
        <Delelet tokeN={tokeN} delPath={elem?.id}/>
      </div>
    ))
  )}

  </div>
  </div>
<div className="">
  <PopupModal tokeN={tokeN} />
</div>
<PopupForHeadingPara tokeN={tokeN} ParaAndTitleOfCards={ParaAndTitleOfCards}/>
</div>
  );
};

export default Page;
