


import { FaGithub, FaTwitter, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'; 
import adminimg from "../../../../public/img/admin.svg"
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

import aayumLogo  from "../../../../public/whitelogoFinal.png"

import Link from 'next/link'; 
import { FaHome, FaUsers, FaCog, FaChartLine, FaLayerGroup, FaQuestion, FaInfo, FaBullhorn, FaMap, FaImages, FaBuilding, FaNewspaper } from 'react-icons/fa';
import { IoIosArrowDown, IoMdSettings, IoMdCreate, IoMdImages, IoMdLink } from 'react-icons/io';
import noimg from "../../../../public/noimg.jpg"
import Image from 'next/image';


import {  FaPhoneAlt, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';






export default async function DashboardPage() {

 const cookieStore = await cookies(); 
  const tokeN = cookieStore.get('tokeN')?.value; 

    const BASE_CONTENT = process.env.BASE_CONTENT_URL || 'http://localhost:4000';



  const BASE_API = process.env.BASE_API;

  let loggedInUserData = [];
  let error = null;


//   try {
//     const response = await fetch(`${BASE_API}/me`, {
//       headers: {
//         Authorization: `Bearer ${tokeN}`,
//       },
//     });

//  if (!response.ok) {
//          toast.error("Token not found. Please login again.");
//      return null;
//     } else {
//       loggedInUserData = await response.json();
//     }

//   } catch (error) {
//     //  shouldRedirect = true;
//     console.error("Error fetching data:", error);
//   }

// const userData = loggedInUserData?.data?.[0];
const userData = loggedInUserData;

  return(

    <div>
    <div className="min-h-screen  mt-[40px]  text-gray-100 flex flex-col items-center p-4 sm:p-8">
      <div className=" w-full ">
        {/* Title and Emoji */}
        <h1 className="text-4xl capitalize sm:text-2xl font-extrabold mb-4 text-white">
          Welcome to Dashboard <span className='text-[pink]'>{userData?.name}</span>
        </h1>

        
        <p className="text-basetext-start sm:text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl">
        Quick summary of all editable sections and content statistics. Edit the content and stats to reflect your project's progress.
        </p>

        
      

<div className='flex flex-col lg:flex-row just justify-start items-center gap-8'>

<div className="w-full max-w-sm overflow-hidden transition-all duration-300 bg-[#1e293b]/50 backdrop-blur-xl border border-gray-700 hover:border-blue-500/50 rounded-2xl shadow-2xl group">
      {/* Top Accent Pattern */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="p-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-5">
          {/* Profile Image Section */}
          <div className="relative group/avatar">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-gray-700 group-hover/avatar:ring-blue-500 transition-all duration-500 bg-[#152035] flex items-center justify-center">
            
              <Image 
              priority
              unoptimized
  src={userData?.image 
    ? `${BASE_CONTENT}/uploads/user/${userData.image}` 
    : noimg.src
  }
  width={200}
  height={200}
  alt={userData?.fullName || "User Profile"}
                className="h-full w-full object-cover transform transition-transform group-hover/avatar:scale-110"

/>
            </div>
            {/* Status Indicator */}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-[#1e293b] rounded-full shadow-sm"></span>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className='flex gap-2 items-center'>
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                {userData?.fullName || "Guest User"}
              </h2>
           <div className='flex gap-2 items-center'>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-1">
                Verified Account
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-white-400 border border-blue-500/20 mt-1">
               {userData?.isAdmin ? "Super Admin" : "Admin"}
              </span>
           </div>
            </div>

        
            </div>
          

            <div className="space-y-2">
              {/* Email Link */}
              <Link 
                href={BASE_CONTENT || "#"} 
                className="group/link flex items-center justify-center sm:justify-start text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                <FaEnvelope className="mr-2 text-xs opacity-70" />
                <span className="truncate max-w-[180px]">{userData?.email}</span>
                <FaExternalLinkAlt className="ml-2 text-[10px] opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </Link>

              {/* Mobile Info */}
              <div className="flex items-center justify-center sm:justify-start text-gray-400 text-sm">
                <FaPhoneAlt className="mr-2 text-xs opacity-70" />
                <span>{userData?.mobNo || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action (Optional) */}
        {/* <div className="mt-6 pt-5 border-t border-gray-700/50">
          <Link
            href="/admin/profile"
            className="w-full flex items-center justify-center py-2 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold transition-all active:scale-95"
          >
            Manage Profile
          </Link>
        </div> */}
      </div>
    </div>

        {/* ------------- */}
        <div
  id="toast-notification"
  className="w-full max-w-xs p-4 text-gray-900 bg-[#152035] rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
  role="alert"
>

  <div className="flex items-center">
    <div className="relative inline-block shrink-0">
      <div
        className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center text-white font-bold text-xl"
      >
        <Image src={aayumLogo} width={200} height={200} alt="" className='h-full w-full'/>
      </div>
 
    </div>
    <div className="ms-3 text-sm font-normal">
      <div className="text-sm font-semibold text-gray-400 dark:text-white">
       Visit Aayusoft Tech
      </div>
      <Link href={BASE_CONTENT} className="text-sm font-normal flex items-center text-blue-300 dark:text-gray-400">Aayusoft Tech  
            <FaExternalLinkAlt className="ml-2 text-xs" />
      
      </Link>
  
    </div>
  </div>
</div>

{/* 22222222 */}
        
   
     </div>   


        <div className="mt-[100px]"> 
          <img
            src={adminimg.src}
            alt="Developer working illustration"
            className=" w-full max-w-xl h-auto"
          />
        </div>
      </div>
    </div>


    </div>
  )
}