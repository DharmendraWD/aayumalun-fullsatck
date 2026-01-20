import Link from 'next/link'
import React from 'react'

const RoundedBgBtn = ({label, link="#"}) => {
  return (
      <Link  href={link}  className="px-6 text-center  py-3 text-lg font-medium text-white bg-[var(--primary3)] m-0 rounded-[50px] cursor-pointer shadow-md hover:bg-[var(--primary4)] transition duration-300 transform hover:scale-105">
                {label ?? " "}
              </Link>
  )
}

export default RoundedBgBtn