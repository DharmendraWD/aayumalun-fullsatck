'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../../../public/img/logof.png';
import Link from 'next/link';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ChangePasswordClient({ tokeN }) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNPassword] = useState('');
  const [confirmPassword, setCPassword] = useState('');
  const [oldPassword, setOPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.put(
        `${BASE_API}/changePassword`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: tokeN ? `Bearer ${tokeN}` : '',
          },
        }
      );

      if (!res.data.success) {
        setError(res.data.message || 'Something went wrong');
         setSuccess(res.data.success);
         setIsLoading(false);
        return;
      }

      console.log(res.data)
      setTimeout(() => {
        router.push('/admin/login');
      }, 2000);
      setSuccess(res.data.success);
      setError(res.data.message)
    } catch (error) {
     
      setError(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <h2>{email}</h2> */}
      <div className="relative h-screen bg-gray-50 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-2 lg:w-[500px] w-[200px]  h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-32 lg:w-[500px] w-[200px]  h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000"></div>

        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image className="mx-auto w-auto" width={300} height={300} src={logo} alt="Company" />
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Change Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <Link href="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Go to Login
              </Link>
            </p>

            <p className="mt-2 text-center text-sm">
                {success}
         
              {
                success == false ? <span className="text-red-500">{error}</span> : <span className="text-green-500">{error}</span>
              }
            
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleChangePassword}>
                {[ 
                  { id: 'oldPassword', label: 'Old Password', value: oldPassword, setter: setOPassword },
                  { id: 'newPassword', label: 'New Password', value: newPassword, setter: setNPassword },
                  { id: 'confirmPassword', label: 'Confirm Password', value: confirmPassword, setter: setCPassword }
                ].map((field) => (
                  <div className="relative mt-1" key={field.id}>
                    <input
                    disabled={isLoading}
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
                error.includes("successfully") ?  
                <Link href="/admin/dashboard" className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                
                    
                   
                  
             <b className='mr-1'>Successfully </b>  Changesd go to Dashboard
                  </Link> :       <button
                  onClick={handleChangePassword}
                  disabled={isLoading}

                  type="submit" className={`w-full text-white bg-[var(--successBg)]  relative hover:bg-[var(--successBg2)] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isLoading ? 'bg-gray-400 pointer-events-none' : ''}`}>
                    
  {
    isLoading && (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )
  }

                    
                  {isLoading ? 'Logging in...' : 'Login'}

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
