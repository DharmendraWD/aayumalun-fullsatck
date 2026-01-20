"use client";
import img1 from "../../../../public/img/testimonial/1.jpg";
import img2 from "../../../../public/img/testimonial/2.jpg";
import img3 from "../../../../public/img/testimonial/3.jpg";
import img4 from "../../../../public/img/testimonial/4.jpg";
import img5 from "../../../../public/img/testimonial/5.jpg";

import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';


import sabinProfile from "../../../../public/img/gallary/1.png"; // Replace with your path
import collageImage from "../../../../public/img/gallary/1.png"; // Replace with your path

// Define data for the profile
// data/team.js or inside the component file
export const teamMembers = [
  {
    id: 1,
    name: "Sabin Adhikari",
    title: "CEO of Aayu Malung",
    bio: "The visionary CEO of Aayu Malung Pvt. Ltd., leads with a strong passion for innovation, sustainability, and community-driven growth. Under his leadership, Aayu Malung continues to push boundaries, blending modern ideas with ethical practices to create meaningful impact. With a forward-thinking approach and a deep commitment to excellence.",
    profileImage: img1, // The main circular image
    thumbnailImage: img1, // The image in the horizontal list
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
    }
  },

  {
    id: 2,
    name: "Member Two Name",
    title: "Designation",
    bio: "Bio for member two...",
    profileImage: img2,
    thumbnailImage:img2,
    social: { /* ... */ }
  },
   {
    id: 3,
    name: "Member Three Name",
    title: "Programmer",
    bio: "Bio for member three...",
    profileImage: img3,
    thumbnailImage:img3,
    social: { /* ... */ }
  },
    {
    id: 4,
    name: "Member Four Name",
    title: "Actor",
    bio: "Bio for member Four...",
    profileImage: img4,
    thumbnailImage:img4,
    social: { /* ... */ }
  },
      {
    id: 5,
    name: "Member Five Name",
    title: "ENginerr",
    bio: "Bio for member Five...",
    profileImage: img5,
    thumbnailImage:img5,
    social: { /* ... */ }
  },
];

// Define the assumed primary color from your design (the blue line)
// This should match a color defined in your tailwind.config.js, or use inline styles.

export default function TeamProfile() {
const primaryColor = '#4F46E5'; // Example Indigo-600
const [activeMemberId, setActiveMemberId] = useState(teamMembers[0].id);
  const activeMember = teamMembers.find(member => member.id === activeMemberId);

  // Fallback in case of an issue
if (!activeMember) {
    // Optionally render a loading spinner or an error message instead of null
     <div>Member Not Found</div>; 
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          {/* Blue Underline Style */}
          <div className="w-16 h-1 bg-indigo-600 mb-2" style={{ backgroundColor: primaryColor }}></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Faces Behind our success
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            We work closely with our clients to understand their vision and deliver unique and tailored solution. Together, we will create captivating experience
          </p>
        </div>

        











        {/* ----------------- */}
        {/* 2. Main Content Grid (Responsive Layout) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDE: Profile Details */}
        <div className="lg:w-1/2 flex flex-col items-start">
          <div className="mb-6 w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-600">
             {/* Use activeMember.profileImage for the circular image */}
            <img src={activeMember?.profileImage?.src} alt={activeMember.name} className="w-full h-full object-cover" />
          </div>
          
          <h3 className="text-3xl font-bold mb-1 text-gray-900">
            {activeMember.name}
          </h3>
          <p className="text-xl text-indigo-600 mb-4">
            {activeMember.title}
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4 mb-8">
            <a href={activeMember.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaLinkedin size={24} /></a>
            <a href={activeMember.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaTwitter size={24} /></a>
            <a href={activeMember.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaInstagram size={24} /></a>
            <a href={activeMember.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition"><FaYoutube size={24} /></a>
          </div>
          
          {/* Biography Paragraph */}
          <p className="text-gray-700 leading-relaxed max-w-lg">
            {activeMember.bio}
          </p>
        </div>

        {/* RIGHT SIDE: Dynamic Image Gallery */}
        <div className="lg:w-1/2 flex justify-between h-96 overflow-hidden rounded-lg shadow-2xl">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`relative h-full cursor-pointer 
                          transition-all duration-500 ease-in-out
                          ${activeMemberId === member.id 
                              ? 'w-[45%] md:w-2/3 opacity-100' // Active: Wider
                              : 'w-[11%] md:w-[25%] opacity-70'  // Inactive: Thinner
                          }`}
              onClick={() => setActiveMemberId(member.id)}
            >
              <img
                src={member?.thumbnailImage?.src ? member.thumbnailImage.src : member?.thumbnailImage} 
                alt={member?.thumbnailImage}
                // Tailwind: object-cover ensures the image fills the dynamic container
                className="w-full h-full object-cover" 
              />
       
              {/* Optional: Add a subtle overlay for better text contrast if you add text */}
              <div className="absolute inset-0 bg-black transition duration-300" 
                   style={{ opacity: activeMemberId === member.id ? 0 : 0.2 }}>
              </div>
            </div>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
}