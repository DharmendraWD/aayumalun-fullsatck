// TeamCarouselClient.tsx
"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TeamCarouselClient = ({ teamMembers, responsive }) => {
  return (
    <>
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      transitionDuration={800}
      containerClass="carousel-container fade-carousel"
      arrows={false}
      itemClass="px-4 py-[20px]"
    >
      {teamMembers.map((member, index) => (
        <div className="team-card rounded-xl min-h-[440px] hover:shadow-2xl hover:scale-[1.01] px-4 shadow-lg transition duration-300 ease-in-out" key={index}>
          <div>
            <img src={member.img} alt={member.name} className="team-img mx-auto" />
          </div>
          <h3 className="font-semibold text-gray-900">{member.name}</h3>
          <h3 className="font-semibold text-gray-900">{member.designation}</h3>
          <p className="max-h-[100px] overflow-scroll my-scroll text-gray-600 font-semibold">{member.desc}</p>
        </div>
      ))}
    </Carousel>
    </>
  );
};

export default TeamCarouselClient;