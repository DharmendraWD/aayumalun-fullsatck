// components/CallToAction.jsx

import RoundedBgBtn from "@/components/Buttons/RoundedBgBtn";
import Link from "next/link";

// This is a Server Component by default in Next.js App Router
export default async function FooterHero() {


  return (

      <section className="bg-white py-20 md:py-28 text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Main Heading */}
        <h2 data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="800"
     data-aos-offset="0" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
Sustainable Energy for a Brighter Tomorrow.
        </h2>

        {/* Sub-description */}
        <p data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="800"
     data-aos-offset="0" className="text-lg font-semibold md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
We harness the pure, natural flow of Nepal’s rivers to deliver reliable, sustainable and environmentally friendly hydro-electric power. Our mission is to light homes, empower communities, and build a cleaner future for Nepal.
        </p>

        {/* Call-to-Action Button */}
       <Link href={"#about-us"} className="px-6  py-3 text-lg font-medium text-white bg-[var(--primary1)] m-0 rounded-[50px] cursor-pointer shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
Go to Up
       </Link>  
      </div>
    </section>

      

  );
}