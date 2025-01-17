'use client'
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';


function CourseLayout({params}) {
  const {user}=useUser();
  const [course,setCourse]=useState([]);
  useEffect(()=>{
    params&&GetCourse();
  },[params,user])
  
  const GetCourse=async()=>{
    const result=await db.select().from(CourseList)
    .where(and(eq(CourseList.courseId,params?.courseld)),
    eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress) )
    
    setCourse(result[0]);
    console.log(result);
  }

  const GenerateChapterContent=()=>{
    const chapters=course?.courseOutput?.course?.chapters;
    chapters.forEach((chapter,index)=>{
      // const PROMPT=`Explain The concept in Detail on Topic: '${course?.name}', Chapter:${chapter?.name} in JSON Format with list of array with field as title, description in detail, Code Example(HTML Code Format) it applicable`
      // console.log(PROMPT);
    })
  }
  return (
    <div className='mt-10 px-u md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData= {()=>GetCourse()}/>

      {/* Course Details */}

      <CourseDetail course={course}/>

      {/* List of Lesson */}

      <ChapterList course={course} refreshData= {()=>GetCourse()} />

        <Button onClick={GenerateChapterContent} className=' mt-5 my-20 font-bold text-xl'>Generate Course Content</Button>

    </div>
  )
}

export default CourseLayout