
import img1 from "../../../../public/img/hpower1.jpg"
import img2 from "../../../../public/img/hpower2.jpg"
import img3 from "../../../../public/img/hydroportrait.jpg"
import Image from "next/image";
import Link from "next/link";
import bimg1 from "../../../../public/img/blog/blog1.jpg"



// Individual Card Component
const CaseStudyCard = ({ study }) => {
    return (
        <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="w-full h-auto overflow-hidden p-4">
                <Image
                width={300}
                height={300}
            // <img  src={`${BASE_CONTENT}/${member.image.replace(/\\/g, '/')}`}  className="team-img" />

                   src={study.img}
                    alt={study.title}
                    className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                    // Fallback placeholder image on error\
                    unoptimized
                   
                />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                   {study.title}
                </h3>
                <div className="text-base multiline-ellipsis font-semibold text-gray-600 mb-4 flex-grow">
                                        {study?.desc} 

                </div>
                <Link href={`/blog/${study.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                    Read more
                </Link>
            </div>
        </div>
    );
};

// Main App Component
export default async function  NewsAndCaseStudy() {

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

      

  return (
    <div data-aos="fade-up"  className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>

        {/* Responsive Grid Container */}
        <div  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data?.splice(0, 3).map(study => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        
      </div>
    </div>
  );
}