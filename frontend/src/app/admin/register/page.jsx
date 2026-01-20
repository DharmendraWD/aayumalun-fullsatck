"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../../../public/img/logof.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const page = () => {
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);


    const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

        try {
      const res = await fetch(`${BASE_API}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
        // credentials: 'include', // optional: for cookies if backend sets them
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

      toast.success('Signup successful!');
      setTimeout(() => router.push('/admin/verify-email'), 1500);


    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };


console.log(email, password, username)
  return (
  <div className="relative h-screen bg-gray-50">
    <div
        className="absolute top-20 left-2 lg:w-[500px] w-[200px] h-[500px] pointer-events-none bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
    </div>
    <div
        className="absolute top-20 right-32 lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
    </div>
    <div
        className="hidden xl:block absolute bottom-10 left-32 z-[-1] lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div
        className="absolute bottom-10 right-52 lg:w-[500px] w-[200px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div className="flex relative z-[9999] min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image className="mx-auto w-auto"
            width={300}
            height={300}
                    src={logo} alt=" Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a New Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             
                <Link href="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login ?
                    </Link>
                    </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-[12px]">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Username</label>
                        <div className="mt-[10px] mb-[6px]">
                            <input 
                            id="username"
                             name="username"
                             value={username}
                              type="text"
                               autoComplete="username"
                                required
                          onChange={(e) => setUsername(e.target.value)}

                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <div className="mt-[10px] mb-[6px]">
                            <input id="email" name="email" type="email" autoComplete="email" required value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    

                                      <div className="relative mt-[10px] mb-[6px]">
                                  <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name='password'
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                  >
                                    {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                                  </button>
                                </div> 
                                      <div className="relative mt-[10px] mb-[25px]">
                                  <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="Cpassword"
                                    name='Cpassword'
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 text-gray-900 py-2 placeholder-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={Cpassword}
                                    onChange={(e) => setCPassword(e.target.value)}
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                  >
                                    {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
                                  </button>
                                </div> 
                    </div>


                    <div>
                     <button
  type="submit"
  onClick={handleSubmit}
  disabled={loading}
  className={`flex cursor-pointer w-full justify-center rounded-md border border-transparent 
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
    py-2 px-4 text-sm font-medium text-white shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
>
  {loading ? 'Loading...' : 'Sign in'}
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