'use client';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import LoadingDialog from '../_components/LoadingDialog';
import { GenerateChapterContent_AI } from '@/configs/AiModel';

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseld),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );

      setCourse(result[0]);
      console.log(result);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const GenerateChapterContent = async () => {
    setLoading(true); // Start loading

    const chapters = course?.courseOutput?.course?.chapters;

    if (!chapters || chapters.length === 0) {
      console.error('No chapters found.');
      setLoading(false); // Stop loading if no chapters
      return;
    }

    try {
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const PROMPT = `Explain The concept in Detail on Topic: '${course?.name}', Chapter:${chapter?.name} in JSON Format with list of array with field as title, description in detail, (Code field in <precode> Format) if applicable`;
        console.log(PROMPT);  

        if (index === 3) {
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result.response.text());

          // Generate Video URL (simulated)
          const videoUrl = `https://example.com/video/${chapter.name}`;
          console.log('Generated Video URL:', videoUrl);

          // Save Chapter Content + Video URL (simulated)
          console.log('Saving chapter content...');
        }
      }
    } catch (error) {
      console.error('Error generating chapter content:', error);
    } finally {
      setLoading(false); // Stop loading after the process
    }
  };

  return (
    <div className="mt-10 px-4 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* Loading Dialog */}
      <LoadingDialog loading={loading} />

      {/* Basic info */}
      <CourseBasicInfo course={course} refreshData={GetCourse} />

      {/* Course Details */}
      <CourseDetail course={course} />

      {/* List of Lessons */}
      <ChapterList course={course} refreshData={GetCourse} />

      {/* Generate Course Content Button */}
      <Button onClick={GenerateChapterContent} className="mt-5 my-20" disabled={loading}>
        {loading ? "Generating..." : "Generate Course Content"}
      </Button>
    </div>
  );
}

export default CourseLayout;

// 'use client'
// import { db } from '@/configs/db';
// import { CourseList } from '@/configs/schema';
// import { useUser } from '@clerk/nextjs';
// import { and, eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import CourseBasicInfo from './_components/CourseBasicInfo';
// import CourseDetail from './_components/CourseDetail';
// import ChapterList from './_components/ChapterList';
// import { Button } from '@/components/ui/button';
// import LoadingDialog from '../_components/LoadingDialog';
// import { GenerateChapterContent_AI } from '@/configs/AiModel';


// function CourseLayout({params}) {
//   const {user}=useUser();
//   const [course,setCourse]=useState([]);
//   const [loading,setLoading]=useState(false);
//   useEffect(()=>{
//     params&&GetCourse();
//   },[params,user])
  
//   const GetCourse=async()=>{
//     const result=await db.select().from(CourseList)
//     .where(and(eq(CourseList.courseId,params?.courseld)),
//     eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress) )
    
//     setCourse(result[0]);
//     console.log(result);
//   }

//   const GenerateChapterContent=()=>{
//     setLoading(true);
//     const chapters=course?.courseOutput?.course?.chapters;
//     chapters.forEach(async(chapter,index)=>{
//       const PROMPT=`Explain The concept in Detail on Topic: '${course?.name}', Chapter:${chapter?.name} in JSON Format with list of array with field as title, description in detail, (Code field in <precode> Format) it applicable`
//       console.log(PROMPT);
//       if(index==0){
//         try{
//           const result=await GenerateChapterContent_AI.sendMessage(PROMPT);
//           console.log(result.response.text());
//           // Generate Video URL

//           // Save Chapter Content + Video URL
//           setLoading(false);
//         }catch(e){
//           setLoading(false);
//           console.log(e);
//         }
//       }
//     })
//   }
//   return (
//     <div className='mt-10 px-u md:px-20 lg:px-44'>
//       <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      

//       <LoadingDialog loading={loading}   />

//       {/* Basic info */}
//       <CourseBasicInfo course={course} refreshData= {()=>GetCourse()}/>

//       {/* Course Details */}

//       <CourseDetail course={course}/>

//       {/* List of Lesson */}

//       <ChapterList course={course} refreshData= {()=>GetCourse()} />

//         <Button onClick={GenerateChapterContent} className=' mt-5 my-20'>Generate Course Content</Button>

//     </div>
//   )
// }

// export default CourseLayout