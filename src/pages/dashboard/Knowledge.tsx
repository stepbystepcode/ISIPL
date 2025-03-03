import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { QuestionRenderer } from "@/components/questions/QuestionRenderer";
import { Question, QuestionType } from "@/types/questions";
import { 
  getAllSubjects, 
  getAllQuestionTypes, 
  getQuestionsBySubject, 
  getRandomQuestions 
} from "@/services/questionService";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Knowledge = () => {
  const subjects = getAllSubjects();
  const questionTypes = getAllQuestionTypes();
  
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>("singleChoice");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setQuestions([]);
    setUserAnswers({});
  };
  
  const handleQuestionTypeChange = (value: QuestionType) => {
    setSelectedQuestionType(value);
    setQuestions([]);
    setUserAnswers({});
  };
  
  const handleGenerateQuestions = () => {
    if (!selectedSubject) return;
    
    const newQuestions = getRandomQuestions(selectedSubject, questionCount);
    setQuestions(newQuestions);
    setUserAnswers({});
  };
  
  const handleAnswerSubmit = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const getQuestionTypeName = (type: QuestionType): string => {
    const typeNames: Record<QuestionType, string> = {
      singleChoice: '单选题',
      multipleChoice: '多选题',
      trueFalse: '判断题',
      fillBlank: '填空题',
      shortAnswer: '简答题',
      essay: '论述题'
    };
    return typeNames[type];
  };
  
  const exportQuestionsAsJson = () => {
    if (questions.length === 0) return;
    
    const questionsData = {
      subject: selectedSubject,
      questions: questions,
      userAnswers: userAnswers
    };
    
    const jsonString = JSON.stringify(questionsData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSubject}_questions.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">知识掌握</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>题目生成器</CardTitle>
          <CardDescription>选择学科和题型生成相应的练习题</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject-select">选择学科</Label>
                <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                  <SelectTrigger id="subject-select" className="w-full">
                    <SelectValue placeholder="选择一个学科" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>题目数量: {questionCount}</Label>
                <Slider 
                  value={[questionCount]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(value) => setQuestionCount(value[0])}
                  className="my-2"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-answers" 
                  checked={showAnswers} 
                  onCheckedChange={setShowAnswers} 
                />
                <Label htmlFor="show-answers">显示答案</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>题目类型</Label>
                <Tabs 
                  value={selectedQuestionType} 
                  onValueChange={(value) => handleQuestionTypeChange(value as QuestionType)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger value="singleChoice">选择题</TabsTrigger>
                    <TabsTrigger value="fillBlank">填空题</TabsTrigger>
                    <TabsTrigger value="shortAnswer">问答题</TabsTrigger>
                  </TabsList>
                  <TabsContent value="singleChoice">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={selectedQuestionType === 'singleChoice' ? 'default' : 'outline'} 
                        onClick={() => handleQuestionTypeChange('singleChoice')}
                        className="w-full"
                      >
                        单选题
                      </Button>
                      <Button 
                        variant={selectedQuestionType === 'multipleChoice' ? 'default' : 'outline'} 
                        onClick={() => handleQuestionTypeChange('multipleChoice')}
                        className="w-full"
                      >
                        多选题
                      </Button>
                      <Button 
                        variant={selectedQuestionType === 'trueFalse' ? 'default' : 'outline'} 
                        onClick={() => handleQuestionTypeChange('trueFalse')}
                        className="w-full"
                      >
                        判断题
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="fillBlank">
                    <Button 
                      variant="default" 
                      onClick={() => handleQuestionTypeChange('fillBlank')}
                      className="w-full"
                    >
                      填空题
                    </Button>
                  </TabsContent>
                  <TabsContent value="shortAnswer">
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={selectedQuestionType === 'shortAnswer' ? 'default' : 'outline'} 
                        onClick={() => handleQuestionTypeChange('shortAnswer')}
                        className="w-full"
                      >
                        简答题
                      </Button>
                      <Button 
                        variant={selectedQuestionType === 'essay' ? 'default' : 'outline'} 
                        onClick={() => handleQuestionTypeChange('essay')}
                        className="w-full"
                      >
                        论述题
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={handleGenerateQuestions} 
                  disabled={!selectedSubject}
                  className="w-full"
                >
                  生成题目
                </Button>
                <Button 
                  variant="outline" 
                  onClick={exportQuestionsAsJson} 
                  disabled={questions.length === 0}
                  className="w-full"
                >
                  导出为JSON
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {questions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {selectedSubject} - {getQuestionTypeName(selectedQuestionType)} ({questions.length}题)
          </h2>
          
          {questions.map((question) => (
            <QuestionRenderer 
              key={question.id} 
              question={question} 
              showAnswer={showAnswers}
              onAnswerSubmit={handleAnswerSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};