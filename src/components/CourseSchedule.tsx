import { Card } from "@/components/ui/card"
interface Course {
  name: string;
  color: string;
}
interface CourseScheduleProps {
  onSelectCourse: (course: Course | null) => void;
}
export default function CourseSchedule({ onSelectCourse }:CourseScheduleProps) {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const periods = [
    { number: 1, time: '8:00\n9:50' },
    { number: 2, time: '10:10\n12:00' },
    { number: 3, time: '14:30\n16:20' },
    { number: 4, time: '16:40\n18:30' },
    { number: 5, time: '19:30\n21:20' },
  ]
  const courses = [
    { name: '计算机网络', color: 'blue' },
    { name: '数据结构', color: 'green' },
    { name: '操作系统', color: 'yellow' },
    { name: '数据库原理', color: 'purple' },
    { name: '软件工程', color: 'red' },
    { name: '计算机组成原理', color: 'indigo' },
    { name: '算法设计与分析', color: 'pink' },
    { name: '人工智能导论', color: 'teal' },
  ]

  const schedule = [
    [null, courses[0], null, courses[1], null],
    [courses[2], null, courses[3], null, courses[7]],
    [null, courses[4], courses[0], courses[5], null],
    [courses[6], courses[1], null, courses[2], null],
    [courses[3], null, courses[5], null, courses[4]],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]
  return (
    <Card className="max-w-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100"></th>
                {days.map((day) => (
                  <th key={day} className="border p-2 bg-gray-100">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {periods.map((period, index) => (
                  <tr key={period.number} className={index === 2 || index === 4 ? "border-t-2 border-gray-400" : ""}>
                    <td className="border p-2 bg-gray-50 text-center">
                      <div className="font-bold">{period.number}</div>
                      <div className="text-xs text-gray-500">{period.time}</div>
                    </td>
                    {days.map((day, dayIndex) => (
                      <td key={`${day}-${period.number}`} className="border p-2 h-24 w-32">
                        {schedule[dayIndex][index] && (
                          <div className={`h-full w-full flex items-center cursor-pointer justify-center bg-${schedule[dayIndex][index].color}-100 rounded p-1`} onClick={() => onSelectCourse(schedule[dayIndex][index])}>
                            <span className={`text-[10px] font-medium text-center text-${schedule[dayIndex][index].color}-800`}>
                              {schedule[dayIndex][index].name}
                            </span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
    </Card>
  )
}