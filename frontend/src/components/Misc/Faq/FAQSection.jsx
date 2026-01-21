// components/FAQSection.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
  // State to manage which FAQ item is currently open/expanded
  const [openId, setOpenId] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQ data from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setIsLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contents/faqs`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          // Transform API data to match component structure
          const transformedData = data.data.map(item => ({
            id: item.id,
            question: item.ques,
            answer: item.ans
          }));
          setFaqData(transformedData);
        } else if (Array.isArray(data)) {
          // Handle direct array response if needed
          const transformedData = data.map(item => ({
            id: item.id,
            question: item.ques,
            answer: item.ans
          }));
          setFaqData(transformedData);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(err.message);
        // You can set default/fallback data here if needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Function to toggle the open state of an FAQ item
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (isLoading) {
    return (
      <section data-aos="fade-up" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="lg:pr-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Some questions, <br />some answers.
              </h2>
              <p className="text-lg font-semibold text-gray-700 max-w-sm mx-auto lg:mx-0">
                Loading FAQs...
              </p>
            </div>
            <div className="w-full">
              <div className="border-b border-gray-300 py-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section data-aos="fade-up" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="lg:pr-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Some questions, <br />some answers.
              </h2>
              <p className="text-lg font-semibold text-red-600 max-w-sm mx-auto lg:mx-0">
                Error loading FAQs. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (faqData.length === 0) {
    return (
      <section data-aos="fade-up" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="lg:pr-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Some questions, <br />some answers.
              </h2>
              <p className="text-lg font-semibold text-gray-700 max-w-sm mx-auto lg:mx-0">
                No FAQs available at the moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section data-aos="fade-up" className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:pr-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Some questions, <br />some answers.
            </h2>
            <p className="text-lg font-semibold text-gray-700 max-w-sm mx-auto lg:mx-0">
              Have a look at my most frequently asked questions.
            </p>
          </div>

          {/* Right Column: Accordion FAQ Items */}
          <div className="w-full">
            {faqData?.map((item, index) => (
              <div key={item.id} className="border-b border-gray-300 py-6">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none"
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-xl md:text-2xl "> {index + 1}. {item.question}</span>
                  <span className="text-gray-500 transition-transform duration-300">
                    {openId === item.id ? 
                        <FaMinus className="w-5 h-5" /> : 
                        <FaPlus className="w-5 h-5" />
                    }
                  </span>
                </button>
                
                {/* Answer Section (conditionally rendered with animation) */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`overflow-hidden font-semibold transition-all duration-300 ease-in-out ${
                    openId === item.id ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 text-lg pr-4">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;