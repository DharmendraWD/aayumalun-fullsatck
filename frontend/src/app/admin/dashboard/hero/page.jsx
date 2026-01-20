import PopupModal from "./Popup";
import { cookies } from "next/headers";
import { FaEdit } from "react-icons/fa";
import { MdSettings, MdTitle, MdTextFields, MdLink, MdOutlineSmartButton } from "react-icons/md";
import PopupForHeadingPara from "./PopupForHeadingPara";

const hero = async () => {
  const cookieStore = await cookies();
  const tokeN = cookieStore.get('tokeN')?.value;

  const BASE_API = process.env.BASE_API;
  let HeroData = [];
  let ParaAndTitleOfCards = [];
  let error = null;

  try {
    const response = await fetch(`${BASE_API}/contents/heroSection`, { cache: 'no-store' });
    if (!response.ok) {
      error = "Failed to load Hero Content.";
      throw new Error('Failed to fetch data');
    }
    HeroData = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

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
            <div className="p-3 bg-indigo-600/20 rounded-2xl">
              <MdSettings className="text-indigo-400 text-3xl animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">Hero <span className="text-indigo-500">Section</span></h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Main Landing Content</p>
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
            { label: "Main Title (H1)", value: HeroData?.data?.h1, icon: <MdTitle /> },
            { label: "Subheading (H2)", value: HeroData?.data?.h2, icon: <MdTextFields /> },
            { label: "Description Paragraph", value: HeroData?.data?.para, icon: <MdTextFields />, span: "md:col-span-2 lg:col-span-1" },
            { label: "Primary Button", value: HeroData?.data?.btn1, icon: <MdOutlineSmartButton /> },
            { label: "Primary Link", value: HeroData?.data?.btn1Link, icon: <MdLink /> },
            { label: "Secondary Button", value: HeroData?.data?.btn2, icon: <MdOutlineSmartButton /> },
            { label: "Secondary Link", value: HeroData?.data?.btn2Link, icon: <MdLink /> },
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
             {HeroData?.data && <PopupModal HeroData={HeroData} tokeN={tokeN} />}
          </div>

<PopupForHeadingPara ParaAndTitleOfCards={ParaAndTitleOfCards} tokeN={tokeN} />
    </div>
  );
}

export default hero;