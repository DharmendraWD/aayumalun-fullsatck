// components/CustomGallery.jsx
import Image from 'next/image';
import img1 from "../../../../public/img/proj/6.jpeg"
import img2 from "../../../../public/img/proj/11.png"
import img3 from "../../../../public/img/proj/22.png"
import img4 from "../../../../public/img/proj/5.jpeg"
import img5 from "../../../../public/img/proj/2.jpeg"
import img6 from "../../../../public/img/proj/3.jpeg"
import H1 from '@/components/Heading/H1';


const CustomGallery = async() => {


  let images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6
  ]


  return (
    <>
    <div id='gallery'>
    <div className='py-4 pb-[30px]'>
      <H1 label="Gallery "></H1>
    </div>
  <div className="grid grid-cols-1 sm:grid-cols-4 max-w-[1440px]  mx-auto auto-rows-[300px] sm:auto-rows-[350px]">
{
      images.map((image, index) => {
        let colSpan = 'col-span-1';

        if (index === 0 || index === 5) colSpan = 'sm:col-span-2'; // first and last images
        // Image 2 and 3 remain default (1 col)
        // Rest are standard

        return (
          <div 
            key={index}
            className={`${colSpan}  relative group h-full w-full overflow-hidden`}
          >
            <Image
            
              width={300}
              height={300}
              src={image}
              alt={"ksm"}
unoptimized
              className="object-cover w-full transition-transform duration-300 group-hover:scale-105 h-full w-full"
            />
          </div>
        );
      })
      }
    </div>
    </div>
    </>
  );
};

export default CustomGallery;
