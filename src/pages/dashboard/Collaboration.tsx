import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Filter, 
  SortAsc, 
  Plus, 
  Search, 
  CheckCircle2, 
  Circle 
} from "lucide-react";

// 任务类型定义
type Task = {
  id: string;
  title: string;
  completed: boolean;
  owner: {
    name: string;
    avatar?: string;
  };
  startTime?: string;
  dueDate?: string;
  creator: {
    name: string;
    avatar?: string;
  };
};

// 示例任务数据
const tasks: Task[] = [
  {
    id: "1",
    title: "量子分布式：在各类场景的应用",
    completed: true,
    owner: { name: "李京", avatar: "" },
    creator: { name: "李京", avatar: "" },
  },
  {
    id: "2",
    title: "GPU版本重置用docker镜像配置和编译和部署",
    completed: true,
    owner: { name: "李京", avatar: "" },
    creator: { name: "李京", avatar: "" },
  },
  {
    id: "3",
    title: "gpu-version and push to GitHub",
    completed: true,
    owner: { name: "张荣源", avatar: "" },
    creator: { name: "李京", avatar: "" },
  },
  {
    id: "4",
    title: "cpu version and push to GitHub",
    completed: true,
    owner: { name: "李京", avatar: "" },
    creator: { name: "李京", avatar: "" },
  },
  {
    id: "5",
    title: "有时间去看看传统的cce链接，这个作一部分分解任务",
    completed: true,
    owner: { name: "G", avatar: "" },
    creator: { name: "宁国源", avatar: "" },
  },
  {
    id: "6",
    title: "热点一下vim，排AWQ迁移到vim中",
    completed: false,
    owner: { name: "李京", avatar: "" },
    creator: { name: "吕金鸿", avatar: "" },
  },
  {
    id: "7",
    title: "AWQ、BitsAndBytes int4量化，bf16的影响一遍，...",
    completed: false,
    owner: { name: "李京", avatar: "" },
    creator: { name: "吕金鸿", avatar: "" },
  },
  {
    id: "8",
    title: "探究一下vim支持的这几种量化方式方法区别",
    completed: false,
    owner: { name: "", avatar: "" },
    creator: { name: "吕金鸿", avatar: "" },
  },
  {
    id: "9",
    title: "lightLLM token/attention多流性能优化",
    completed: true,
    owner: { name: "G", avatar: "" },
    creator: { name: "吕金鸿", avatar: "" },
  },
  {
    id: "10",
    title: "TODO",
    completed: true,
    owner: { name: "李京", avatar: "" },
    creator: { name: "李京", avatar: "" },
  },
];

export const Collaboration = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"dueDate" | null>(null);
  const [filterCompleted, setFilterCompleted] = useState<boolean | null>(null);

  // 过滤和排序任务
  const filteredTasks = tasks.filter((task) => {
    // 按搜索查询过滤
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // 按完成状态过滤
    if (filterCompleted !== null && task.completed !== filterCompleted) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">任务</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> 新建任务
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="任务标题"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setFilterCompleted(null)}>
                <Filter className="mr-2 h-4 w-4" /> 所有任务
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setSortBy(sortBy === "dueDate" ? null : "dueDate")}>
                <SortAsc className="mr-2 h-4 w-4" /> 排序: 截止日期
              </Button>
              
              <div className="flex items-center gap-x-2">
                <Button variant="outline" size="sm" onClick={() => setFilterCompleted(true)}>
                  显示: 已完成
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFilterCompleted(false)}>
                  显示: 进行中
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>任务标题</TableHead>
              <TableHead className="w-[150px]">负责人</TableHead>
              <TableHead className="w-[150px]">开始时间</TableHead>
              <TableHead className="w-[150px]">截止日期</TableHead>
              <TableHead className="w-[150px]">创建者</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="flex items-center">
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  {task.owner.name && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        {task.owner.avatar ? (
                          <AvatarImage src={task.owner.avatar} alt={task.owner.name} />
                        ) : (
                          <AvatarFallback>{task.owner.name.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span>{task.owner.name}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{task.startTime || "-"}</TableCell>
                <TableCell>{task.dueDate || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      {task.creator.avatar ? (
                        <AvatarImage src={task.creator.avatar} alt={task.creator.name} />
                      ) : (
                        <AvatarFallback>{task.creator.name.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <span>{task.creator.name}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
