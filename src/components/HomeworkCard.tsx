import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle } from "lucide-react"

type Homework = {
  id: number;
  task: string;
  completed: boolean;
}

export default function HomeworkCard() {
  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: 1, task: "完成数学作业", completed: false },
    { id: 2, task: "阅读历史课本第三章", completed: true },
    { id: 3, task: "准备科学实验报告", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addHomework = () => {
    if (newTask.trim() !== "") {
      setHomeworks([...homeworks, { id: Date.now(), task: newTask, completed: false }]);
      setNewTask("");
    }
  }

  const toggleHomework = (id: number) => {
    setHomeworks(homeworks.map(hw => 
      hw.id === id ? { ...hw, completed: !hw.completed } : hw
    ));
  }

  const currentDate = new Date().toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long' 
  });

  return (
    <Card className="w-full h-[340px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">今日作业</CardTitle>
        <p className="text-center text-muted-foreground">{currentDate}</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px] pr-4">
          {homeworks.map((homework) => (
            <div key={homework.id} className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id={`homework-${homework.id}`} 
                checked={homework.completed}
                onCheckedChange={() => toggleHomework(homework.id)}
              />
              <Label 
                htmlFor={`homework-${homework.id}`}
                className={`flex-grow ${homework.completed ? 'line-through text-muted-foreground' : ''}`}
              >
                {homework.task}
              </Label>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); addHomework(); }} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="添加新作业..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">添加作业</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}