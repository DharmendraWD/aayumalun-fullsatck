"use client";
import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
const FAQclient = ({ data}) => {
  const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };


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
            {data?.map((item, index) => (
              <div key={item.id} className="border-b border-gray-300 py-6">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none"
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-xl md:text-2xl "> {index + 1}. {item.ques}</span>
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
                  <p className="text-gray-600 text-lg pr-4">{item.ans}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQclient