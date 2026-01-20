

"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../../../public/img/logof.png'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';


const page = () => {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState('');
    const router = useRouter();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${BASE_API}/admin/forgot-password`,
        {
          email,
        },

      );


      if (!res.data.ok) {
         setMessage(res.data.message);
         setIsLoading(false);
        return;
      }

      setMessage(res.data.message)
      setTimeout(() => {
        router.push('/admin/verify-otp/'+email);
      }, 3000);
    } catch (error) {
     
      setMessage(error.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };







  return (
  <div className="relative h-screen bg-gray-50 overflow-hidden">
    <div
        className="absolute pointer-events-none top-20  left-2 lg:w-[500px] w-[200px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
    </div>
    <div
        className="absolute pointer-events-none  top-20 right-32  lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
    </div>
    <div
        className="hidden xl:block absolute pointer-events-none lg:w-[500px] w-[200px] bottom-10 pointer-events-none left-32  h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div
        className="absolute pointer-events-none bottom-10 right-52 lg:w-[500px] w-[200px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

                       <Link href={"/admin/login"}>
            <Image className="mx-auto w-auto"
            width={300}
            height={300}
                    src={logo} alt=" Company"/>
           </Link>
            <h2 className="mt-6 text-center text-1xl font-bold tracking-tight text-gray-900">Enter your registered email, An OTP will be sent to Verify weather it's you.
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             
                <Link href="/admin/dashboard" className="font-medium text-indigo-600 z-50 relative hover:text-indigo-500">Go to Dashboard Instead
                    </Link>
                    </p>

                           <p className="mt-2 text-center text-sm">
              
         
              {
                message ?  <span className="text-gray-500">{message}</span> : ""
              }
            
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-[12px]">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-1">
                            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required=""
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                     disabled={isLoading}
                                className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit
</button>
                    </div>
                </form>

                
            </div>
        </div>
    </div>
</div>
  )
}

export default page