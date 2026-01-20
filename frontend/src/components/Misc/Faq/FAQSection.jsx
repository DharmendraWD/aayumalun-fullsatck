// components/FAQSection.jsx
"use client"; // This component requires client-side interactivity (useState, onClick)

import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Using FaPlus and FaMinus for clarity

// --- MOCK FAQ DATA ---

const FAQSection = () => {









let data= [
  {
question: "1. What is the Aayu Malun Khola Hydropower Project?",
answer:"The Aayu Malun Khola Hydropower Project is a 21 MW run-of-river hydropower facility located in Okhaldhunga and Solukhumbu districts, Koshi Province. The project harnesses the hydrological potential of Malun Khola to generate reliable, clean, and renewable electricity for integration into Nepal’s national grid.",
id:1
  },
  {
question: "2.Who is the project developer?",
answer:"The project is being developed by Aayu Malun Hydropower Pvt. Ltd., a professionally managed private company with extensive experience in hydropower planning, construction, and project execution. The company is supported by seasoned technical experts, established contractors, and national financial institutions.",
id:2
  },
  {
question: "3. What is the scheduled completion timeline?",
answer:"The project’s Required Commercial Operation Date (RCOD) is 11 September 2025. Civil, hydro-mechanical, and electro-mechanical works are progressing in accordance with the approved implementation schedule, with several components already completed and others in advanced stages of construction.",
id:3
  },
  {
question: "4. What are the key technical specifications of the project?",
answer:`Key technical parameters include:
Installed Capacity: 21 MW
Turbine Type: Horizontal Pelton (3 units)
Net Head: 524.1 meters
Design Discharge: 4.52 m³/s
Headrace Tunnel Length: 1,903.14 meters
Penstock Length: 1,656.30 meters
Transmission Line: 132 kV, 18 km (Tingla Substation) 

These components are designed in accordance with international standards and Nepal Electricity Authority (NEA) requirements.`,
id:4
  },
  {
question: " 5. How does the project contribute to local development and national energy security?",
answer:` The project significantly enhances regional socio-economic development through employment generation, improved access infrastructure, and local service engagement. At the national level, it contributes approximately 112.58 GWh of clean energy annually, supporting energy security, reducing import dependency, and advancing Nepal’s renewable energy targets.`,
id:5
  },
]





  // State to manage which FAQ item is currently open/expanded
  const [openId, setOpenId] = useState(null);

  // Function to toggle the open state of an FAQ item
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
            {data?.map((item) => (
              <div key={item.id} className="border-b border-gray-300 py-6">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex justify-between cursor-pointer items-center w-full text-left text-gray-900 focus:outline-none"
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="text-xl md:text-2xl ">{item.question}</span>
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
                  // Note: max-h-[200px] is a safe estimate for average answer length.
                  // For very long answers, you might need a larger max-h value.
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