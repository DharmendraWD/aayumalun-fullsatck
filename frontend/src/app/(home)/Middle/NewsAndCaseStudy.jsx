import Image from "next/image";
import Link from "next/link";

// Individual Card Component
const CaseStudyCard = ({ study }) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Strip HTML tags from content for description
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  };

  return (
    <div className="bg-white rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="w-full h-auto overflow-hidden p-4">
        <Image
          width={300}
          height={300}
          src={`${process.env.BASE_CONTENT_URL}uploads/blogs/${study.cover_image}`}
          alt={study.title}
          className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
          unoptimized
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
          {study.title}
        </h3>

        {/* Author and Date Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          {study.author_name && (
            <span className="font-medium">By {study.author_name}</span>
          )}
          {study.created_at && (
            <span>• {formatDate(study.created_at)}</span>
          )}
        </div>

        {/* Description - using stripped HTML content */}
        <div className="text-base multiline-ellipsis font-semibold text-gray-600 mb-4 flex-grow">
          {stripHtml(study.content)}
        </div>

        <Link
          href={`/blog/${study.id}`}
          className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

// Main App Component
export default async function NewsAndCaseStudy() {
  let data = [];

  try {
    const apiUrl = `${process.env.BASE_API}/contents/blogs`;
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData && Array.isArray(responseData.data)) {
      data = responseData.data;
    } else if (Array.isArray(responseData)) {
      data = responseData;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    data = [];
  }

  if (data.length === 0) {
    return (
      <div
        data-aos="fade-up"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
            News and Case Studies
          </h2>
          <div className="text-center py-10">
            <p>No blogs found at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header - Centered */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-12 lg:mb-16">
          News and Case Studies
        </h2>

        {/* Responsive Grid Container */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </div>
  );
}