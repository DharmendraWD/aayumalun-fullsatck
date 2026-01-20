

import React from 'react';

import Image from 'next/image';
import map from "../../../public/img/map.png"
import map2 from "../../../public/img/proj/map2.png"
import elec from "../../../public/img/electric.png"
import img2 from "../../../public/img/new1.jpeg";

const Card = ({ children, className }) => (
  <div
    className={` p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-[1.01] ${className}`}
  >
    {children}
  </div>
);

const ClientCarousel = async () => {

 

  return (

    <div className=" max-w-[1440px] mb-4 mx-auto bg-white p-4 sm:p-8"id='about-us'>

        <div className="relative py-8 max-w-[1100px] mx-auto flex items-center justify-center  overflow-hidden bg-white ">
            

  
            <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-8 text-center">

          
                <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="800"
     data-aos-offset="0" className="flex justify-center mb-8 sm:mb-8">
                    <button className="px-6 py-2 bg-white text-gray-900 font-medium text-xl rounded-full shadow-lg transition duration-200 hover:shadow-xl hover:text-gray-800  border border-gray-200">
                    About Us
                    </button>
                </div>
                


                <p data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="800"
     data-aos-offset="0" className="text-xl sm:text-xl text-gray-700 text-center leading-relaxed max-w-[100%] mx-auto mt-4 border-blue-600 pt-4">
                 We’re not just about power generation; we’re about sustainability, innovation, and long-term community growth.
At Aayu Malun Hydropower, our mission is to harness Nepal’s natural energy responsibly, delivering clean and reliable electricity that empowers people and preserves the environment for generations to come. 

For this ambitious endeavor, the company has already secured the necessary construction license from the Department of Electricity Development, reflecting both regulatory approval and trust in our technical expertise. The department officially granted the construction permit to the company on Mangsir 6, 2079 BS, marking a significant milestone in the project’s journey from vision to reality. 
                </p>
                
            </div>
        </div>
                <Card className="bg-white mt-4 mb-4  text-white lg:col-span-2 lg:row-span-1 h-full relative overflow-hidden">
          <div className='flex md:flex-row flex-col items-start justify-between'>
     <div className='w-[90%]' >
           <h3 className="text-xl font-bold mb-4 opacity-75 text-gray-900">Where we Operate</h3>
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           
            <div className="absolute inset-0 bg-repeat [background-image:radial-gradient(currentColor_1px,_transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="relative z-10">
            <p data-aos="zoom-out-up" className="text-lg leading-relaxed max-w-2x text-gray-900 ">
             Our 21 MW Aayu Malun Khola Hydropower Project is located in the Sagarmatha Zone of Koshi Province, spanning across Okhaldhunga and Solukhumbu districts.
The intake lies in Malun Rural Municipality Ward 6 & 7, while the powerhouse is located in Ward 5.
The transmission line traverses Rangadip, Patale, Bigutar, Jantarkhani, Kerun, and Tingla before connecting to the Tingla Substation. 
            </p>
      
           
          </div>
       </div>
          <Image data-aos="zoom-out-up" src={map2.src} width={200} className='w-[50%]' height={200}   alt="map" />  
          

     </div>
        </Card>



      <div className="grid mt-8 gap-6 lg:grid-cols-3  lg:h-[350px]" >

      

        {/* <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">

           <Image
                height={300}
                width={300}
              
          unoptimized
                    src={img1.src} 
                    alt="Aerial view of the reservoir water"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
        </div> */}

        <div className="lg:col-span-1 lg:row-span-1 overflow-hidden rounded-xl shadow-lg">
          <div className="relative w-full h-full">
            <div data-aos="zoom-out-up" className="flex h-full ">
                <Image 
                width={300}
                height={300}
      unoptimized
                    src={img2}
                    alt="Side view of the hydropower dam structure"
                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-[1.03]"
                />
             
            </div>
          </div>
        </div>

        <Card className="bg-[#ab2320] text-gray-800 lg:col-span-1 lg:row-span-1 border border-gray-100 h-full">
          <h3  data-aos="zoom-out-up" className="text-l font-semibold mb-4 text-gray-300 opacity-75">{"Foundation"}</h3>
          <p  data-aos="zoom-out-up" className="leading-relaxed text-white ">
         Founded with a vision to develop clean, renewable hydropower responsibly, Aayu Malun Hydropower Pvt. Ltd. combines decades of engineering experience, strong technical leadership, and a commitment to sustainable development.
Our portfolio includes the Aayu Malun Khola (21 MW), Puwa Khola-1 (4 MW), and Aayu Chhetigad (13.942 MW) projects. 
          </p>
        
        
        </Card>

    
        <Card data-aos="zoom-out-up" className="bg-[#ab2320] text-white lg:col-span-1 lg:row-span-1 h-full relative overflow-hidden flex flex-col justify-between">
   <div className='flex md:flex-row flex-col  justify-between'>
    <div data-aos="zoom-out-up">
           <h3 className="text-l font-semibold opacity-75">Capacity</h3>
          <div className="flex items-center space-x-4 mt-4">
            <div className="relative text-2xl font-extrabold">21MW</div>
      
          </div>
          <p   className="mt-4 overflow-auto my-scroll text-l leading-relaxed max-w-[100%] lg:max-w-xs">
           The Aayu Malun Khola Hydropower Project generates 21 MW of clean electricity through a run-of-river scheme utilizing Malun Khola.
With a net head of 524.1 m, design discharge of 4.52 m³/s, and Pelton turbines (90.9% efficiency), the plant ensures reliable generation across all seasons. 
          </p>
          
   </div>
   <Image  src={elec} width={200} className='w-[30%]' height={200}   alt="map" />
   </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientCarousel;