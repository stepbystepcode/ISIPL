import { useState } from 'react'
import CourseSchedule from "@/components/CourseSchedule"
import CourseDetailCard from "@/components/CourseDetailCard"
import HomeworkCard from "@/components/HomeworkCard"
import ChatCard from "@/components/ChatCard"
interface Course {
    name: string;
    color: string;
  }
export const Assistant = () => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8">
            <CourseSchedule onSelectCourse={setSelectedCourse} />
            {selectedCourse?<CourseDetailCard course={selectedCourse} />:<div></div>}
            <HomeworkCard />
            <ChatCard />
        </div>
    )
}