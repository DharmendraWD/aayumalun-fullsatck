


import PopupModal from "./Popup";
const page = async () => {
    const BASE_API = process.env.BASE_API;
    const BASE_CONTENT = process.env.BASE_CONTENT;
    let missionData = [];
    let error = null;



    try {
        const response = await fetch(`${BASE_API}/homepage/mission`, {
        });

        
        if (!response.ok) {
          error = "Something went wrong.";
          throw new Error('Failed to fetch data');
        }
        missionData = await response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
    }



    return (

<>
{/* <div>{BASE_API}</div>
<PopupModal /> */}

<div className=" mt-[30px]">
     <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
     Mission Section
    </h1>
{
  error ?      <h1 className="text-xl text-red-500 bg-[#3a4351] px-6 rounded py-4 mx-4 text-center font-medium">
     {error}
    </h1>: ""
}


<div className="flex flex-col px-4">
  {/* 1st  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-1 px-1">
    <span className="text-l adminCardTextClr">
     Upper Heading and Title
    </span>
  </div>
  
  <div className="px-4">
    <h5 className=" adminCardTextValueClr text-sm">
     Title:  {missionData?.mission ? missionData?.mission[0]?.upper?.title : ""}
    </h5>
    <h5 className=" adminCardTextValueClr text-sm">
     Desc:  {missionData?.mission ? missionData?.mission[0]?.upper?.desc : ""}
    </h5>
  </div>
</div>
  {/* 2nd  */}
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-1 px-1">
    <span className="text-l adminCardTextClr">
     Mission 1
    </span>
  </div>
  
  <div className="px-4">
    <h5 className=" adminCardTextValueClr text-sm">
     Title:  {missionData?.mission ? missionData?.mission[0]?.box1?.title : ""}
    </h5>
    <h5 className=" adminCardTextValueClr text-sm">
     Desc:  {missionData?.mission ? missionData?.mission[0]?.box1?.desc : ""}
    </h5>

  </div>
</div>
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-1 px-1">
    <span className="text-l adminCardTextClr">
     Mission 2
    </span>
  </div>
  
  <div className="px-4">
    <h5 className=" adminCardTextValueClr text-sm">
     Title:  {missionData?.mission ? missionData?.mission[0]?.box2?.title : ""}
    </h5>
    <h5 className=" adminCardTextValueClr text-sm">
     Desc:  {missionData?.mission ? missionData?.mission[0]?.box2?.desc : ""}
    </h5>

  </div>
</div>
<div className="relative  transform transition-transform duration-300 hover:scale-105 flex flex-col h-fit my-6 cardBg shadow-sm  rounded-lg ">
  <div className="mx-3 mb-0  pt-3 pb-1 px-1">
    <span className="text-l adminCardTextClr">
     Mission 3
    </span>
  </div>
  
  <div className="px-4">
    <h5 className=" adminCardTextValueClr text-sm">
     Title:  {missionData?.mission ? missionData?.mission[0]?.box3?.title : ""}
    </h5>
    <h5 className=" adminCardTextValueClr text-sm">
     Desc:  {missionData?.mission ? missionData?.mission[0]?.box3?.desc : ""}
    </h5>

  </div>
</div>


</div>
</div>

{/* http://localhost:8000/uploads/images-1762787494977-894233015.png */}

{/* 6 th */}
<div className="mt-[100px]">
   <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
      Mission Images
    </h1>
<div className=" mx-1 mt-4">
  {missionData?.mission && missionData?.mission?.map((mission, i) => (
    <div
      key={i}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4"
    >
        {/* ✅ Loop through all images */}
        {mission.images && mission.images.length > 0 ? (
          mission.images.map((img, index) => (
            <div key={index} className="flex transform transition-transform duration-300 hover:scale-105 flex-col cardBg justify-center items-center m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
            <img
          
              src={img.startsWith("http") ? img : `${BASE_CONTENT}${img}`}
              alt={`mission-image-${index}`}
              className="w-full h-full object-cover rounded-md"
          
            />
              <p
      className="text-sm mt-[20px] font-semibold text-slate-500 uppercase">
mission Image {index + 1}
    </p>
    </div>
          ))
        ) : (
         

            <h1
      className="text-sm text-center mt-[20px] font-semibold text-slate-500 uppercase">
      No any Image Found.
    </h1>

        )}

    </div>
  ))}
  </div>
</div>

 <div className="mt-6">
  {missionData?.mission && <PopupModal missionData={missionData} />}

</div>  
</>



    )
}

export default page