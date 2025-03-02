import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarIcon, PenLine, FileText } from "lucide-react"

export const Understanding = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [reflection, setReflection] = useState("")
    const [reflectionTitle, setReflectionTitle] = useState("")
    const [reflections, setReflections] = useState<{date: Date, title: string, content: string}[]>([])
    const [activeTab, setActiveTab] = useState("calendar")
    
    // Self-assessment questionnaire
    const [answers, setAnswers] = useState({
        planning: 0,
        monitoring: 0,
        evaluating: 0,
        adapting: 0,
        awareness: 0
    })

    const handleAnswerChange = (question: keyof typeof answers, value: number) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }))
    }

    const saveReflection = () => {
        if (!date || !reflection.trim() || !reflectionTitle.trim()) return
        
        setReflections(prev => [
            ...prev,
            {
                date: date,
                title: reflectionTitle,
                content: reflection
            }
        ])
        
        setReflection("")
        setReflectionTitle("")
    }
    
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date)
    }
    
    // Filter reflections for the selected date
    const filteredReflections = reflections.filter(
        r => date && r.date.toDateString() === date.toDateString()
    )

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">元认知思维</h1>
            
            <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        日历视图
                    </TabsTrigger>
                    <TabsTrigger value="reflection" className="flex items-center gap-2">
                        <PenLine className="h-4 w-4" />
                        记录反思
                    </TabsTrigger>
                    <TabsTrigger value="assessment" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        自评问卷
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="calendar" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>选择日期</CardTitle>
                                <CardDescription>查看或添加特定日期的反思</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border"
                                />
                            </CardContent>
                        </Card>
                        
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>{date ? formatDate(date) : "未选择日期"}</CardTitle>
                                <CardDescription>当日反思记录</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {filteredReflections.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredReflections.map((item, i) => (
                                            <div key={i} className="border p-4 rounded-md">
                                                <h3 className="font-medium text-lg">{item.title}</h3>
                                                <p className="mt-2 text-gray-600 whitespace-pre-line">{item.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 text-gray-500">
                                        当前日期没有反思记录
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setActiveTab("reflection")}
                                    className="w-full"
                                >
                                    添加反思
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>
                
                <TabsContent value="reflection">
                    <Card>
                        <CardHeader>
                            <CardTitle>记录反思</CardTitle>
                            <CardDescription>记录你的想法、学习体会和元认知反思</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">日期</Label>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                                    <span>{date ? formatDate(date) : "请选择日期"}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="title">标题</Label>
                                <Input 
                                    id="title" 
                                    placeholder="反思标题" 
                                    value={reflectionTitle}
                                    onChange={(e) => setReflectionTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reflection">反思内容</Label>
                                <Textarea 
                                    id="reflection" 
                                    placeholder="请记录你的元认知反思..." 
                                    className="min-h-[200px]"
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab("calendar")}>返回日历</Button>
                            <Button onClick={saveReflection}>保存反思</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                
                <TabsContent value="assessment">
                    <Card>
                        <CardHeader>
                            <CardTitle>元认知自评问卷</CardTitle>
                            <CardDescription>评估你的元认知能力水平</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">规划能力</h3>
                                    <p className="text-sm text-gray-500 mb-3">我在学习前能够制定合理的计划和目标</p>
                                    <div className="flex items-center space-x-2">
                                        {[1,2,3,4,5].map(val => (
                                            <Button
                                                key={val}
                                                variant={answers.planning === val ? "default" : "outline"}
                                                className="w-12 h-12"
                                                onClick={() => handleAnswerChange("planning", val)}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                                        <span>非常不同意</span>
                                        <span>非常同意</span>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">监控能力</h3>
                                    <p className="text-sm text-gray-500 mb-3">我能在学习过程中有效监控自己的进度和理解程度</p>
                                    <div className="flex items-center space-x-2">
                                        {[1,2,3,4,5].map(val => (
                                            <Button
                                                key={val}
                                                variant={answers.monitoring === val ? "default" : "outline"}
                                                className="w-12 h-12"
                                                onClick={() => handleAnswerChange("monitoring", val)}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                                        <span>非常不同意</span>
                                        <span>非常同意</span>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">评估能力</h3>
                                    <p className="text-sm text-gray-500 mb-3">我能对学习结果进行客观评估，并了解自己的优势和不足</p>
                                    <div className="flex items-center space-x-2">
                                        {[1,2,3,4,5].map(val => (
                                            <Button
                                                key={val}
                                                variant={answers.evaluating === val ? "default" : "outline"}
                                                className="w-12 h-12"
                                                onClick={() => handleAnswerChange("evaluating", val)}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                                        <span>非常不同意</span>
                                        <span>非常同意</span>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">调整能力</h3>
                                    <p className="text-sm text-gray-500 mb-3">我能根据学习情况灵活调整学习策略和方法</p>
                                    <div className="flex items-center space-x-2">
                                        {[1,2,3,4,5].map(val => (
                                            <Button
                                                key={val}
                                                variant={answers.adapting === val ? "default" : "outline"}
                                                className="w-12 h-12"
                                                onClick={() => handleAnswerChange("adapting", val)}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                                        <span>非常不同意</span>
                                        <span>非常同意</span>
                                    </div>
                                </div>
                                
                                <Separator />
                                
                                <div>
                                    <h3 className="text-lg font-medium mb-2">认知意识</h3>
                                    <p className="text-sm text-gray-500 mb-3">我对自己的思维过程有清晰的认识</p>
                                    <div className="flex items-center space-x-2">
                                        {[1,2,3,4,5].map(val => (
                                            <Button
                                                key={val}
                                                variant={answers.awareness === val ? "default" : "outline"}
                                                className="w-12 h-12"
                                                onClick={() => handleAnswerChange("awareness", val)}
                                            >
                                                {val}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-1 text-sm text-gray-500">
                                        <span>非常不同意</span>
                                        <span>非常同意</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setAnswers({
                                planning: 0,
                                monitoring: 0,
                                evaluating: 0,
                                adapting: 0,
                                awareness: 0
                            })}>
                                重置
                            </Button>
                            <Button>提交自评</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}