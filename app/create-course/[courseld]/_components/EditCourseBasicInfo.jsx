import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Populate the fields when the component mounts or course changes
  useEffect(() => {
    const courseData = course?.courseOutput?.course;
    if (courseData) {
      setName(courseData.name || "Default Name");
      setDescription(courseData.description || "Default Description");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    try {
      if (!CourseList || !course?.id) {
        console.error("CourseList or course id is missing.");
        return;
      }

      // Update the courseOutput with the new name and description
      const updatedCourseOutput = {
        ...course.courseOutput,
        course: {
          ...course.courseOutput.course,
          name,
          description,
        },
      };

      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      if (result.length > 0) {
        console.log(`Update successful for ID: ${result[0].id}`);
      } else {
        console.warn("Update failed: No records were updated.");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-3">
            <label htmlFor="course-title">Course Title</label>
            <Input
              id="course-title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="course-description">Description</label>
            <Textarea
              id="course-description"
              className="h-40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onUpdateHandler}>Update</Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;




// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FaRegEdit } from "react-icons/fa";
// import { Textarea } from '@/components/ui/textarea';
// import { Input } from '@/components/ui/input'; // Import Input component
// import { DialogClose } from '@radix-ui/react-dialog';
// import { Button } from '@/components/ui/button';


// // Assuming db and CourseList are properly defined elsewhere
// import { db, CourseList } from "@/configs/db"; // Adjust import based on your actual project structure
// import { eq } from "drizzle-orm"; // Import Drizzle functions

// function EditCourseBasicInfo({ course }) {
//   // Initialize state with course data or default empty string
//   const [name, setName] = useState();
//   const [description, setDescription] = useState();

//   useEffect(()=>{
//     setName(course.courseOutput.course.name);
//     setDescription(course.courseOutput.course.description);
//   },[course]);

//   const onUpdateHandler=async()=>{
//     course.courseOutput.course.name=name;
//     course.courseOutput.course.description=description;
//     const result=await db.update(CourseList).set({
//       courseOutput:course?.courseOutput
//     }).where(eq(CourseList?.Id,course?.Id))
//     .returning({id:CourseList.id});
    
  
 

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <FaRegEdit />
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Course Title & Description</DialogTitle>
//           <DialogDescription>
//             <div className="mt-3">
//               <label>Course Title</label>
//               <Input defaultValue={course?.courseOutput?.course?.name}
//               onChange={(event) => setName(event?.target.value)}
//               />
//             </div>
//             <div>
//               <label>Description</label>
//               <Textarea
//                 className="h-40" defaultValue={course?.courseOutput?.course?.description}
//                 onChange={(event) => setDescription(event?.target.value)}
//                 />
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <DialogClose>
//             <Button onClick={onUpdateHandler}>Update</Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default EditCourseBasicInfo;
