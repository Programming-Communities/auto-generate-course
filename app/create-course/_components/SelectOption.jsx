import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  // Function to handle input change
  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        
        {/* Difficulty Level */}
        <div>
          <label className="text-sm">Difficulty Level</label>
          <Select
            defaultValue={userCourseInput?.level}  // Moved defaultValue here
            onValueChange={(value) => handleInputChange('level', value)}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Duration */}
        <div>
          <label className="text-sm">Course Duration</label>
          <Select
            defaultValue={userCourseInput?.duration} // Corrected the defaultValue to match the field
            onValueChange={(value) => handleInputChange('duration', value)}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More Than 3 Hours">More Than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Video */}
        <div>
          <label className="text-sm">Add Video</label>
          <Select
            defaultValue={userCourseInput?.displayVideo}  // Corrected to userCourseInput
            onValueChange={(value) => handleInputChange('displayVideo', value)}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* No of Chapters */}
        <div>
          <label className="text-sm">No of Chapters</label>
          <Input
            type="number"
            className="h-14 text-lg"
            defaultValue={userCourseInput?.noOfChapter} // Corrected to userCourseInput
            onChange={(event) => handleInputChange('noOfChapter', event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;



// import React, { useContext } from "react"; // Added useContext import


// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { UserInputContext } from "@/app/_context/UserInputContext";


// function SelectOption() {

//   const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
//   const handleInputChange=(fieldName,value)=>{
//       setUserCourseInput(prev=>({
//         ...prev,
//         [fieldName]:value
//       }))

//     }
//   return (
//     <div className="px-10 md:px-20 lg:px-44">
//       <div className="grid grid-cols-2 gap-10">
//         <div>
//           <label className="text-sm">Difficulty Level</label>
//           <Select onValueChange={(value)=>handleInputChange('level',value)}>
//             defaultValue={userCourseInput?.level}
//             <SelectTrigger className="">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Beginner">Beginner</SelectItem>
//               <SelectItem value="Intermediate">Intermediate</SelectItem>
//               <SelectItem value="Advance">Advance</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">Course Duration</label>
//           <Select
//           defaultValue={userCourseInput?.level}
//           onValueChange={(value)=>handleInputChange('duration',value)}>
//             <SelectTrigger className="">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="1 Hour">1 Hour</SelectItem>
//               <SelectItem value="2 Hours">2 Hours</SelectItem>
//               <SelectItem value="More Than 3 Hours">More Than 3 Hours</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">Add Video</label>
//           <Select
//           defaultValue={UserCourseInput?.displayVideo}
//           onValueChange={(value)=>handleInputChange('displayVideo',value)}>
//             <SelectTrigger className="">
//               <SelectValue placeholder="Select" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Yes">Yes</SelectItem>
//               <SelectItem value="No">No</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm">No of Chapters</label>
//           <Input type="number" className='h-14 text-lg'
//           defaultValue={UserCourseInput?.noOfChapter}
//           onChange={(event)=>handleInputChange('noOfChapter',event.target.value)}

//           />
        
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SelectOption;
