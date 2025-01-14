"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useContext } from "react"; // Import useContext here
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiSquares2X2 />,
    },
    {
      id: 2, // Unique id
      name: "Topic & Description",
      icon: <HiLightBulb />,
    },
    {
      id: 3, // Unique id
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  /**
   * Used to check Next Button Enable or Disable Status
   * **/
  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCouresLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT = `
    Generate a Course Tutorial on Following
    Detail With Field as Course,
    Description, Along with Chapter Name,
    About, Duration:
    Category: ${userCourseInput?.category},
    Topic: ${userCourseInput?.topic},
    Level: ${userCourseInput?.level},
    Duration: ${userCourseInput?.duration},
    NoOf Chapters: ${userCourseInput?.noOfChapter}, in JSON format.
    `;
    const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, Topic: ${userCourseInput?.topic}, Level: ${userCourseInput?.level}, Duration: ${userCourseInput?.duration}, NoOf Chapters: ${userCourseInput?.noOfChapter}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()));
    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(result.response.text()));
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    var id = uuid4(); //course id
    setLoading(true);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    });
    console.log("Finish");

    setLoading(false);
    router.replace("/create-course/" + id);
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-2xl text-primary font font-medium">
          Create Course
        </h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white
                  ${activeIndex >= index && "bg-primary"}`}
                >
                  {item.icon}
                </div>
                <h3 className="hidden md:block md:text-sm">{item.name}</h3>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-200
                  ${activeIndex - 1 >= index && "bg-primary"}
                  `}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div></div>
      <div className="px-10  md:px-20 lg:px-44 mt-10">
        {/* component */}
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}

        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            varian="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => GenerateCouresLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
