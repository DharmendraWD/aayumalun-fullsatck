import React from 'react';
import Head from 'next/head';
import RoundedBgBtn from '../../components/Buttons/RoundedBgBtn';
import RoundedNotBGBtn from '../../components/Buttons/RoundedNotBGBtn';

// Fetch hero section text data
async function getHeroData() {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/contents/herosection`,
      {
        next: { revalidate: 60 } // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch hero data');
    }

    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

// Fetch hero section images
async function getHeroImages() {
  try {
    const res = await fetch(
      `${process.env.BASE_API}/contents/herosectionimg`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch hero images');
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
}

// Image Grid Component
const ImageGridContent = ({ images }) => {
  const baseUrl = process.env.BASE_CONTENT_URL || '';
  
  // Ensure we have at least 6 images (repeat if necessary)
  const displayImages = [...images];
  while (displayImages.length < 6) {
    displayImages.push(...images);
  }
  const limitedImages = displayImages.slice(0, 6);

  return (
    <div data-aos="zoom-in-up" className="grid scrImgaes grid-cols-2 grid-rows-3 gap-3 p-4 md:p-6 lg:p-8">
      {/* Image 1: Top Left - Span two rows */}
      <div className="row-span-1 aspect-[4/5] overflow-hidden rounded-xl shadow-2xl max-h-[300px] w-[100%]">
        <img 
          src={`${baseUrl}${limitedImages[0]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl max-h-[300px] w-[100%]">
        <img 
          src={`${baseUrl}${limitedImages[1]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Image 3: Middle Right - Span one row */}
      <div className="aspect-[4/4] overflow-hidden rounded-xl shadow-2xl max-h-[300px] w-[100%]">
        <img 
          src={`${baseUrl}${limitedImages[2]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      {/* Image 4 & 5: Bottom Row - Full color */}
      <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl max-h-[300px] w-[100%]">
        <img 
          src={`${baseUrl}${limitedImages[3]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="col-span-1 aspect-square overflow-hidden rounded-xl shadow-2xl max-h-[300px]">
        <img 
          src={`${baseUrl}${limitedImages[4]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="max-h-[300px] w-[100%] rounded-xl">
        <img 
          src={`${baseUrl}${limitedImages[5]?.image}`} 
          alt="Hero gallery image" 
          className="w-full h-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

// Scrolling Image Grid Component
const ScrollingImageGrid = ({ images }) => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-full overflow-hidden">
      <div
        className="absolute inset-0 w-full"
        style={{
          height: "200%",
          animation: "scroll-up 6s linear infinite",
        }}
      >
        {[...Array(2)].map((_, idx) => (
          <ImageGridContent key={idx} images={images} />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-1/6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

// Parse slogan into styled parts
const parseSlogan = (slogan) => {
  if (!slogan) return null;
  
  // Split by common patterns and identify highlighted words
  const words = slogan.split(' ');
  const highlightWords = ['clean', 'energy', 'brighter'];
  
  return slogan.split('\n').map((line, lineIdx) => (
    <React.Fragment key={lineIdx}>
      {line.split(' ').map((word, wordIdx) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        const isHighlight = highlightWords.includes(cleanWord);
        
        return (
          <span
            key={wordIdx}
            className={`
              ${isHighlight 
                ? 'hover:text-gray-700 text-[var(--primary3)]' 
                : 'text-gray-700'
              }
              transition-all duration-300
              group-hover:text-[var(--primary3)]
              group-hover:hover:text-gray-700
            `}
          >
            {word}{' '}
          </span>
        );
      })}
      {lineIdx < slogan.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

// Main Hero Section Component
const Home1 = async () => {
  // Fetch data in parallel
  const [heroData, heroImages] = await Promise.all([
    getHeroData(),
    getHeroImages()
  ]);

  // Fallback data if API fails
  const fallbackData = {
    slogan: "Clean energy an unstoppable flow powering a brighter tomorrow.",
    description: "We don't just construct hydropower structures; we create projects that inspire confidence, stand resilient against the test of time, and deliver reliable, clean energy to the communities that depend on it. Our commitment goes beyond mere construction.",
    btn1Text: "About Us",
    btn1Link: "#about-us",
    btn2Text: "Gallery",
    btn2Link: "#gallery"
  };

  const data = heroData || fallbackData;
  const images = heroImages.length > 0 ? heroImages : [];

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      
      <section className="bg-white pt-[120px] md:pt-20 lg:pt-24 max-w-[1400px] mx-auto px-[20px] lg:px-0">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center py-8 lg:py-0">
            <h1
              data-aos="fade-up"
              className="text-3xl user-select-none sm:text-4xl lg:text-[70px] font-extrabold leading-none group"
            >
              {parseSlogan(data.slogan) || (
                <>
                  <span className="hover:text-gray-700 text-[var(--primary3)] transition-all duration-300 group-hover:text-[var(--primary3)] group-hover:hover:text-gray-700">
                    Clean energy
                  </span>
                  <br />
                  <span className="text-gray-700 transition-all duration-300 group-hover:text-[var(--primary3)] group-hover:hover:text-gray-700">
                    an unstoppable flow
                  </span>
                  <br />
                  <span className="text-gray-700 mr-2 transition-all duration-300 group-hover:text-[var(--primary3)] group-hover:hover:text-gray-700">
                    powering a
                  </span>
                  <span className="hover:text-gray-700 text-[var(--primary3)] transition-all duration-300 group-hover:text-[var(--primary3)] group-hover:hover:text-gray-700">
                    brighter
                  </span>
                  <br />
                  <span className="text-gray-700 transition-all duration-300 group-hover:text-[var(--primary3)] group-hover:hover:text-gray-700">
                    tomorrow.
                  </span>
                </>
              )}
            </h1>

            <p 
              data-aos="fade-up" 
              className="mt-8 font-semibold text-lg sm:text-xl text-gray-600 w-full max-w-full"
            >
              {data.description}
            </p>

            <div 
              data-aos="fade-up" 
              className="mt-10 md:flex-row md:gap-1 gap-[10px] flex-col flex space-x-4"
            >
              <RoundedBgBtn 
                label={data.btn1Text} 
                link={data.btn1Link} 
              />
              <RoundedNotBGBtn 
                label={data.btn2Text} 
                link={data.btn2Link} 
              />
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="lg:h-full lg:min-h-[700px]">
            {images.length > 0 ? (
              <ScrollingImageGrid images={images} />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
                <p className="text-gray-400">Loading images...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scroll animation keyframes */}
  
    </>
  );
};

export default Home1;