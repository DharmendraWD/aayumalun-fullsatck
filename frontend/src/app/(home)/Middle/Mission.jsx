// components/MissionVisionValues.js

import React from "react";
import { Target, Eye, Gem } from "lucide-react";
// import img from "../../../../public/img/imghydroportrait.jpeg";
import img from "../../../../public/img/proj/mission.jpeg";

// Static MVV Data (no API)
const mvvData = [
  {
    title: "Our Mission",
    description:
      "To generate clean, reliable, and sustainable energy by harnessing the natural power of water—empowering communities, protecting the environment, and driving a greener future.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To be a global leader in hydropower, setting the standard for sustainable energy development while creating a positive impact on people, ecosystems, and the planet.",
    icon: Eye,
  },
  {
    title: "Our Values",
    description:
      "Our work is guided by ethical principles and a dedication to transparency, ensuring that every project we undertake meets the highest standards of safety and accountability.",
    icon: Gem,
  },
];

// Reusable Card Component
const MvvCard = ({ title, description, Icon }) => {
  return (
    <div  data-aos="fade-down-right"
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
        duration-300 ease-in-out group-hover:text-white font-semibold "
      >
        {description}
      </p>
    </div>
  );
};

// Main Mission Section
const Mission = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Mission
            </h2>

            <p className="text-lg text-gray-600 mb-10 font-semibold  leading-relaxed max-w-lg">
              Deliver reliable renewable energy through sustainable hydropower
              development for Nepal’s future growth.
            </p>

            {/* CARDS */}
            <div className="flex flex-col gap-6">
              {mvvData.map((item, idx) => (
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
          <div className="h-full min-h-[400px]">
            <div className="relative w-full  rounded-2xl overflow-hidden shadow-xl">
              <img data-aos="zoom-out-up"
                src={img.src}
                alt="Hydropower"
                className="w-full max-h-[860px] object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Mission;
