import React from 'react';
import wp from "../../../../public/img/wp1.jpg"
import { Form } from './Form';
import Navbar from '@/components/Header/Navbar/Navbar';
import Footer from '@/components/Misc/Footer/Footer';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import HTMLReactParser from 'html-react-parser';
import bimg1 from "../../../../public/img/blog/blog1.jpg"



const STATISTICS = [
    { value: "500k", label: "cost savings" },
    { value: "$500k", label: "cost savings" },
    { value: "95%", label: "customer satisfactions" },
    { value: "5%", label: "market shares growth" },
];

  let data =  [
   
    {
      title:"Puwa Khola 1 Hydropower To Develop 21 MW Aayu Malun Khola Hydropower Project In Okhaldhunga",
      desc:`Puwa Khola 1 Hydropower Limited is going to build the 21 MW Aayu Malun Khola Hydropower Project in Okhaldhunga district. For this purpose, the company has already received the construction license from the Department of Electricity Development.

The department granted the construction permit to the company on Mangsir 6, 2079 BS. The license has a validity until Mangsir 5, 2114 BS.

The department has provided the construction license to the promoter company on the basis of the environmental impact assessment report and study report of the project approved by the Ministry of Forest and Environment.

Before issuing the license, the Department Of Electricity Development had issued a notice requesting the stakeholders to submit written opinions/suggestions within 35 days if there is any adverse impact due to the construction and operation of this project.

The project is a run-of-the-river (ROR) type project. It will be built on the Malun River in Okhaldhunga district.

Puwa Khola 1 Hydropower is currently operating a 4 MW Puwa Khola-1 Hydropower Project in Illam District. The project began commercial electricity production from Ashwin 23, 2074 BS.

`,
id:1,
img:bimg1
    }
  ]
const StatCard = ({ stat }) => (
    
    <div className="bg-[#e9e9e9] p-6 rounded-[24px] shadow-2xl text-center h-full transition duration-300 hover:shadow-blue-300/50">
        <p className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-1">
            {stat.value}
        </p>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {stat.label}
        </p>
    </div>
);

export default async  function NewsDets(props) {
    const { params } = props;
  const awaitedParams = await params;
  const id = awaitedParams.id-1;





    const backgroundImage = data[id].img.src || wp;

    return (
        <>
        {/* <Navbar></Navbar> */}
        <div className="min-h-[100vh] flex items-end justify-center  relative overflow-hidden bg-gray-100">
            
            {/* Background Image and Overlay Container */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                </div>
            </div>

            {/* Content Container (z-10 for stacking above the background) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 m-auto">

                {/* Main Text Content */}
                <div className="text-center flex flex-col justify-around mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
                        {data[id].title  ?? " "}
                    </h1>
                    <div className="mt-4  multiline-ellipsis2 text-lg text-gray-200 max-w-3xl mx-auto px-4 sm:px-0">
                    
                    {data[id].desc || null}
          
                    </div>
                </div>

            </div>
        </div>
        
         {/* ------------------------------------- */}
         <div className="min-h-screen py-12 sm:py-16 md:py-20  bg-[#e9e9e9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Responsive Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
                    
                    {/* Column 1: Main Content (Takes up 2/3 of the width on medium/large screens) */}
                    <div className="md:col-span-2 mb-10 md:mb-0">
                        <NewsStudy  data={data} id={id}/>
                    </div>

                    {/* Column 2: Newsletter Sidebar (Takes up 1/3 of the width on medium/large screens) */}
                    <div className="md:col-span-1">
                        {/* <NewsletterSidebar /> */}
                    </div>

                </div>
            </div>
        </div> 

        <div>
<div className='max-w-7xl mx-auto mt-8 mb-8 flex gap-4 justify-between'>
    <h1 className='text-xl ml-3 font-semibold'>Other Blogs</h1>
    {/* <Link  href="/blog">
    <button className='bg-[#9999db] cursor-pointer px-[20px] py-[7px] text-[#272797]'>
        See all
    </button>
    </Link> */}
</div>
<div style={{justifyItems:"center"}} className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
    

   {
    data?.map((blog, index) => (
        <div key={index} className="bg-white max-w-[400px] min-w-[400px] justify-between rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="w-full h-auto overflow-hidden p-4">
                <Image
                width={300}
                height={300}
            // <img  src={`${BASE_CONTENT}/${member.image.replace(/\\/g, '/')}`}  className="team-img" />

                   src={blog.img}
                    alt={blog.title ?? " "}
                    className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                    // Fallback placeholder image on error\
                    unoptimized
                   
                />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                   {blog.title ?? " "}
                </h3>
                <div className="text-base multiline-ellipsis text-gray-600 mb-4 flex-grow">
                     {HTMLReactParser(blog?.desc)} 
                </div>
                <Link href={`/blog/${blog.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                    Read more
                </Link>
            </div>
        </div>
    ))
   }
</div>
</div>
<Footer></Footer>
        </>
    );
}






// Newsletter Sidebar Component
const NewsletterSidebar = () => {
    return (
         <>
        {/* // The container uses a large, vibrant background for emphasis */}
        <div className="p-8 bg-indigo-700 rounded-3xl sticky top-8 md:top-12 self-start shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
                Join newsletter
            </h3>
            <p className="text-indigo-200 text-sm mb-6">
                Stay up to date with new case studies. We promise no spam, just good content.
            </p>


<Form></Form>
        </div>
       
        
        </>
    );
};

// Main Case Study Content Component
const NewsStudy = async({data, id}) => {


    return (
        <>
        <div className="text-gray-700 leading-relaxed  space-y-8">
            <section>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                                    {data[id].title || null}

                </h2>
                <div className="text-lg font-semibold">
                 
                            {data[id].desc || null}

                </div>
            </section>

        


    
        </div>

</>
    );
};

