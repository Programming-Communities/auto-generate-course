import React, { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditChapters({ course, index, refreshData }) {
  const Chapters = course?.courseOutput?.course?.chapters;
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [notification, setNotification] = useState(""); // State for notification message
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open/close state

  useEffect(() => {
    // Set the chapter name and description when the course data is loaded
    setName(Chapters[index]?.name);
    setAbout(Chapters[index]?.about);
  }, [course, index]);

  const onUpdateHandler = async () => {
    // Update chapter details
    course.courseOutput.course.chapters[index].name = name;
    course.courseOutput.course.chapters[index].about = about;

    const updatedCourseOutput = {
      ...course.courseOutput,
      course: {
        ...course.courseOutput.course,
        chapters: [...course.courseOutput.course.chapters],
      },
    };

    try {
      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      console.log("Update result:", result);
      refreshData();


      // Set the success notification
      setNotification("Chapter updated successfully!");

      // Close the dialog after the update
      setTimeout(() => {
        setIsDialogOpen(false);
        // Trigger refresh data without a full page reload
        if (refreshData) {
          refreshData(true); // Assuming refreshData is passed from the parent component
        }
      }, 2000); // Delay to show notification before closing dialog

    } catch (error) {
      console.error("Update Error:", error);
      setNotification("Error updating chapter.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label htmlFor="course-title">Course Title</label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="course-description">Description</label>
              <Textarea
                className="h-40"
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>
            {/* Display the notification message */}
            {notification && <div className="mt-3 text-green-500">{notification}</div>}
          </DialogDescription>
        </DialogHeader>
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

export default EditChapters;




