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

function EditCourseBasicInfo({ course, refreshData }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [notification, setNotification] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (course?.courseOutput?.course) {
      setFormData({
        name: course.courseOutput.course.name || "",
        description: course.courseOutput.course.description || "",
      });
    }
  }, [course]);

  const onUpdateHandler = async () => {
    if (!CourseList || !course?.id) {
      console.error("CourseList or course id is missing.");
      setNotification("Update failed. Missing required data.");
      return;
    }

    if (!formData.name.trim() || !formData.description.trim()) {
      setNotification("Name and description cannot be empty.");
      return;
    }

    setIsLoading(true);

    try {
      const updatedCourseOutput = {
        ...course.courseOutput,
        course: {
          ...course.courseOutput.course,
          name: formData.name,
          description: formData.description,
        },
      };

      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      if (result.length > 0) {
        setNotification("Course updated successfully!");
        setIsDialogOpen(false);
        refreshData();
      } else {
        setNotification("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      setNotification("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              aria-label="Course Title"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="course-description">Description</label>
            <Textarea
              id="course-description"
              aria-label="Course Description"
              className="h-40"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          {notification && (
            <div
              className={`mt-3 p-2 rounded ${
                notification.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {notification}
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={onUpdateHandler} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;

// import React, { useState, useEffect } from "react";
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
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { DialogClose } from "@radix-ui/react-dialog";
// import { Button } from "@/components/ui/button";
// import { db } from "@/configs/db";
// import { CourseList } from "@/configs/schema";
// import { eq } from "drizzle-orm";

// function EditCourseBasicInfo({ course, refreshData }) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [notification, setNotification] = useState(""); // State for notification message
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open/close state

//   // Populate the fields when the component mounts or course changes
//   useEffect(() => {
//     const courseData = course?.courseOutput?.course;
//     if (courseData) {
//       setName(courseData.name || "Default Name");
//       setDescription(courseData.description || "Default Description");
//     }
//   }, [course]);

//   const onUpdateHandler = async () => {
//     try {
//       if (!CourseList || !course?.id) {
//         console.error("CourseList or course id is missing.");
//         return;
//       }

//       // Update the courseOutput with the new name and description
//       const updatedCourseOutput = {
//         ...course.courseOutput,
//         course: {
//           ...course.courseOutput.course,
//           name,
//           description,
//         },
//       };

//       const result = await db
//         .update(CourseList)
//         .set({ courseOutput: updatedCourseOutput })
//         .where(eq(CourseList.id, course.id))
//         .returning({ id: CourseList.id });

//       if (result.length > 0) {
//         console.log(`Update successful for ID: ${result[0].id}`);
//         setNotification("Course updated successfully!"); // Set notification message
//         setIsDialogOpen(false); // Close dialog after successful update
//         refreshData(); // Trigger the function to refresh the data dynamically
//       } else {
//         console.warn("Update failed: No records were updated.");
//         setNotification("Update failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Update Error:", error);
//       setNotification("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         {/* Ensure DialogTrigger doesn't wrap a button directly */}
//         <DialogTrigger asChild>
//           <div>
//             <Button>
//               <FaRegEdit />
//             </Button>
//           </div>
//         </DialogTrigger>

//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Course Title & Description</DialogTitle>
//           </DialogHeader>
//           <DialogDescription>
//             <div className="mt-3">
//               <label htmlFor="course-title">Course Title</label>
//               <Input
//                 id="course-title"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mt-3">
//               <label htmlFor="course-description">Description</label>
//               <Textarea
//                 id="course-description"
//                 className="h-40"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             {/* Display the notification message directly */}
//             {notification && <div className="mt-3 text-green-500">{notification}</div>}
//           </DialogDescription>
//           <DialogFooter>
//             <Button onClick={onUpdateHandler}>Update</Button>
//             <DialogClose asChild>
//               <Button variant="secondary">Cancel</Button>
//             </DialogClose>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// export default EditCourseBasicInfo;

