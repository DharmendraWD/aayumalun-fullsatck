// components/MissionVisionValues.js - SERVER COMPONENT

import React from "react";
import { Target, Eye, Gem } from "lucide-react";

// Helper function to fetch data on server
async function getMissionData() {
  try {
    const [missionResponse, imagesResponse] = await Promise.all([
      fetch(`${process.env.BASE_API}/contents/mission`, { 
        cache: 'force-cache',
        next: { revalidate: 3600 } // Revalidate every hour
      }),
      fetch(`${process.env.BASE_API}/contents/missionimg`, { 
        cache: 'force-cache',
        next: { revalidate: 3600 }
      })
    ]);

    if (!missionResponse.ok) {
      throw new Error('Failed to fetch mission data');
    }

    const missionData = await missionResponse.json();
    const imagesData = imagesResponse.ok ? await imagesResponse.json() : null;

    return {
      mission: missionData.success ? missionData.data : null,
      images: imagesData?.success ? imagesData.data : null
    };
  } catch (error) {
    console.error('Error fetching mission data:', error);
    return { mission: null, images: null, error: error.message };
  }
}

// Fallback data in case API fails
const fallbackMissionData = {
  heading: "Mission",
  shortpara: "Deliver reliable renewable energy through sustainable hydropower development for Nepal’s future growth.",
  firstCardHeading: "Our Mission",
  firstCardPara: "To generate clean, reliable, and sustainable energy by harnessing the natural power of water—empowering communities, protecting the environment, and driving a greener future.",
  secCardHeading: "Our Vision",
  secCardPara: "To be a global leader in hydropower, setting the standard for sustainable energy development while creating a positive impact on people, ecosystems, and the planet.",
  thirdCardHeading: "Our Values",
  thirdCardPara: "Our work is guided by ethical principles and a dedication to transparency, ensuring that every project we undertake meets the highest standards of safety and accountability."
};

// Card Component - Can stay as a regular component since it doesn't use client hooks
const MvvCard = ({ title, description, Icon }) => {
  return (
    <div
      data-aos="fade-down-right"
      className={`p-6 md:p-8 rounded-xl border border-gray-200 bg-white
        transition-all duration-300 ease-in-out cursor-pointer h-full
        flex flex-col justify-start text-left
        hover:bg-[var(--primary1)] hover:text-white hover:border-transparent 
        hover:shadow-lg group`}
    >
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-full mr-4 bg-[var(--primary1)] bg-opacity-10 text-white 
          transition-all duration-300 ease-in-out 
          group-hover:bg-white group-hover:text-[var(--primary1)]`}
        >
          <Icon size={24} />
        </div>

        <h3
          className="text-xl font-semibold text-gray-900 transition-colors 
          duration-300 ease-in-out group-hover:text-white"
        >
          {title}
        </h3>
      </div>

      <p
        className="mt-2 text-base text-gray-600 leading-relaxed transition-colors 
        duration-300 ease-in-out group-hover:text-white font-semibold"
      >
        {description}
      </p>
    </div>
  );
};

// Main Mission Section - SERVER COMPONENT
const Mission = async () => {
  // Fetch data on the server
  const { mission, images, error } = await getMissionData();
  
  // Use API data or fallback
  const missionData = mission || [];
  const missionImages = images || [];
  

  // Prepare card data
  const cardData = [
    {
      title: missionData.firstCardHeading,
      description: missionData.firstCardPara,
      icon: Target,
    },
    {
      title: missionData.secCardHeading,
      description: missionData.secCardPara,
      icon: Eye,
    },
    {
      title: missionData.thirdCardHeading,
      description: missionData.thirdCardPara,
      icon: Gem,
    },
  ];

  // If there was an error, you could optionally show an error message
  // But we'll use fallback data so the component still renders
  if (error && !mission) {
    console.warn('Using fallback data due to API error:', error);
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              {missionData.heading}
            </h2>

            <p className="text-lg text-gray-600 mb-10 font-semibold leading-relaxed max-w-lg">
              {missionData.shortpara}
            </p>

            {/* CARDS */}
            <div className="flex flex-col gap-6">
              {cardData.map((item, idx) => (
                <MvvCard
                  key={idx}
                  title={item.title}
                  description={item.description}
                  Icon={item.icon}
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="h-full min-h-[400px] flex">
            <div className="relative w-full rounded-2xl overflow-hidden  flex flex-col justify-around">
              <img
                data-aos="zoom-out-up"
                src={process.env.BASE_CONTENT_URL+"uploads"+"/missionimg/"+missionImages?.img1}
                alt="Hydropower Mission"
                className="w-full max-h-[300px] rounded-xl object-cover"
                loading="lazy"
                
              />
              <img
                data-aos="zoom-out-up"
                src={process.env.BASE_CONTENT_URL+"uploads"+"/missionimg/"+missionImages?.img2}
                alt="Hydropower Mission"
                className="w-full max-h-[300px] rounded-xl object-cover"
                loading="lazy"
                
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Mission;