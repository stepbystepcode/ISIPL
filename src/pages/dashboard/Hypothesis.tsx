import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Star, 
  BrainCircuit 
} from "lucide-react"

// Define types for our scenario data
type OptionId = "a" | "b" | "c";

type Option = {
  id: OptionId;
  text: string;
};

type Feedback = {
  [key in OptionId]: string;
};

type Scenario = {
  id: number;
  title: string;
  scenario: string;
  options: Option[];
  feedback: Feedback;
};

// 假设案例数据
const hypothesisScenarios: Scenario[] = [
  {
    id: 1,
    title: "教育创新",
    scenario: "如果所有学校都取消传统考试，用项目评估替代...",
    options: [
      { id: "a", text: "学生的学习动力会下降，因为没有明确的考试压力" },
      { id: "b", text: "学生的创造力和实践能力会提高，但可能缺乏系统性知识掌握" },
      { id: "c", text: "教育不平等会加剧，因为项目评估更依赖家庭资源和支持" }
    ],
    feedback: {
      "a": "这种考虑关注了考试作为外部动力的作用，但忽视了内在动机的培养可能性。",
      "b": "这种观点平衡考虑了利弊，认识到改变评估方式会影响学习内容和方式。",
      "c": "这种思考关注了系统性变革的社会公平性影响，体现了批判性思维。"
    }
  },
  {
    id: 2,
    title: "技术与社会",
    scenario: "如果人工智能在未来十年内取代50%的工作岗位...",
    options: [
      { id: "a", text: "社会将陷入严重失业危机，贫富差距扩大" },
      { id: "b", text: "人们将有更多时间发展创意和人文方面的才能，进入休闲社会" },
      { id: "c", text: "新的工作类型会出现，但需要全民再教育以适应新经济" }
    ],
    feedback: {
      "a": "这种担忧有合理性，但可能低估了社会适应新技术的能力和政策调节的作用。",
      "b": "这种乐观预测需要考虑收入分配机制的变革，否则休闲只会是少数人的特权。",
      "c": "这种观点体现了转型思维，认识到变革需要配套措施，但挑战在于再教育的规模和效果。"
    }
  },
  {
    id: 3,
    title: "环境决策",
    scenario: "如果全球立即禁止所有塑料包装使用...",
    options: [
      { id: "a", text: "海洋污染将大幅减少，生态系统得到显著改善" },
      { id: "b", text: "食品安全和保存问题将出现，可能导致粮食浪费增加" },
      { id: "c", text: "替代材料的生产会创造新的环境问题，如森林砍伐增加" }
    ],
    feedback: {
      "a": "这种预测关注了直接环境效益，但可能低估了转型期的复杂性和时间长度。",
      "b": "这种考虑点出了系统性变革的连锁反应，体现了对复杂问题的多角度思考。",
      "c": "这种分析体现了生命周期思维，认识到环境解决方案需要全面评估各种影响。"
    }
  }
];

export const Hypothesis = () => {
    const [activeScenario, setActiveScenario] = useState<Scenario>(hypothesisScenarios[0]);
    const [selectedOption, setSelectedOption] = useState<OptionId | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [userReflection, setUserReflection] = useState("");
    const [starRating, setStarRating] = useState<number | null>(null);
    
    const handleOptionSelect = (value: OptionId) => {
        setSelectedOption(value);
    };
    
    const handleSubmit = () => {
        if (selectedOption) {
            setShowFeedback(true);
        }
    };
    
    const handleReset = () => {
        setSelectedOption(null);
        setShowFeedback(false);
        setUserReflection("");
        setStarRating(null);
    };
    
    const handleScenarioChange = (id: number) => {
        const scenario = hypothesisScenarios.find(s => s.id === id);
        if (scenario) {
            setActiveScenario(scenario);
            handleReset();
        }
    };
    
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
                <BrainCircuit className="h-6 w-6 text-blue-500" />
                <h1 className="text-2xl font-bold">反事实思维训练</h1>
            </div>
            
            <Tabs defaultValue={activeScenario.id.toString()} onValueChange={(value) => handleScenarioChange(parseInt(value))}>
                <TabsList className="mb-4">
                    {hypothesisScenarios.map((scenario) => (
                        <TabsTrigger key={scenario.id} value={scenario.id.toString()}>
                            {scenario.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                
                {hypothesisScenarios.map((scenario) => (
                    <TabsContent key={scenario.id} value={scenario.id.toString()}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">{scenario.title}</CardTitle>
                                <CardDescription>
                                    <div className="flex items-start gap-2 mt-2">
                                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                                        <span className="text-gray-700 font-medium">假设练习：</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-6 text-lg font-medium">{scenario.scenario}</p>
                                
                                <RadioGroup 
                                    value={selectedOption || ""} 
                                    onValueChange={(value) => handleOptionSelect(value as OptionId)}
                                    className="space-y-4"
                                    disabled={showFeedback}
                                >
                                    {scenario.options.map((option) => (
                                        <div 
                                            key={option.id} 
                                            className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => !showFeedback && handleOptionSelect(option.id)}
                                        >
                                            <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                                            <Label htmlFor={`option-${option.id}`} className="cursor-pointer w-full">{option.text}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                
                                {!showFeedback && (
                                    <Button 
                                        onClick={handleSubmit} 
                                        className="mt-6" 
                                        disabled={!selectedOption}
                                    >
                                        提交答案
                                    </Button>
                                )}
                                
                                {showFeedback && selectedOption && (
                                    <div className="mt-8 space-y-6">
                                        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                                <h3 className="font-medium text-blue-700">思维评价与反馈</h3>
                                            </div>
                                            <p className="text-gray-700">{activeScenario.feedback[selectedOption]}</p>
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="reflection" className="block mb-2">您的反思（请简要记录您对这个假设情景的思考过程）：</Label>
                                            <Textarea 
                                                id="reflection"
                                                value={userReflection}
                                                onChange={(e) => setUserReflection(e.target.value)}
                                                className="min-h-[120px]"
                                                placeholder="写下您的思考过程和对反馈的理解..."
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className="mb-2">对这个练习的价值评分：</div>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <Button
                                                        key={rating}
                                                        type="button"
                                                        variant={starRating === rating ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => setStarRating(rating)}
                                                        className="w-10 h-10 p-0"
                                                    >
                                                        <Star className={`h-5 w-5 ${starRating === rating ? "fill-current" : ""}`} />
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            onClick={handleReset} 
                                            variant="outline" 
                                            className="mt-4"
                                        >
                                            <RotateCcw className="h-4 w-4 mr-2" />
                                            重新开始
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}