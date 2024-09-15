import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Link, MessageSquare, Heart } from 'lucide-react'

interface Course {
  name: string;
  color: string;
}

interface CourseDetailCardProps {
  course: Course | null;
}

// 资源标签页内容
const ResourcesTab = () => (
  <div className="space-y-4">
    {[
      { name: "数据库系统概念.pdf", type: "PDF", size: "15 MB" },
      { name: "SQL基础教程.pptx", type: "PPTX", size: "5 MB" },
      { name: "实验指导书.docx", type: "DOCX", size: "2 MB" },
      { name: "数据库设计实践", type: "Link", url: "https://example.com/db-design" },
    ].map((resource, index) => (
      <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
        <div className="flex items-center space-x-2">
            {resource.type==="Link"&&<Link className="w-5 h-5 text-blue-500" />}
            {resource.type!=="Link"&&
          <FileText className="w-5 h-5 text-blue-500" />}
          <span>{resource.name}</span>
        </div>
        <div className="text-sm text-gray-500">
          {resource.type === "Link" ? (
            <a href={resource.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              <Link className="w-4 h-4 inline mr-1" />
              打开链接
            </a>
          ) : (
            `${resource.type} · ${resource.size}`
          )}
        </div>
      </div>
    ))}
  </div>
)

// 日志标签页内容
const LogsTab = () => (
  <div className="space-y-4">
    {[
      { date: "2024-06-15", content: "更新了第7章节的课件，新增了几个实际案例。" },
      { date: "2024-06-10", content: "发布了新的实验任务：设计一个简单的图书管理系统数据库。" },
      { date: "2024-06-05", content: "上传了数据库索引优化的补充材料。" },
      { date: "2024-06-01", content: "课程大纲更新，调整了部分章节的顺序。" },
    ].map((log, index) => (
      <div key={index} className="border-l-2 border-blue-500 pl-4">
        <div className="text-sm text-gray-500">{log.date}</div>
        <div>{log.content}</div>
      </div>
    ))}
  </div>
)

// 讨论标签页内容
const DiscussionsTab = () => (
  <div className="space-y-4 max-h-96 overflow-y-auto">
    {[
      { author: "张三", avatar: "https://avatar.iran.liara.run/public", content: "关于第三范式的理解，我有一些疑问...", replies: 5, likes: 12 },
      { author: "李四", avatar: "https://avatar.iran.liara.run/public", content: "数据库事务的ACID特性有什么实际应用？", replies: 3, likes: 8 },
      { author: "王五", avatar: "https://avatar.iran.liara.run/public", content: "有人可以分享一下关系代数的学习方法吗？", replies: 7, likes: 15 },
    ].map((discussion, index) => (
      <div key={index} className="p-4 bg-gray-100 rounded">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar>
            <AvatarImage src={`${discussion.avatar}?${index}`} alt={discussion.author} />
            <AvatarFallback>{discussion.author[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{discussion.author}</span>
        </div>
        <p>{discussion.content}</p>
        <div className="mt-2 text-sm text-gray-500">
          <span className="mr-4"><MessageSquare className="w-4 h-4 inline mr-1" />{discussion.replies}</span>
          <span><Heart className="w-4 h-4 inline mr-1" />{discussion.likes}</span>
        </div>
      </div>
    ))}
  </div>
)

// 成员标签页内容
const MembersTab = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { name: "张三", avatar: "https://avatar.iran.liara.run/public", role: "学生" },
      { name: "李四", avatar: "https://avatar.iran.liara.run/public", role: "学生" },
      { name: "王五", avatar: "https://avatar.iran.liara.run/public", role: "学生" },
      { name: "赵六", avatar: "https://avatar.iran.liara.run/public", role: "助教" },
      { name: "钱七", avatar: "https://avatar.iran.liara.run/public", role: "学生" },
      { name: "孙八", avatar: "https://avatar.iran.liara.run/public", role: "学生" },
    ].map((member, index) => (
      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-100 rounded">
        <Avatar>
          <AvatarImage src={`${member.avatar}?${index}`} alt={member.name} />
          <AvatarFallback>{member.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{member.name}</div>
          <div className="text-sm text-gray-500">{member.role}</div>
        </div>
      </div>
    ))}
  </div>
)

export default function Component({ course }: CourseDetailCardProps) {
  const [activeTab, setActiveTab] = useState("resources")
  const [courseDetails, setCourseDetails] = useState<Course | null>(null)

  useEffect(() => {
    if (course) {
      // Fetch or set course details based on the selected course
      setCourseDetails(course)
    }
  }, [course])

  return (
    <Card className="w-full max-w-3xl max-h-[552px] overflow-y-hidden">
      <CardHeader>
        <CardTitle>{courseDetails ? courseDetails.name : "请选择课程"}</CardTitle>
        <CardDescription>{courseDetails ? `${new Date().getFullYear()}年${new Date().getMonth() < 8 ? "春季" : "秋季"}学期` : ""}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resources">资源</TabsTrigger>
            <TabsTrigger value="logs">日志</TabsTrigger>
            <TabsTrigger value="discussions">讨论</TabsTrigger>
            <TabsTrigger value="members">成员</TabsTrigger>
          </TabsList>
          <TabsContent value="resources"><ResourcesTab /></TabsContent>
          <TabsContent value="logs"><LogsTab /></TabsContent>
          <TabsContent value="discussions"><DiscussionsTab /></TabsContent>
          <TabsContent value="members"><MembersTab /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}