// components/CustomGallery.jsx
import Image from 'next/image';
import H1 from '@/components/Heading/H1';

const CustomGallery = async () => {
  let images = [];
  
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contents/gallery`;
    const response = await fetch(apiUrl, {
      // Add cache options if needed
      // cache: 'no-store' for dynamic data
      // next: { revalidate: 3600 } for ISR
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      // Transform API data to image URLs
      images = data.map(item => ({
        id: item.id,
        src: `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}${item.image}`,
        title: item.title
      }));
    }
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    // You can return a fallback UI or empty array
    images = [];
  }

  if (images.length === 0) {
    return (
      <div id='gallery'>
        <div className='py-4 pb-[30px]'>
          <H1 label="Gallery "></H1>
        </div>
        <div className="max-w-[1440px] mx-auto text-center py-10">
          <p>No gallery images found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id='gallery'>
        <div className='py-4 pb-[30px]'>
          <H1 label="Gallery "></H1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 max-w-[1440px] mx-auto auto-rows-[300px] sm:auto-rows-[350px]">
          {images.map((image, index) => {
            let colSpan = 'col-span-1';

            if (index === 0 || index === images.length - 1) colSpan = 'sm:col-span-2'; // first and last images

            return (
              <div 
                key={image.id || index}
                className={`${colSpan} relative group h-full w-full overflow-hidden`}
              >
                <Image
                  width={300}
                  height={300}
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  unoptimized
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomGallery;