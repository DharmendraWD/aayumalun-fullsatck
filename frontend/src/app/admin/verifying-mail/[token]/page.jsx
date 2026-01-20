import Link from 'next/link';
import React from 'react';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

async function verifyToken(token) {
  try {
    const res = await fetch(`${BASE_API}/admin/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Verification failed', error);
    return { success: false };
  }
}

export default async function VerifyMailPage(props) {
     const { params } = props;
  const awaitedParams = await params;
  const token = awaitedParams.token;
  const result = await verifyToken(token);

  return (


<div className="relative h-screen bg-gray-50 overflow-hidden ">
    <div
        className="absolute pointer-events-none top-20 left-2 lg:w-[500px] w-[200px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
    </div>
    <div
        className="absolute pointer-events-none top-20 right-32 lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
    </div>
    <div
        className="hidden xl:block absolute pointer-events-none bottom-10 left-32 lg:w-[500px] w-[200px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div
        className="absolute pointer-events-none bottom-10 right-52 lg:w-[500px] w-[200px] z-[-1] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
     <div className="w-full gap-x-2 flex justify-center items-center">
  <div
    className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"
  ></div>
  <div
    className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
  ></div>
  <div
    className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
  ></div>
</div>

             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            

            {result?.success == true
                  ? '✅ Email Verified Successfully. You Can Proceed To Login Now.'
              : result?.message}
          </h2>
              {
            result?.success == true ?
           <Link href="/admin/login" className="flex w-[120px] mx-auto mt-10 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</Link> :  <Link href="/admin/login" className="flex w-[120px] mx-auto mt-10 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Register Again</Link>
          }

        </div>

 
    </div>
</div>
  );
}

      