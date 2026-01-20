import React from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import PopupModal from './Popup';
import { cookies } from 'next/headers';

import noimg from "../../../../../public/noimg.jpg";
import Delelet from './Delelet';

// This is a Server Component by default in the 'app' directory
const ManageUser = async () => {
    const cookieStore = await cookies();
    const tokeN = cookieStore.get('tokeN')?.value; // Match your cookie name

    let userList = [];
    const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT_URL;

    try {
        const response = await fetch(`${BASE_API}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokeN}`,
                'Content-Type': 'application/json',
            },
            next: { revalidate: 10 } // Optional: refresh data every 10 seconds
        });
        
        const result = await response.json();
//   console.log(result)
        userList = result?.data || []; 

    } catch (error) {
        console.error("Fetch error:", error);
    }


    return (
        <div className="min-h-screen bg-transparent pb-10 pt-2 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-gray-200">All Users</h1>
                {/* Your Add Admin Button Modal */}
            </div>

            <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {userList?.map((user) => (
                    <div
                        key={user._id || user.id}
                        className="group relative rounded-2xl shadow-sm border border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col overflow-hidden bg-gray-800/40 backdrop-blur-md"
                    >
                        <Delelet delPath={user?.id} data={user} tokeN={tokeN} />
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                        <div className="relative -mt-12 flex justify-center">
                            <div className="relative h-24 w-24 rounded-full border-4 border-gray-700 shadow-md overflow-hidden bg-gray-600">
                                <Image
                                unoptimized
                                    // Use API image or a placeholder if null
                                    src={user?.image ? `${BASE_CONTENT}/uploads/user/${user?.image}` : noimg.src}
                                    alt={user?.fullName || 'User'}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />

                            </div>
                        </div>

                        <div className="px-6 py-4 text-center flex-grow">
                            <h3 className="text-xl font-bold text-pink-300 group-hover:text-white transition-colors">
                                {user?.fullName}
                            </h3>
                            <p className="text-sm font-medium text-indigo-400 mb-6 uppercase tracking-wider">
                                {user?.isAdmin ? 'Super Admin' : 'Admin'}
                            </p>

                            <div className="space-y-3 text-left">
                                <div className="flex items-center space-x-3 text-gray-300">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                                        <FaPhoneAlt size={12} />
                                    </div>
                                    <span className="text-sm">{user?.mobNo || 'No Number'}</span>
                                </div>

                                <div className="flex items-center space-x-3 text-gray-300">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-400">
                                        <FaEnvelope size={12} />
                                    </div>
                                    <span className="text-sm truncate">{user?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {userList.length === 0 && (
                <div className="text-center py-20 text-gray-400">No users found.</div>
            )}

            <div className="flex justify-center mt-8">
                <PopupModal tokeN={tokeN} />

            </div>
        </div>
    );
};

export default ManageUser;