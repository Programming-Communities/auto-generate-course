import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FcPuzzle } from "react-icons/fc";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { ImageKitProvider, IKUpload } from 'imagekitio-next';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs/db'; // Database connection import karo

// Authentication setup
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function CourseBasicInfo({ course, refreshData }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.png'); // Default image
  const [isUploading, setIsUploading] = useState(false); // Uploading state

  // Page load par courseBanner fetch karo
  useEffect(() => {
    const fetchCourseBanner = async () => {
      try {
        const result = await db
          .select({ courseBanner: CourseList.courseBanner })
          .from(CourseList)
          .where(eq(CourseList.id, course.id));

        if (result[0]?.courseBanner) {
          setImageUrl(result[0].courseBanner); // Database se image URL set karo
        }
      } catch (error) {
        console.error("Failed to fetch course banner:", error);
      }
    };

    fetchCourseBanner();
  }, [course.id]); // course.id change hone par fetch karo

  // Handle successful upload
  const onSuccess = async (response) => {
    console.log("Upload success:", response);
    setImageUrl(response.url); // Set the uploaded image URL
    setIsUploading(false); // Uploading complete

    // Database mein courseBanner update karo
    try {
      await db
        .update(CourseList)
        .set({ courseBanner: response.url }) // ImageKit se mila hua URL
        .where(eq(CourseList.id, course.id)); // Specific course ko target karo

      console.log("Database updated successfully!");
      refreshData(true); // Course data refresh karo
    } catch (error) {
      console.error("Database update failed:", error);
    }
  };

  // Handle upload error
  const onError = (error) => {
    console.error("Upload error:", error);
    setIsUploading(false); // Uploading failed
  };

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>
            {course?.courseOutput?.course?.name || "Updating the course, please wait..."}
            <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />
          </h2>
          <p className='text-sm text-gray-400 mt-3'>
            {course?.courseOutput?.course?.description || "Almost there, loading the description..."}
          </p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'>
            <FcPuzzle />
            {course?.courseOutput?.course?.category}
          </h2>
          <Button className='w-full mt-5'>Start</Button>
        </div>
        <div className="relative">
          {/* Image Container */}
          <div className="relative w-full h-[250px] rounded-xl overflow-hidden cursor-pointer">
            <Image
              src={imageUrl}
              width={300}
              height={300}
              alt="Course Banner" // Add alt text
              priority // Add priority for LCP
              className='w-full h-full object-cover'
            />

            {/* Hidden IKUpload Input */}
            <ImageKitProvider
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticator={authenticator}
            >
              <IKUpload
                id="upload-image"
                fileName={`course-${Date.now()}.jpg`}
                onError={onError}
                onSuccess={onSuccess}
                validationmaxfilesize={5000000} // Lowercase
                validationallowedextensions={["jpg", "jpeg", "png"]} // Lowercase
                className="hidden" // Hide the input
              />
            </ImageKitProvider>

            {/* Overlay for Clickable Image */}
            <label
              htmlFor="upload-image"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
            >
              <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-all duration-300">
                Upload Image
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;





// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { FcPuzzle } from "react-icons/fc";
// import EditCourseBasicInfo from './EditCourseBasicInfo';


// function CourseBasicInfo({ course, refreshData }) {

//   const [selectedFile, setSelectedFile] = useState();
//   // Corrected function name
//   const onFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(URL.createObjectURL(file));
//     const fileName=Data.now()+'.jpg'
//     const storageRef=ref(Storage,'ai-image',fileName)
    


//   };

//   return (
//     <div className='p-10 border rounded-xl shadow-sm mt-5'>
//       <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//         <div>
//           <h2 className='font-bold text-3xl'>
//             {course?.courseOutput?.course?.name || "Updating the course, please wait..."}
//             <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />
//           </h2>
//           <p className='text-sm text-gray-400 mt-3'>
//             {course?.courseOutput?.course?.description || "Almost there, loading the description..."}
//           </p>
//           <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'>
//             <FcPuzzle />
//             {course?.courseOutput?.course?.category}
//           </h2>
//           <Button className='w-full mt-5'>Start</Button>
//         </div>
//         <div>
//           <label htmlFor="upload-image">
//             <Image
//               src={selectedFile ? selectedFile : '/placeholder.png'}
//               width={300}
//               height={300}
//               alt="Course Image"
//               className='w-full rounded-xl h-[250px] object-cover cursor-pointer'
//             />
//           </label>
//           <input
//             type="file"
//             id="upload-image"
//             className='opacity-0'
//             onChange={onFileChange} // Use the correct handler
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CourseBasicInfo;


