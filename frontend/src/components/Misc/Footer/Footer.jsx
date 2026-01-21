// components/AppFooter.jsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaInstagram, FaTwitter, FaTelegramPlane, FaYoutube, FaFacebook } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const navigationLinks = [
  {
    title: "Main pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about-us" },
      { name: "Gallery", href: "#gallery" },
      { name: "Our Team", href: "#about-teams" },
      { name: "Contact", href: "#contact" },
    ]
  },
];

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch footer data
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/contents/other`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFooterData(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Social links from API data
  const socialLinks = [
    { icon: FaInstagram, href: footerData?.insta || '#', label: "Instagram" },
    { icon: FaTwitter, href: footerData?.twitter || '#', label: "Twitter" },
    { icon: FaTelegramPlane, href: footerData?.telegram || '#', label: "Telegram" },
    { icon: FaYoutube, href: footerData?.yt || '#', label: "YouTube" },
    { icon: FaFacebook, href: footerData?.fb || '#', label: "Facebook" },
  ];

  return (
    <footer data-aos="fade-up" className="bg-[#F9F9FF] pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-[1440px] relative">
        
        {/* Main Footer Grid - Links, Map, Contact Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 mb-12 gap-y-10 md:gap-x-8 lg:gap-x-12">
          
          {/* Navigation Link Columns */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="flex-col">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href ?? "#"} className="text-gray-600 hover:text-primary1 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start lg:mt-0 mt-8">
            <div className="relative w-full rounded-br-[95px] overflow-hidden rounded-lg shadow-md mb-4">
              <div className="col-span-1 lg:col-span-1 xl:col-span-1 lg:ml-auto lg:mt-0 mt-8"> 
                <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg flex flex-col space-y-4 w-full mx-auto lg:mx-0">
                  <p className="text-lg font-semibold text-gray-900 mb-2">Let's talk</p>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <MdEmail className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <a 
                      href={`mailto:${footerData?.email || "malunhydro@gmail.com"}`} 
                      className="text-gray-700 hover:text-primary1 transition-colors"
                    >
                      {footerData?.email || "malunhydro@gmail.com"}
                    </a>
                  </div>
                  
                  {/* Primary Phone */}
                  <div className="flex items-start">
                    <MdPhone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <a 
                      href={`tel:${footerData?.mobNo || "00977-1-4102710"}`} 
                      className="text-gray-700 hover:text-primary1 transition-colors"
                    >
                      {footerData?.mobNo || "00977-1-4102710"}
                    </a>
                  </div>

                  {/* Alternate Phone if available */}
                  {footerData?.mobNo2 && (
                    <div className="flex items-start">
                      <MdPhone className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                      <a 
                        href={`tel:${footerData.mobNo2}`} 
                        className="text-gray-700 hover:text-primary1 transition-colors"
                      >
                        {footerData.mobNo2}
                      </a>
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex items-start">
                    <MdLocationOn className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      {footerData?.address || "Anamnagar-29, Kathmandu, Nepal"}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-start space-x-3 mt-4 pt-4 border-t border-gray-200">
                    {socialLinks.map((social, index) => (
                      social.href !== '#' && (
                        <a 
                          key={index}
                          href={social.href} 
                          aria-label={social.label}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[var(--primary1)] text-white rounded-full w-8 h-8 flex items-center justify-center hover:text-primary1 transition-colors"
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      )
                    ))}
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div> 

        {/* Map Section */}
        <div data-aos="fade-up">
          <p className="text-gray-700 font-medium text-center mb-4 font-semibold">Our Location</p>
          <iframe 
            src={footerData?.location || "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2937.4258115014927!2d85.33114405547931!3d27.696843608898764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzQ4LjgiTiA4NcKwMTknNTIuMCJF!5e0!3m2!1sen!2snp!4v1765701598420!5m2!1sen!2snp"} 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location"
          ></iframe>
        </div>

        {/* Copyright Section */}
        <div data-aos="fade-up" className="text-center pt-8 mt-12 border-t border-gray-200">
          <p className="text-gray-500 text-sm font-semibold">
            {footerData?.copyright || "@Copyrights Aayumalun"}
          </p>
          <p className="text-gray-500 text-[12px]">
            Developed by {footerData?.developedby || "Aayusoft Tech"}
          </p>
        </div>

      </div>
    </footer>
  );
}