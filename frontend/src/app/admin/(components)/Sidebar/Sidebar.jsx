"use client"; // Must be a client component to use useState and handle clicks

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; //  Added for active route highlighting
// Import necessary icons from react-icons/fa and react-icons/io
import { FaHome, FaUsers, FaCog, FaChartLine, FaBars, FaTimes, FaLayerGroup, FaBehanceSquare } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { GrDomain } from "react-icons/gr";
import { BsFillInfoSquareFill } from "react-icons/bs";

import { GrGallery } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

import toast from 'react-hot-toast';
import { MdMessage } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiAdvertisementLine } from "react-icons/ri";

function LogoutUi ({logoutUser, setYesNo}) {
  return(
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">logout?</h2>
      <p className="mb-4 text-gray-400">Are you sure ?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setYesNo(null)}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={logoutUser}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
  )
}

function SidebarItem({ item, setYesNo}) {
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
  
  const pathname = usePathname(); //  Get current route
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenus = item.submenus && item.submenus.length > 0;

  //  Auto-open submenu if current route is inside it
  useEffect(() => {
    if (hasSubmenus && item.submenus.some((sub) => pathname.startsWith(sub.href))) {
      setIsOpen(true);
    }
  }, [pathname, hasSubmenus, item.submenus]);

  const handleClick = () => {
    if (hasSubmenus) {
      setIsOpen(!isOpen);
    }
  };

  const IconComponent = item.icon;

  //  Check if this item (or one of its submenus) matches the current route
  const isActive =
    pathname === item.href ||
    (hasSubmenus && item.submenus.some((sub) => pathname.startsWith(sub.href)));

  const ContentTag = hasSubmenus ? 'div' : Link;
  const contentProps = hasSubmenus ? { onClick: handleClick } : { href: item.href || '#' };








  return (
    <div className='relative'>
{/*  */}

    <li className="relative" >
      <ContentTag
        {...contentProps}
        className={`flex items-center justify-between p-3 text-sm font-medium cursor-pointer transition-colors duration-200 rounded-md
          ${
            isActive
              ? 'bg-blue-700 text-white' //  Active highlight
              : hasSubmenus
              ? 'text-gray-200 hover:bg-gray-700'
              : 'text-gray-300 hover:bg-blue-600 hover:text-white'
          }`}
      >
        <div className="flex items-center">
          {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
          <span className="truncate">{item.title}</span>
        </div>

        {/* Toggle Arrow Icon */}
        {hasSubmenus && (
          <IoIosArrowDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </ContentTag>

      {/* Submenu Container (Collapsible Animation) */}
      {hasSubmenus && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 py-1' : 'max-h-0 opacity-0'
          }`}
          style={{ transitionProperty: 'max-height, opacity, padding' }}
        >
          <ul className="pl-8 py-2 space-y-1 bg-gray-700/50 border-l border-gray-600">
            {item.submenus.map((sub, idx) => {
              const subActive = pathname === sub.href; //  Highlight active submenu too
              return (
                <li key={idx}>
                  <Link
                    href={sub.href || '#'}
                    className={`block p-2 text-xs rounded transition-colors duration-200 ${
                      subActive
                      ? 'bg-blue-700 text-white' //  Active submenu highlight
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    >
                    {sub.title}
                  </Link>
                </li>
              );
            })}
            <h1 key={"amza"} onClick={()=> setYesNo(true)} className='text-gray-400 hover:text-white hover:bg-gray-700 block cursor-pointer p-2 text-xs rounded transition-colors duration-200'>Logout </h1>
          </ul>
        </div>
      )}
    </li>
    </div>
  );
}

// =================================================================
// 3. MAIN COMPONENT: SidebarMenu (Handles Mobile Logic)
// =================================================================

export default function SidebarMenu({userData}) {
  // console.log(userData)
  // console.log(email)
  var MENU_ITEMS = [
    {
      title: 'Dashboard',
      icon: FaHome,
      href: '/admin/dashboard',
    },
    {
      title: 'Hero',
      icon: GrDomain,
      href: '/admin/dashboard/hero',
    },
        {
      title: 'Clients Image',
      icon: GrGallery,
      href: '/admin/dashboard/clients',
    },
        {
      title: 'Hero Cards',
      icon: FaRegNewspaper,
      href: '/admin/dashboard/herocards',
    },
        {
      title: 'Services Section',
      icon: GrServices,
      href: '/admin/dashboard/services',
    },
    {
      title: 'Projects Section',
      icon: BsFillInfoSquareFill,
      href: '/admin/dashboard/projects',
    },

    {
      title: 'Advantages Section',
      icon: RiAdvertisementLine,
      href: '/admin/dashboard/advantages',
    },
    {
      title: 'Benefits Section',
      icon: FaBehanceSquare,
      href: '/admin/dashboard/benefits',
    },
    {
      title: 'Client Message',
      icon: MdMessage,
      href: '/admin/dashboard/client-message',
    },
    {
      title: 'FAQs',
      icon: FaQuoteLeft,
      href: '/admin/dashboard/faqs',
    },
    {
      title: 'Social Link & Others',
      icon: IoShareSocialOutline,
      href: '/admin/dashboard/sociallink',
    },
{
    title: 'User Management',
    icon: FaUsers,
    submenus: [
      // Use ternary and then filter the array
      userData?.isAdmin ? { title: 'Manage Admins'+userData?.isAdmin, href: `/admin/dashboard/manage-users` } : null,
      { title: 'Change Password', href: `/admin/change-password/${userData?.email}` },
      { title: 'Go to Aayu Softtech', href: `https://aayusofttech.com.np` },
    ].filter(Boolean), // This removes the 'null' entries so your Sidebar doesn't crash
  },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mobileTranslateClass = isMobileOpen ? 'translate-x-0' : '-translate-x-full';
      const [yesNo, setYesNo] = useState(null);


    const logoutUser = async () => {
  try {

    document.cookie = 'tokeN=; path=/; max-age=0';

    
    toast.success("Logout successful");

    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout error:", error);
   toast.error("Logout failed");
  }
};

  return (
    <>
      {/* 1. Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="top-4 left-4 z-[1050] p-2 rounded-lg text-white bg-blue-700 lg:hidden transition-transform duration-300"
      >
        {isMobileOpen ? (
          <FaTimes className="w-6 h-6 transform rotate-90 transition duration-300" />
        ) : (
          <FaBars className="w-6 h-6 transition duration-300" />
        )}
      </button>

      {/* 2. Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-[990] bg-black/50 lg:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* 3. Sidebar */}
      <nav
       className={`fixed left-0 top-0 z-[1000] h-full w-64 bg-gray-800 shadow-xl p-4 overflow-y-auto
    transition-transform duration-300 ease-in-out
    ${mobileTranslateClass} lg:translate-x-0`}
      >
<div>
        <div className="text-l font-bold text-white mb-6 border-b border-gray-700 pb-4">
          Aayu Softtech Admin Panel
        </div>

  
</div>

        <ul className="space-y-1">
          {MENU_ITEMS.map((item, index) => (
            <SidebarItem key={item.title + index} item={item} setYesNo={setYesNo}  />
          ))}
        </ul>
      </nav>

      {yesNo !== null && (
      <LogoutUi logoutUser={logoutUser} setYesNo={setYesNo} />
 
)}

      {/* 4. Layout Spacer */}
      <div key={"mks"} className="hidden lg:block w-64 h-full flex-shrink-0" />
    </>
  );
}
