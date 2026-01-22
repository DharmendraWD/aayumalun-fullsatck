"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const TeamCarousel = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contents/team`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform API data to match component structure
          const transformedData = data.data.map((member) => ({
            name: member.name,
            title: "Team Member", // Default title since API doesn't provide it
            img: `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}uploads/team/${member.dp}`,
            desc: member.description
          }));
          
          setTeamMembers(transformedData);
        } else {
          throw new Error(data.message || "Failed to fetch team members");
        }
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(err.message);
        // You can set default/fallback data here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // console.log(teamMembers)

  if (loading) {
    return (
      <div className="team-section max-w-[1440px] mx-auto" id="about-teams">
        <div className="team-header flex lg:flex-row gap-8 items-start max-w-[100%] w-full flex-col">
          <h1>Meet the talented team who make all this happen</h1>
          <p className="font-semibold "> 
            Our philosophy is simple, hire great people and give them the
            resources and support to do their best work.
          </p>
        </div>
        <div className="text-center py-10">
          <p>Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-section max-w-[1440px] mx-auto" id="about-teams">
        <div className="team-header flex lg:flex-row gap-8 items-start max-w-[100%] w-full flex-col">
          <h1>Meet the talented team who make all this happen</h1>
          <p className="font-semibold "> 
            Our philosophy is simple, hire great people and give them the
            resources and support to do their best work.
          </p>
        </div>
        <div className="text-center py-10 text-red-500">
          <p>Error loading team members: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-section max-w-[1440px] mx-auto" id="about-teams" >
      <div className="team-header flex lg:flex-row gap-8 items-start max-w-[100%] w-full flex-col">
        <h1>Meet the talented team who make all this happen</h1>
        <p className="font-semibold "> 
          Our philosophy is simple, hire great people and give them the
          resources and support to do their best work.
        </p>
      </div>

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
          <div className="team-card rounded-xl min-h-[440px] hover:shadow-2xl hover:scale-[1.01] px-4 shadow-lg transition duration-300 ease-in-out hover:scale-[1.01]s" key={index}>
            <div>
              <img src={member.img} alt={member?.name} className="team-img mx-auto" />
            </div>
            <h3 className="font-semibold">{member?.name}</h3>
            {/* <h4 className="font-semibold ">{member?.title}</h4> */}
            <p className="max-h-[100px] overflow-scroll my-scroll text-gray-600 font-semibold ">{member.desc}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TeamCarousel;