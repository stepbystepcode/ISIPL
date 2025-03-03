import React, { useState } from 'react';
import { FillBlankQuestion as FillBlankQuestionType } from '@/types/questions';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FillBlankQuestionProps {
  question: FillBlankQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: string[]) => void;
}

export const FillBlankQuestion: React.FC<FillBlankQuestionProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  const [answers, setAnswers] = useState<string[]>(Array(question.blanks).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.every(answer => answer.trim() !== '') && onAnswerSubmit) {
      onAnswerSubmit(question.id, answers);
      setIsSubmitted(true);
    }
  };

  // Replace the blank placeholders with input fields
  const renderContent = () => {
    let content = question.content;
    
    // If there's only one blank, just look for the first underscore sequence
    if (question.blanks === 1) {
      return (
        <div className="flex items-center gap-2 flex-wrap">
          {content.split('_____').map((part, index, array) => (
            <React.Fragment key={index}>
              {part}
              {index < array.length - 1 && (
                <div className="inline-block min-w-[100px]">
                  {showAnswer ? (
                    <Badge className="px-2 py-1">{question.answers[index]}</Badge>
                  ) : (
                    <Input
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      className="w-full inline-block"
                      placeholder="填写答案"
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    // For multiple blanks, look for numbered blanks like ___1___, ___2___, etc.
    return (
      <div>
        {content}
        <div className="mt-4 space-y-2">
          {Array.from({ length: question.blanks }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-medium">空{index + 1}:</span>
              {showAnswer ? (
                <Badge className="px-2 py-1">{question.answers[index]}</Badge>
              ) : (
                <Input
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="w-full"
                  placeholder={`填写第${index + 1}空答案`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">
            填空题
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
        {renderContent()}
      </CardContent>
      {!showAnswer && !isSubmitted && (
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={!answers.every(answer => answer.trim() !== '')}
          >
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
