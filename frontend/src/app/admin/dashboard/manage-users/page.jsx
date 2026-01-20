import React from 'react'
import { cookies } from "next/headers";
import ManageUser from './manageUser';


const page = async () => {
         const cookieStore = await cookies(); 
  
  const tokeN = cookieStore.get('tokeN')?.value; 

const BASE_API = process.env.BASE_API;

  let loggedInUserData = [];
  let error = null;


  try {
    const response = await fetch(`${BASE_API}/me`, {
      headers: {
        Authorization: `Bearer ${tokeN}`,
      },
    });

    if (!response.ok) {
      error = "Something went wrong.";
      throw new Error("Failed to fetch data");
    }

    loggedInUserData = await response.json();
    // console.log(loggedInUserData)

  } catch (error) {
    console.error("Error fetching data:", error);
  }

const userData = loggedInUserData?.data?.[0];

  return (
    <div>
       {
        userData?.isAdmin ?  <ManageUser></ManageUser> : <div className="text-center min-h-[80vh] text-2xl flex justify-center items-center"><h1>You are not Supposed to Access this Page. Only Super Admin Can Access. </h1></div>
       }
    </div>
  )
}

export default page