
import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '@/components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '@/components/Buttons/RoundedNotBGBtn';
import img1 from "../../../public/img/proj/11.png";
import img2 from "../../../public/img/proj/11.png";
import img3 from "../../../public/img/proj/1.jpeg";
import img4 from "../../../public/img/proj/2.jpeg";
import img5 from "../../../public/img/proj/3.jpeg";
import img6 from "../../../public/img/proj/4.jpeg";


const ImageGridContent = async () => {
  
  
  const imagePaths = {
    img1: img1, 
    img2:img2,
    img3:img3,
    img4:img4,
    img5:img5,
    img6: img6
  };
  
return (
  <div data-aos="zoom-in-up" className="grid scrImgaes  grid-cols-2 grid-rows-3 gap-3 p-4 md:p-6 lg:p-8">
           {/* ... (Image elements are unchanged) ... */}
        {/* Image 1: Top Left - Span two rows */}
        <div className="row-span-1 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl max-h-[300px]  w-[100%]">
            <img src={imagePaths.img5.src} alt="Hero scrolling images" className="w-full  h-full object-cover  transition-transform duration-500 hover:scale-105"/>
        </div>

        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl  max-h-[300px]  w-[100%]">
            <img src={imagePaths.img2.src} alt="Hero scrolling images" className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>

        {/* Image 3: Middle Right - Span one row */}
        <div className="aspect-[4/4] overflow-hidden rounded-xl shadow-2xl max-h-[300px]  w-[100%] ">
            <img src={imagePaths.img3.src} alt="Hero scrolling images" className="w-full  h-full object-cover  transition-transform duration-500 hover:scale-105"/>
        </div>
        
        {/* Image 4 & 5: Bottom Row - Full color */}
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl  max-h-[300px] w-[100%] ">
            <img src={imagePaths.img4.src} alt="Hero scrolling images" className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl max-h-[300px]  ">
            <img src={imagePaths.img5.src} alt="Hero scrolling images" className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
        <div className=" max-h-[300px]  w-[100%]">
            <img src={imagePaths.img6.src} alt="Hero scrolling images" className="w-full  h-full object-cover transition-transform duration-500 hover:scale-105"/>
        </div>
   
    </div>
)
}


const ScrollingImageGrid = () => {
  const copies = 3; 

  return (
   <div className="relative w-full h-[500px] md:h-[600px] lg:h-full overflow-hidden">
  
  <div
    className="absolute inset-0 w-full"
    style={{
      height: "200%",          // <— key change
      animation: "scroll-up 6s linear infinite",
    }}
  >
    {[...Array(2)].map((_, idx) => (
      <ImageGridContent key={idx} />
    ))}
  </div>

  {/* gradient overlays */}
  <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

</div>

  );
};

// Main Hero Section Component
const Home1 = async() => {

 
      

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      
      <section className="bg-white  pt-[120px] md:pt-20 lg:pt-24 max-w-[1400px] mx-auto px-[20px] lg:px-0">
        
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8">
          
          <div className="flex flex-col justify-center py-8 lg:py-0">
          <h1
  data-aos="fade-up"
  className="text-3xl user-select-none sm:text-4xl lg:text-[70px] font-extrabold leading-none group"
>
  {/* CLEAN ENERGY */}
  <span
    className=" user-select-none
      hover:text-gray-700
      text-[var(--primary3)]
      transition-all duration-300
      group-hover:text-[var(--primary3)]
      group-hover:hover:text-gray-700
    "
  >
    Clean energy
  </span>

  <br />

  {/* OTHER TEXT */}
  <span
    className="
      text-gray-700 user-select-none
      transition-all duration-300
      group-hover:text-[var(--primary3)]
      group-hover:hover:text-gray-700
    "
  >
    an unstoppable flow
  </span>

  <br />

  <span
    className="
      text-gray-700 mr-2
      transition-all duration-300
      group-hover:text-[var(--primary3)]
      group-hover:hover:text-gray-700
    "
  >
    powering  a  
  </span>

  <span
    className="
      hover:text-gray-700
      text-[var(--primary3)]
      transition-all duration-300
      group-hover:text-[var(--primary3)]
      group-hover:hover:text-gray-700
    "
  >
     brighter
  </span>

  <br />

  <span
    className="
      text-gray-700
      transition-all duration-300
      group-hover:text-[var(--primary3)]
      group-hover:hover:text-gray-700
    "
  >
    tomorrow.
  </span>
</h1>


            <p data-aos="fade-up" className="mt-8 font-semibold text-lg sm:text-xl text-gray-600 w-full max-w-full">
          We don’t just construct hydropower structures; we create projects that inspire confidence, stand resilient against the test of time, and deliver reliable, clean energy to the communities that depend on it. Our commitment goes beyond mere construction.
          <br />


            </p>

            <div data-aos="fade-up" className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4">
          
<RoundedBgBtn 
  label={"About Us"} 
  link={"#about-us"} 
/>
          <RoundedNotBGBtn 
  label={"Gallary"} 
  link={"#gallery"} 
/>
            </div>
          </div>
          
          <div  className="lg:h-full lg:min-h-[700px]">
            <ScrollingImageGrid/>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Home1;