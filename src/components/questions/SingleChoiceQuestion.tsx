import React, { useState } from 'react';
import { SingleChoiceQuestion as SingleChoiceQuestionType } from '@/types/questions';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: string) => void;
}

export const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption && onAnswerSubmit) {
      onAnswerSubmit(question.id, selectedOption);
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
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className={`flex items-center space-x-2 p-2 rounded ${
                showAnswer && option.id === question.answer ? 'bg-green-100' : 
                isSubmitted && selectedOption === option.id && selectedOption !== question.answer ? 'bg-red-100' : ''
              }`}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                {option.content}
              </Label>
              {showAnswer && option.id === question.answer && (
                <Badge className="ml-2 bg-green-500">正确答案</Badge>
              )}
            </div>
          ))}
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
