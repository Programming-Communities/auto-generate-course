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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState(""); // State for notification message
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open/close state

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
        setNotification("Course updated successfully!"); // Set notification message
        setIsDialogOpen(false); // Close dialog after successful update
        refreshData(); // Trigger the function to refresh the data dynamically
      } else {
        console.warn("Update failed: No records were updated.");
        setNotification("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Ensure DialogTrigger doesn't wrap a button directly */}
        <DialogTrigger asChild>
          <div>
            <Button>
              <FaRegEdit />
            </Button>
          </div>
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
            {/* Display the notification message directly */}
            {notification && <div className="mt-3 text-green-500">{notification}</div>}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={onUpdateHandler}>Update</Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditCourseBasicInfo;

