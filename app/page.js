// 'use client'; // Add this at the top
// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";

// // Authentication setup
// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
// const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// const authenticator = async () => {
//   try {
//     const response = await fetch("http://localhost:3000/api/auth");

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
//     const { signature, expire, token } = data;
//     return { signature, expire, token };
//   } catch (error) {
//     throw new Error(`Authentication request failed: ${error.message}`);
//   }
// };

// export default function Home() {
//   // State to hold the uploaded image URL
//   const [imageUrl, setImageUrl] = useState("");

//   // Handle successful upload
//   const onSuccess = (response) => {
//     console.log("Upload success:", response);
//     setImageUrl(response.url); // Set the uploaded image URL to state
//   };

//   // Handle upload error
//   const onError = (error) => {
//     console.error("Upload error:", error);
//   };

//   return (
//     <div className="App">
//       <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
//         <div>
//           <h2>Upload an Image</h2>
//           {/* IKUpload component for uploading images */}
//           <IKUpload 
//             onError={onError} 
//             onSuccess={onSuccess} 
//             validationMaxFileSize={5000000} // Max file size (in bytes)
//             validationAllowedExtensions={["jpg", "jpeg", "png"]} // Allowed file extensions
//           />
          
//           {/* Display uploaded image if available */}
//           {imageUrl && (
//             <div>
//               <h3>Uploaded Image:</h3>
//               <IKImage src={imageUrl} width="400" height="400" alt="Uploaded Image" />
//             </div>
//           )}
//         </div>
//       </ImageKitProvider>
//     </div>
//   );
// }





import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
    </div>
  );
}
