'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../../../../public/img/logof.png';
import Link from 'next/link';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ChangePasswordClient({ email, otp }) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNPassword] = useState('');
  const [confirmPassword, setCPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_API}/admin/reset-password/${encodeURIComponent(email)}`,
        {
          newPassword,
          confirmPassword,
          otp
        },
        
      );

      if (!res.data.success) {
        setMessage(res.data.message || 'Something went wrong');
         setIsLoading(false);
        return;
      }

      setTimeout(() => {
        router.push('/admin/login');
      }, 3000);
      setMessage(res.data.message);
    } catch (error) {
     
      setMessage(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <h2>{email} {otp}</h2> */}
      <div className="relative h-screen bg-gray-50 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-2 lg:w-[500px] w-[200px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-32 lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000"></div>

        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <Link href={"/admin/login"}>
            <Image className="mx-auto w-auto" width={300} height={300} src={logo} alt="Company" />
       
           </Link>
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link href="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Go to Login
              </Link>
            </p>

            <p className="mt-2 text-center text-gray-600 text-[20px]">
         {message}
            
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleChangePassword}>
                {[ 
        
                  { id: 'newPassword', label: 'New Password', value: newPassword, setter: setNPassword },
                  { id: 'confirmPassword', label: 'Confirm Password', value: confirmPassword, setter: setCPassword }
                ].map((field) => (
                  <div className="relative mt-1" key={field.id}>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id={field.id}
                      name={field.id}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder={`Enter ${field.label}`}
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ))}

                <div>


                    {
                message.includes("successfully") ?  
                <Link href="/admin/dashboard" className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                
                    
                   
                  
             <b className='mr-1 text-green-600'>Successfully </b>  Changed go to Dashboard
                  </Link> :    <button
                    type="submit"
                    className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={isLoading}
                  > 
                    {isLoading ? 'Loading...' : 'Change Password'}
                  </button>
              }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
