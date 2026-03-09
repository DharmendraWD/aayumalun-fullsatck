
import React from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TeamCarouselClient from "./TeamCarouselClient";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

async function getTeamMembers() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contents/team`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.map((member) => ({
        name: member.name,
        img: `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}uploads/team/${member.dp}`,
        desc: member.description,
        designation: member.designation
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return []; // Return empty array to handle error gracefully
  }
}

const TeamCard = async () => {
  const teamMembers = await getTeamMembers();

  // Header section 
  const HeaderSection = () => (
    <div className="team-header flex lg:flex-row gap-8 items-start max-w-[100%] w-full flex-col">
      <h1>Meet the talented team who make all this happen</h1>
      <p className="font-semibold">
        Our philosophy is simple, hire great people and give them the
        resources and support to do their best work.
      </p>
    </div>
  );

  if (teamMembers.length === 0) {
    return (
      <div className="team-section max-w-[1440px] mx-auto" id="about-teams">
        <HeaderSection />
        <div className="text-center py-10">
          <p>No team members found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="team-section max-w-[1440px] mx-auto" id="about-teams">
      <HeaderSection />
      <TeamCarouselClient 
        teamMembers={teamMembers} 
        responsive={responsive}
      />
    </div>
  );
};

export default TeamCard;