
import { cookies } from 'next/headers';
import SidebarMenu from './Sidebar';
import toast from 'react-hot-toast';



export default async function SidebarParent() {


 const cookieStore = await cookies(); 

const token= cookieStore.get('token')?.value; 

 const BASE_API = process.env.BASE_API;

  let loggedInUserData = [];
  // let error = null;


  // try {
  //   const response = await fetch(`${BASE_API}/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) { 
  //    return null;
  //   }

  //   loggedInUserData = await response.json();
  //   // console.log(loggedInUserData)

  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

const userData = loggedInUserData;
// const userData = loggedInUserData?.data?.[0];


return (
<>
<SidebarMenu 
          tokeN={token} 
          userData={userData}
       
      /> 

</>
 );
}