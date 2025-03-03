import React, { useState } from 'react';
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '@/types/questions';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: string[]) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, optionId]);
    } else {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0 && onAnswerSubmit) {
      onAnswerSubmit(question.id, selectedOptions);
      setIsSubmitted(true);
    }
  };

  const isCorrectOption = (optionId: string) => question.answers.includes(optionId);
  const isSelectedOption = (optionId: string) => selectedOptions.includes(optionId);

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
        <div className="space-y-2">
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className={`flex items-center space-x-2 p-2 rounded ${
                showAnswer && isCorrectOption(option.id) ? 'bg-green-100' : 
                isSubmitted && isSelectedOption(option.id) && !isCorrectOption(option.id) ? 'bg-red-100' : ''
              }`}
            >
              <Checkbox 
                id={`option-${option.id}`} 
                checked={isSelectedOption(option.id)}
                onCheckedChange={(checked) => handleOptionChange(option.id, checked as boolean)}
              />
              <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                {option.content}
              </Label>
              {showAnswer && isCorrectOption(option.id) && (
                <Badge className="ml-2 bg-green-500">正确答案</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      {!showAnswer && !isSubmitted && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={selectedOptions.length === 0}>
            提交答案
          </Button>
        </CardFooter>
      )}
      {(showAnswer || isSubmitted) && question.tags && (
        <CardFooter className="flex flex-wrap gap-1">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
