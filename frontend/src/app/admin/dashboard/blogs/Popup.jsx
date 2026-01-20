

"use client"
import React, {  useEffect, useState } from 'react'
import img from "../../../../../public/img/logof.png"
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import toast from 'react-hot-toast';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import RichTextEditor from './RichTextEditor';
import HTMLReactParser from 'html-react-parser';



const Popup = () => {

  const editor = useRef(null);
  const [content, setContent] = useState("");




    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
    const [isFaqAddPopupOpen, setisFaqAddPopupOpen] = useState(null);

    const [title, settitle] = useState(" ");
    const [desc, setdesc] = useState(" ");
    const [author, setauthor] = useState(" ");
    const [image, setimage] = useState(" ");
    const [preview, setPreview] = useState(null);

    
    const [blogToBeDeleted, setBlogToBeDeleted] = useState(null);
    const [yesNo, setYesNo] = useState(null);
    const [blog, setBlog] = useState([])   
  const [selectedPara, setselectedPara] = useState(null);
  const BASE_CONTENT = process.env.NEXT_PUBLIC_BASE_CONTENT;

  const editorRef = useRef(null);

  const handleSubmit = () => {
    const content = editorRef.current.getContent();
    console.log('Blog content:', content);
    // send `content` to your API
  };



  const handleShowMorePara = (para) => {
    setConfirmDeleteIndex(true);
    setselectedPara(para);
  };
    // yes no for delete 
    const HandleYesNo = (blogId) => {
        setBlogToBeDeleted(blogId);
        setYesNo(true);
      };
    
    // show all blog by fetching from api 
const getBlog = async () =>{
    try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/blog`)
    const data = await res.json()
    setBlog(data.blog)
    
    if(!res.ok){
        throw new Error(data.message)
    }
       
    console.log(data)
    }catch(err){
        console.log(err)
    }
}
useEffect(() => {
    getBlog()
    // claeanup function
}, [])


// delete blog 
const deleteBlog = async (blogId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/blog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: blogId }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }
  toast.success("Blog deleted successfully");
      setBlog((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
        toast.error("Failed to delete blog");
      console.error("Error deleting blog:", error);
    }
  };

console.log(content)

//   add blog 
const addFaq = async (e) => {
    e.preventDefault()
  // Get HTML content from editor
  const htmlContent = editorRef.current.getContent();

    if(!title || !htmlContent || !author || !image) return toast.error("Please fill all fields");

      const formData = new FormData();
formData.append("title", title);
formData.append("desc", htmlContent);
formData.append("author", author);
formData.append("image", image);
    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/homepage/blog`, {
        method: "POST",
          body: formData,
      });
  

      if (!res.ok) {
          toast.error("Failed to add blog");
        throw new Error("Failed to add blog");
      }
const data = await res.json();

setBlog((prev) => [...prev, data.data])
  toast.success("Blog added successfully");
  
      // Clear form
    settitle("");
    editorRef.current.getContent(''); // Clear editor
    setauthor("");
    setimage(null);
    setPreview(null);
    setisFaqAddPopupOpen(false);


 
    } catch (error) {
        toast.error("Failed to add blog");
      console.error("Error adding blog:", error);
    }
}

const handleImage = (e) => {
  const file = e.target.files[0];
  setimage(file);
  setPreview(URL.createObjectURL(file));  // <-- creates preview URL
};


  return (
    <div>
        {
    isFaqAddPopupOpen && (
        <div className='absolute top-0 z-[9] bg-gray-500 w-full px-[10%] py-[1%] rounded-xl'>
    <form action="" method="PUT">
           <div className="grid grid-cols-1">
             {/* Input */}
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Title
              </label>
              <textarea 
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Type..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            {/* <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Description
              </label>
              <textarea
                type="text"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder="Type..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div> */}


<div className="border p-4 rounded-lg">
  <RichTextEditor ref={editorRef} />
    </div>

            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Author
              </label>
              <textarea
                type="text"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
                placeholder="Type..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="mb-6">
              <label className="block popupTextClr text-sm font-medium mb-2">
             Image
              </label>
              {/* {
  images?.length >= 10 ?   <h1 className="text-red-300 mb-2 text-xl text-center">Only 10 Images are Allowed. Please Remove Some Images</h1>    :  */}
   <input
        type="file"
        multiple
        accept="image/*"
      onChange={handleImage}
        className="mb-4"
      />
{/* } */}
            </div>
            <div className="mb-6">
{preview && <img src={preview} alt="preview" className="w-40 mt-3" />}

            </div>

          
         <div className='flex justify-center items-center gap-4'>
             <button  onClick={addFaq} className='bg-green-300 text-gray-700 px-8 rounded-xl cursor-pointer py-2 w-fit'>Add</button>
          <button  className='bg-red-300 text-gray-700 px-8 rounded-xl cursor-pointer  py-2 w-fit' onClick={() => setisFaqAddPopupOpen(null)}>Close</button>
         </div>
           </div>
</form>
</div>
    )
}
    <div>
          <div className="text-xl bg-[#3a4351] px-6 rounded py-4 mt
          mb-2 mx-4 adminCardTextClr font-medium flex w-full items-center justify-between">
    <h1>Manage Blogs</h1>
<span
onClick={() => setisFaqAddPopupOpen(true)}
className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-white text-white">
    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 ease"></span>
    <span className="relative text-white transition duration-300 group-hover:text-indigo-600 ease">+</span>
</span>
    </div><div>
<div className="relative flex items-center justify-center font-nunito text-slate-600">
    <section className=" w-full mx-4">

{yesNo !== null && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Delete Image?</h2>
      <p className="mb-4 text-gray-400">Are you sure you want to delete this image?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setYesNo(null)}
          className="px-4 py-2 cursor-pointer border rounded-md border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          No
        </button>

        {/* Now you can safely access the image using the stored index */}
        <button
          onClick={() => deleteBlog(blogToBeDeleted) && setYesNo(null)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
)}

{

blog?.map((blog) => (
           <ul
            key={blog._id}
            className="w-full relative bg-[#172135] lg:p-8 px-2 py-8  rounded-lg gap-3 flex items-start justify-center  flex-col sm:flex-row relative overflow-hidden mb-10">
            <li className="pr-4 overflow-hidden grow flex flex-col lg:items-start items-center ">
                <span className="absolute slide-in-top bg-gradient-to-r from-[#6c73ff] to-[#676bbe] text-white lg:px-24 px-4 py-[4px] rounded-br-lg left-0 top-0 text-sm">Author: {blog?.author}</span>
                <h2 className="mb-3 text-xl text-gray-300  font-[600] mt-3">{blog?.title}</h2>
                <div className=" text-lg multiline-ellipsis text-gray-400">
                   {HTMLReactParser(blog?.desc)} 
                </div>
                    <p className='text-[12px] cursor-pointer text-gray-300 hover:text-white transform transtition duration-100' onClick={() => handleShowMorePara(HTMLReactParser(blog?.desc) )}>Show More...</p>

<span className='  absolute right-[12px] bottom-[12px] flex items-center gap-2'>
    <span className='flex items-center gap-1 bg-gray-300 cursor-pointer hover:bg-gray-200 hover:scale-105 px-2 py-1 rounded'
    onClick={() => HandleYesNo(blog._id)}
    >
        <MdDeleteForever className='text-l text-red-500' />
        <p className='text-sm text-red-500 hover:text-red-400 transform transtition duration-100 lg:block hidden'>Delete Blog</p>
    </span>
<MdOutlineDateRange />
                    <p className='text-[12px] text-gray-300 hover:text-white transform transtition duration-100'> {blog.date.slice(0, 10)}</p>
</span>
<img src={`${BASE_CONTENT}/${blog?.image}`} className='w-[200px] mt-4 mb-4 bg-[#101828] p-2 rounded-xl' alt="" />
            </li>
{/* //// */}
        </ul> 
))
}
    {/* ✅ Popup moved OUTSIDE map */}
{confirmDeleteIndex !== null && (
  <div className="fixed top-[0] inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-gray-800 absolute lg:right-[3%] right-[12px]  top-[50px] mt-4 mb-4 p-6 rounded-lg shadow-lg lg:w-[75%] w-[95%]">
        <div className='mb-4 text-sm lg:max-h-[500px] max-h-[300px] my-scroll overflow-y-scroll text-gray-400'>

        {selectedPara} 
        </div>
      <div className="flex justify-end gap-3">
        <button
            onClick={()=> setConfirmDeleteIndex(null)}
          className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </section>



</div>
</div>

    </div>
    </div>
  )
}

export default Popup