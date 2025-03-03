import React, { useState } from 'react';
import { TrueFalseQuestion as TrueFalseQuestionType } from '@/types/questions';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: boolean) => void;
}

export const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption && onAnswerSubmit) {
      onAnswerSubmit(question.id, selectedOption === 'true');
      setIsSubmitted(true);
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            {question.content}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{question.subject}</Badge>
            <Badge variant={
              question.difficulty === 'easy' ? 'secondary' :
              question.difficulty === 'medium' ? 'default' : 'destructive'
            }>
              {question.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedOption || undefined} 
          onValueChange={setSelectedOption}
          className="space-y-2"
        >
          <div 
            className={`flex items-center space-x-2 p-2 rounded ${
              showAnswer && question.answer === true ? 'bg-green-100' : 
              isSubmitted && selectedOption === 'true' && !question.answer ? 'bg-red-100' : ''
            }`}
          >
            <RadioGroupItem value="true" id="option-true" />
            <Label htmlFor="option-true" className="flex-grow cursor-pointer">
              正确
            </Label>
            {showAnswer && question.answer === true && (
              <Badge className="ml-2 bg-green-500">正确答案</Badge>
            )}
          </div>
          <div 
            className={`flex items-center space-x-2 p-2 rounded ${
              showAnswer && question.answer === false ? 'bg-green-100' : 
              isSubmitted && selectedOption === 'false' && question.answer ? 'bg-red-100' : ''
            }`}
          >
            <RadioGroupItem value="false" id="option-false" />
            <Label htmlFor="option-false" className="flex-grow cursor-pointer">
              错误
            </Label>
            {showAnswer && question.answer === false && (
              <Badge className="ml-2 bg-green-500">正确答案</Badge>
            )}
          </div>
        </RadioGroup>
      </CardContent>
      {!showAnswer && !isSubmitted && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!selectedOption}>
            提交答案
          </Button>
        </CardFooter>
      )}
      {(showAnswer || isSubmitted) && question.tags && (
        <CardFooter className="flex flex-wrap gap-1">
          {question.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
