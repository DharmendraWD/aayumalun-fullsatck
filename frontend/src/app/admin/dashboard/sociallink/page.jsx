import { MdEmail, MdLink, MdPhone } from "react-icons/md";
import PopupModal from "./Popup";
import { cookies } from "next/headers";
import { IoLocationSharp } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";

const hero = async () => {
  const cookieStore = await cookies();
  const tokeN = cookieStore.get('tokeN')?.value;

  const BASE_API = process.env.BASE_API;
  let ParaAndTitleOfCards = [];
  let error = null;



  try {
    const resp = await fetch(`${BASE_API}/contents/paraHeadingOfCards`, { cache: 'no-store' });
    if (!resp.ok) throw new Error('Failed to fetch cards data');
    ParaAndTitleOfCards = await resp.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }


  return (
    <div className="min-h-screen bg-[#0f172a] p-4 lg:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 border border-white/10 p-6 rounded-3xl mb-10 backdrop-blur-md gap-4">
          <div className="flex items-center gap-4">
            {/* <div className="p-3 bg-indigo-600/20 rounded-2xl">
              <MdSettings className="text-indigo-400 text-3xl animate-spin-slow" />
            </div> */}
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">Social  <span className="text-indigo-500">Link</span> & Others</h1>
              {/* <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Dashboard</p> */}
            </div>
          </div>
      
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-8 font-bold">
            ⚠️ {error}
          </div>
        )}

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 
                 {/* Mapping content to clean Modern Cards */}
                 {[
               
                   { label: "Instagram", value: ParaAndTitleOfCards?.data?.r, icon: <MdLink /> },
                   { label: "Facebook", value: ParaAndTitleOfCards?.data?.s, icon: <MdLink /> },
                   { label: "Twitter", value: ParaAndTitleOfCards?.data?.t, icon: <MdLink /> },
                   { label: "LinkedIn", value: ParaAndTitleOfCards?.data?.u, icon: <MdLink /> },
                   { label: "Email", value: ParaAndTitleOfCards?.data?.v, icon: <MdEmail /> },
                   { label: "Mobile Number", value: ParaAndTitleOfCards?.data?.w, icon: <MdPhone /> },
                   { label: "Comapany Address", value: ParaAndTitleOfCards?.data?.x, icon: <IoLocationSharp /> },
                   { label: "Footer Above Paragraph", value: ParaAndTitleOfCards?.data?.y, icon: <CiCreditCard1 /> },
                 
                 ].map((item, index) => (
                   <div 
                     key={index} 
                     className={`group relative bg-white/5 border border-white/10 p-6 rounded-3xl transition-all duration-300 hover:bg-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-1 shadow-xl ${item.span || ""}`}
                   >
                     <div className="flex items-center gap-3 mb-4">
                       <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                         {item.icon}
                       </div>
                       <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 group-hover:text-slate-300">
                         {item.label}
                       </span>
                     </div>
                     
                     <div className="min-h-[60px] flex items-center">
                       <h5 className="text-lg font-semibold text-slate-200 leading-tight">
                         {item.value ? item.value : <span className="text-slate-600 italic font-normal">Not configured</span>}
                       </h5>
                     </div>
       
                     {/* Decorative Corner Accent */}
                     <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                   </div>
                 ))}
       
               </div>
      </div>
          <div className="w-full md:w-auto">
             {<PopupModal ParaAndTitleOfCards={ParaAndTitleOfCards} tokeN={tokeN} />}
          </div>

    </div>
  );
}

export default hero;