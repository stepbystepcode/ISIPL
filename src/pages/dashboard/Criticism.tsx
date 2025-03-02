import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, ThumbsUp, Users, UserPlus, Award, AlertCircle } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 案例数据
const caseStudies = [
    {
        id: 1,
        title: "人工智能在教育领域的应用",
        background: "随着人工智能技术的快速发展，AI在教育领域的应用日益广泛。从个性化学习、智能评估到虚拟助教，AI正在改变传统教育模式。然而，这也引发了关于教育本质、教师角色以及数据隐私等方面的争议。",
        perspectives: [
            {
                id: 1,
                title: "促进教育公平",
                content: "AI技术可以让优质教育资源突破地域限制，为偏远地区和弱势群体提供平等的学习机会，缩小教育鸿沟。",
                author: "教育平等倡导者",
                avatar: "E",
                votes: 24
            },
            {
                id: 2,
                title: "威胁教师职业",
                content: "过度依赖AI可能导致教师角色边缘化，失去教育中人文关怀的重要环节，教育不应该仅仅是知识传递，还包括价值观塑造和情感交流。",
                author: "传统教育捍卫者",
                avatar: "T",
                votes: 18
            },
            {
                id: 3,
                title: "数据安全隐患",
                content: "AI教育应用收集大量学生学习数据和个人信息，存在数据泄露和滥用风险，可能侵犯学生隐私权。",
                author: "数据安全专家",
                avatar: "S",
                votes: 15
            },
            {
                id: 4,
                title: "提高教学效率",
                content: "AI可以承担重复性教学任务，让教师有更多时间关注学生个性化需求和创新教学，实现人机协作优势互补。",
                author: "教育创新者",
                avatar: "I",
                votes: 22
            }
        ],
        comments: [
            {
                id: 1,
                author: "张教授",
                avatar: "张",
                content: "AI应当作为教育的辅助工具，而非替代者。关键在于如何平衡技术与人文的关系。",
                isTeacher: true,
                likes: 15,
                time: "2025-02-28"
            },
            {
                id: 2,
                author: "李同学",
                avatar: "李",
                content: "我个人认为数据安全是最大问题，学生的学习行为数据如何保护需要更严格的规范。",
                isTeacher: false,
                likes: 8,
                time: "2025-03-01"
            }
        ]
    },
    {
        id: 2,
        title: "基因编辑技术的伦理争议",
        background: "CRISPR等基因编辑技术使人类能够精确修改生物体的基因组，这项技术在医疗、农业等领域有巨大潜力，但也引发了是否应该编辑人类基因组，特别是生殖细胞系编辑的深刻伦理争议。",
        perspectives: [
            {
                id: 1,
                title: "疾病预防",
                content: "基因编辑可以预防遗传性疾病，消除可能导致严重健康问题的基因突变，减轻患者痛苦并降低医疗成本。",
                author: "医学研究者",
                avatar: "M",
                votes: 20
            },
            {
                id: 2,
                title: "伦理边界",
                content: "人类不应干预自然进化过程，基因编辑可能导致不可预见的后果，并开启\"设计婴儿\"的伦理滑坡。",
                author: "伦理学家",
                avatar: "E",
                votes: 25
            },
            {
                id: 3,
                title: "社会不平等",
                content: "基因增强可能成为富人的专利，加剧社会分化，创造基因优势阶层和基因劣势阶层。",
                author: "社会学者",
                avatar: "S",
                votes: 18
            }
        ],
        comments: [
            {
                id: 1,
                author: "王教授",
                avatar: "王",
                content: "技术本身无对错，关键在于如何建立完善的监管框架和伦理准则。",
                isTeacher: true,
                likes: 12,
                time: "2025-02-25"
            }
        ]
    }
];

export const Criticism = () => {
    const [activeCase, setActiveCase] = useState(caseStudies[0]);
    const [selectedPerspective, setSelectedPerspective] = useState<number | null>(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState(caseStudies[0].comments);
    const [teacherFeedback, setTeacherFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    
    // 新增观点的状态
    const [newPerspective, setNewPerspective] = useState({
        title: "",
        content: "",
        author: "学生用户"
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [perspectives, setPerspectives] = useState<typeof activeCase.perspectives>(activeCase.perspectives);

    // 选择案例
    const handleCaseChange = (caseId: number) => {
        const selectedCase = caseStudies.find(c => c.id === caseId);
        if (selectedCase) {
            setActiveCase(selectedCase);
            setComments(selectedCase.comments);
            setPerspectives(selectedCase.perspectives);
            setSelectedPerspective(null);
            setNewComment("");
            setShowFeedback(false);
        }
    };

    // 选择观点
    const handlePerspectiveSelect = (perspectiveId: number) => {
        setSelectedPerspective(perspectiveId);
    };

    // 添加新观点
    const handleAddPerspective = () => {
        if (!newPerspective.title.trim() || !newPerspective.content.trim()) return;
        
        const newPerspectiveObj = {
            id: perspectives.length + 1,
            title: newPerspective.title,
            content: newPerspective.content,
            author: newPerspective.author,
            avatar: "学",
            votes: 0
        };
        
        setPerspectives([...perspectives, newPerspectiveObj]);
        setNewPerspective({
            title: "",
            content: "",
            author: "学生用户"
        });
        setDialogOpen(false);
    };

    // 发表评论
    const submitComment = () => {
        if (!newComment.trim()) return;
        
        const newCommentObj = {
            id: comments.length + 1,
            author: "学生用户",
            avatar: "学",
            content: newComment,
            isTeacher: false,
            likes: 0,
            time: new Date().toISOString().split('T')[0]
        };
        
        setComments([...comments, newCommentObj]);
        setNewComment("");
        
        // 显示系统点评
        if (!showFeedback) {
            const feedback = selectedPerspective 
                ? "你选择了一个有意义的观点进行分析，请尝试多角度思考问题，并考虑其他可能性。批判性思维强调全面评估不同立场。"
                : "你提出了自己的见解，批判性思维的核心是质疑与分析。继续深入探索这个话题的不同维度。";
            
            setTeacherFeedback(feedback);
            setShowFeedback(true);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">批判思维</h1>
            
            {/* 案例选择 */}
            <Tabs defaultValue={activeCase.id.toString()} className="w-full mb-6" 
                onValueChange={(value) => handleCaseChange(parseInt(value))}>
                <TabsList className="grid grid-cols-2 mb-4">
                    {caseStudies.map(caseStudy => (
                        <TabsTrigger key={caseStudy.id} value={caseStudy.id.toString()}>
                            {caseStudy.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            
            {/* A. 案例背景介绍区 */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                        {activeCase.title}
                    </CardTitle>
                    <CardDescription>案例背景</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 leading-relaxed">{activeCase.background}</p>
                </CardContent>
            </Card>
            
            {/* B. 多方观点展示区 */}
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                多方观点
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {perspectives.map(perspective => (
                    <Card 
                        key={perspective.id} 
                        className={`cursor-pointer hover:border-blue-400 transition-colors ${
                            selectedPerspective === perspective.id ? 'border-2 border-blue-500' : ''
                        }`}
                        onClick={() => handlePerspectiveSelect(perspective.id)}
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{perspective.title}</CardTitle>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback>{perspective.avatar}</AvatarFallback>
                                    </Avatar>
                                    <CardDescription>{perspective.author}</CardDescription>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {perspective.votes}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700">{perspective.content}</p>
                        </CardContent>
                    </Card>
                ))}
                
                {/* 添加新观点卡片 */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Card className="border-dashed border-2 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
                            <CardContent className="flex flex-col items-center justify-center py-8 text-gray-500">
                                <UserPlus className="h-12 w-12 mb-2" />
                                <p className="text-center">提出新观点</p>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>提出新观点</DialogTitle>
                            <DialogDescription>
                                请分享你对"{activeCase.title}"的独特见解。批判性思维鼓励从不同角度思考问题。
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="perspective-title" className="text-right">
                                    观点标题
                                </Label>
                                <Input
                                    id="perspective-title"
                                    value={newPerspective.title}
                                    onChange={(e) => setNewPerspective({...newPerspective, title: e.target.value})}
                                    placeholder="简洁明了的标题"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="perspective-author" className="text-right">
                                    作者署名
                                </Label>
                                <Input
                                    id="perspective-author"
                                    value={newPerspective.author}
                                    onChange={(e) => setNewPerspective({...newPerspective, author: e.target.value})}
                                    placeholder="你的名字或身份"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="perspective-content" className="text-right">
                                    观点内容
                                </Label>
                                <Textarea
                                    id="perspective-content"
                                    value={newPerspective.content}
                                    onChange={(e) => setNewPerspective({...newPerspective, content: e.target.value})}
                                    placeholder="详细阐述你的观点和理由..."
                                    className="col-span-3 min-h-[100px]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddPerspective}>提交观点</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            {/* C. 用户互动区 */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        讨论区
                    </CardTitle>
                    <CardDescription>
                        {selectedPerspective 
                            ? `你选择了观点：${activeCase.perspectives.find(p => p.id === selectedPerspective)?.title}`
                            : "你尚未选择支持的观点"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* 评论列表 */}
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex gap-4">
                                <Avatar>
                                    <AvatarFallback>{comment.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium">{comment.author}</span>
                                        {comment.isTeacher && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                                教师
                                            </span>
                                        )}
                                        <span className="text-gray-500 text-xs">{comment.time}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                    <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                        <button className="flex items-center gap-1 hover:text-blue-500">
                                            <ThumbsUp className="h-4 w-4" />
                                            <span>{comment.likes}</span>
                                        </button>
                                        <button className="hover:text-blue-500">回复</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* 系统/教师点评 */}
                    {showFeedback && (
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">系统点评</span>
                            </div>
                            <p className="text-gray-700">{teacherFeedback}</p>
                        </div>
                    )}
                    
                    {/* 发表评论 */}
                    <div className="space-y-4">
                        <Textarea 
                            placeholder="发表你的看法..." 
                            className="min-h-[100px]"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Button onClick={submitComment}>发表评论</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}