import React from 'react'

const VerifyEmail = () => {
  return (
  

<div className="relative h-screen bg-gray-50 overflow-hidden">
    <div
        className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob">
    </div>
    <div
        className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000">
    </div>
    <div
        className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div
        className="absolute bottom-10 right-52 w-[500px] z-[-1] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000">
    </div>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
     
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">✅ Check Your Email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
             
                We've sent you an email to verify your account. Please check your inbox and click the verification link.
                    </p>
        </div>

 
    </div>
</div>
  )
}

export default VerifyEmail


