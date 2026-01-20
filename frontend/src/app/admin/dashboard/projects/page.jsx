import Delelet from "./Delelet";
// import PopupModal from "./Popup";
import { cookies } from "next/headers";
import PopupModal from "./Popup";
import PopupForHeadingPara from "./PopupForHeadingPara";


const page = async () => {

     const cookieStore = await cookies(); 
  
  const tokeN = cookieStore.get('tokeN')?.value; 
  
  const BASE_API = process.env.BASE_API;
  const BASE_CONTENT = process.env.BASE_CONTENT_URL;

  let gallaryData = [];
    let ParaAndTitleOfCards = [];

  let error = null;



  try {
    const response = await fetch(`${BASE_API}/contents/project/projectcard`, {
    });

    if (!response.ok) {
      error = "Something went wrong.";
      throw new Error("Failed to fetch data");
    }
    
    gallaryData = await response.json();
    console.log(gallaryData.data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // ----------
    try {
    const resp = await fetch(`${BASE_API}/contents/paraHeadingOfCards`,);
    if (!resp.ok) throw new Error('Failed to fetch cards data');
    ParaAndTitleOfCards = await resp.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }


  return (  
    <>
      <div className="mt-[30px]">
        <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
          Project Section
        </h1>

        <div className="px-2 grid grid-cols-1 sm:grid-cols-2  gap-6 pt-4">
          {gallaryData?.data?.length > 0 ? (
            gallaryData.data.map((client, index) => (
              <div className=" transform transition-transform duration-300 hover:scale-105"  key={index}>
               <div
               
                className=""
              >
            
                  <div className="flex relative flex-col cardBg m-2.5 overflow-hidden rounded-md h-80">
                      <Delelet delPath={client.id} tokeN={tokeN}/>
        
                    <img
                      src={`${BASE_CONTENT}/uploads/projectcard/${client.image}`}
                      alt={`gallery-${index}`}
                      className="w-[250px] p-4 mx-auto object-cover rounded-md"
                    />
                    <p className="text-sm min-h-[50px] px-4 mt-2 text-gray-300 ">
                    URL :{client.link}
                    </p>
                  </div>
         
              </div>
            </div>
            ))
          ) : (
             <div className="min-h-[90vh]  flex items-center justify-center">
                   <h1 className="text-sm  max-h-[100px] absolute top-1/2  inset-0  text-center mt-[20px] font-semibold text-slate-500 uppercase">
                    No Data Found.
                  </h1>
                 </div>
          )}
        </div>

          <PopupModal tokeN={tokeN}/>

          <PopupForHeadingPara ParaAndTitleOfCards={ParaAndTitleOfCards} tokeN={tokeN}/>
      </div>
    </>
  );
};

export default page;
