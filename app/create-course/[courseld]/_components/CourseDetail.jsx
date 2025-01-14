import React from "react";
import { HiOutlineClock } from "react-icons/hi2";
import { PiChartBarDuotone } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { MdPlayCircleOutline } from "react-icons/md";


function CourseDetail({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <PiChartBarDuotone className="text-4xl text-primary" />
          <div>
            <h2 className="text-xm text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg"> {course?.level}</h2>
          </div>
        </div>

        <div className="flex gap-2">
          <HiOutlineClock  className="text-4xl text-primary" />
          <div>
            <h2 className="text-xm text-gray-500">Duration</h2>
        
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.duration || ""}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <IoBookOutline    className="text-4xl text-primary" />
          <div>
            <h2 className="text-xm text-gray-500">No Of Chapters</h2>
            <h2 className="font-medium text-lg"> {course?.courseOutput?.course?.numberOfChapters || ""}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <MdPlayCircleOutline className="text-4xl text-primary" />
          <div>
            <h2 className="text-xm text-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg"> {course?.includeVideo ? "Yes" : "No"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
