import FAQclient from "./FAQclient";

;



const FAQSection = async () => {
  let response = await fetch(`${process.env.BASE_API}/contents/faqs`);
  if (!response.ok) {
    console.error("Failed to fetch FAQs:", response.status);
  }
  let data = await response.json();





  if (data?.length === 0) {
    return (
      <section data-aos="fade-up" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div className="lg:pr-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Some questions, <br />some answers.
              </h2>
              <p className="text-lg font-semibold text-gray-700 max-w-sm mx-auto lg:mx-0">
                No FAQs available at the moment.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
<>
    <FAQclient data={data?.data}/>
</>
  );
};

export default FAQSection;