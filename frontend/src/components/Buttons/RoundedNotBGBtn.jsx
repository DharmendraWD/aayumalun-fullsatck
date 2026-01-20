import Link from 'next/link'
import React from 'react'

const RoundedNotBGBtn = ({label, link="#"}) => {
  return (
     <Link href={link} className="px-6 text-center py-3 text-lg font-medium text-[var(--primary3)] border border-[var(--primary4)] cursor-pointer rounded-[50px] hover:text-white shadow-md bg-white hover:bg-[var(--primary4)] transition duration-300 transform hover:scale-105">
               {label ?? " "}
              </Link>
  )
}

export default RoundedNotBGBtn