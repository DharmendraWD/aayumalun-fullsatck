// components/ContactForm.jsx
"use client";

import React, { useEffect, useState } from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdCheckCircle } from 'react-icons/md';
import { FaLinkedinIn, FaTwitter, FaTelegramPlane, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const [contactData, setContactData] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch contact data
    const getContactData = async () => {
        try {
            setIsLoadingData(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contents/other`);
            const data = await res.json();
            
            if (data.success && data?.data) {
                setContactData(data?.data[0] || {});
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to load contact information');
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        getContactData();
    }, []);

    // Effect to hide success message after 3 seconds
    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    // Social links from API data
    const socialLinks = [
        { icon: FaLinkedinIn, href: contactData?.linkedin || '#', label: "LinkedIn" },
        { icon: FaTwitter, href: contactData?.twitter || '#', label: "Twitter" },
        { icon: FaTelegramPlane, href: contactData?.telegram || '#', label: "Telegram" },
        { icon: FaInstagram, href: contactData?.insta || '#', label: "Instagram" },
        { icon: FaYoutube, href: contactData?.yt || '#', label: "YouTube" },
        { icon: FaFacebook, href: contactData?.fb || '#', label: "Facebook" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper component for contact details
    const ContactItem = ({ Icon, title, content, isLink = false }) => (
        <div className="flex items-start mb-6">
            <div className={`p-3 rounded-full bg-[var(--primary1)] bg-opacity-10 text-white mr-4 flex-shrink-0`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xl font-semibold text-gray-900">{title}</p>
                {isLink ? (
                    <a 
                        href={title === "My email" ? `mailto:${content}` : content} 
                        className="text-gray-600 hover:text-primary1 transition-colors"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        {content}
                    </a>
                ) : (
                    <p className="text-gray-600">{content}</p>
                )}
            </div>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all the required fields.");
            setIsSubmitting(false);
            return;
        }
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contents/clientmessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.message || 'Something went wrong');
            }
            
            // Show custom success message
            setShowSuccessMessage(true);
            
            // Clear form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-12 md:py-24" id='contact'>
            {/* Custom Success Message Overlay */}
            {showSuccessMessage && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center glass-effect">
                                        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 transform transition-all duration-300 scale-100 animate-fade-in">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                                    <MdCheckCircle className="w-12 h-12 text-green-600" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#2cc54c] mb-2">
                                                    Message Sent Successfully!
                                                </h3>
                                                <p className="text-[#2a90ff] mb-6">
                                                    Awww, We Shall Contact You Soon!
                                                </p>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-green-500 h-2 rounded-full transition-all duration-3000 ease-linear"
                                                        style={{ width: '100%' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
            
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="grid grid-cols-1 justify-center lg:grid-cols-2 gap-10 lg:gap-20 items-start" style={{justifyItems:'center'}}>
                    
                    {/* Left Column: Text and Contact Details */}
                    <div className="lg:pr-10 max-w-[500px] flex flex-col justify-between sm:p-10 p-8 hover:shadow-xl h-full" data-aos="zoom-in-left">
                        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            {isLoadingData ? 'Get In Touch With Us' : (contactData?.heading || 'Get In Touch With Us')}
                        </h2>
                        <p className="text-lg text-gray-700 mb-12 max-w-md">
                            {isLoadingData ? 'Loading contact information...' : (contactData?.desc || 'We would love to hear from you. Get in touch with us for any queries or collaborations.')}
                        </p>

                        {/* Contact Items */}
                        <div className="space-y-4 mb-10">
                            <ContactItem 
                                Icon={MdEmail} 
                                title="Email" 
                                content={contactData?.email || "malunhydro@gmail.com"} 
                                isLink
                            />
                            <ContactItem 
                                Icon={MdPhone} 
                                title="Phone us" 
                                content={contactData?.mobNo || `+977-1-4102710`}
                                isLink={false}
                            />
                            {contactData?.mobNo2 && (
                                <ContactItem 
                                    Icon={MdPhone} 
                                    title="Alternate Phone" 
                                    content={contactData.mobNo2}
                                    isLink={false}
                                />
                            )}
                            <ContactItem 
                                Icon={MdLocationOn} 
                                title="Location" 
                                content={contactData?.address || "Anamnagar-29, Kathmandu, Nepal"} 
                                isLink={false}
                            />
                        </div>

                        {/* Footer Social Icons */}
                        <div className="flex space-x-4 pt-4 border-t border-gray-200">
                            {socialLinks.map((social, index) => (
                                social.href !== '#' && (
                                    <a
                                        key={index}
                                        href={social.href} 
                                        aria-label={social.label}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-primary1 transition-colors"
                                    >
                                        <social.icon className="w-6 h-6" />
                                    </a>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div data-aos="zoom-in-right" className="p-8 max-w-[500px] sm:p-10 h-full hover:shadow-2xl bg-white rounded-[30px] shadow-xl w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-gray-800 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary1 focus:border-primary1 transition-colors"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-gray-800 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary1 focus:border-primary1 transition-colors"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Message Input */}
                            <div>
                                <label htmlFor="message" className="block text-gray-800 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="I want to collaborate..."
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary1 focus:border-primary1 transition-colors resize-none"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cursor-pointer py-3 bg-[var(--primary1)] text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Add CSS for animation */}
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </section>
    );
};

export default ContactForm;