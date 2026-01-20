import Delelet from "./Delelet";
import PopupModal from "./Popup";

const page = async () => {
  const BASE_API = process.env.BASE_API;
  const BASE_CONTENT = process.env.BASE_CONTENT_URL;

  let gallaryData = [];
  let error = null;

  try {
    const response = await fetch(`${BASE_API}/contents/upload/clients`, {
    });

    if (!response.ok) {
      error = "Something went wrong.";
      throw new Error("Failed to fetch data");
    }

    gallaryData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (  
    <>
      <div className="mt-[30px]">
        <h1 className="text-xl bg-[#3a4351] px-6 rounded py-4 mx-4 adminCardTextClr font-medium">
          Client Section
        </h1>

        <div className="px-2 grid grid-cols-1 min-h-[80vh] sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
          {gallaryData?.data?.length > 0 ? (
            gallaryData.data.map((client, index) => (
              <div className=" transform transition-transform duration-300 hover:scale-105"  key={index}>
               <div
               
                className=""
              >
                {client.image ? (
                  <div className="flex items-center justify-center relative flex-col cardBg m-2.5 overflow-hidden rounded-md h-80">
                      <Delelet delPath={client.id} />
                    <img
                      src={`${BASE_CONTENT}/uploads/clients/${client.image}`}
                      alt={`gallery-${index}`}
                      className="mx-auto max-h-[200pxpx] max-w-[200px] object-contain rounded-md"
                    />
                    <p className="text-sm mx-auto px-4 mt-2 text-slate-500 uppercase">
                     {index + 1}
                    </p>
                  </div>
                ) : (
                 <div className="min-h-screen flex items-center justify-center">
                   <h1 className="text-sm text-center mt-[20px] font-semibold text-slate-500 uppercase">
                    No Data Found
                  </h1>
                 </div>
                )}
              </div>
            </div>
            ))
          ) : (
            <div className="min-h-[90vh]  flex items-center justify-center">
                   <h1 className="text-sm  max-h-[100px] absolute top-1/2  inset-0  text-center mt-[20px] font-semibold text-slate-500 uppercase">
                    No Data Found
                  </h1>
                 </div>
          )}
        </div>

         {gallaryData?.data && <PopupModal gallaryData={gallaryData.data} />}
      </div>
    </>
  );
};

export default page;
