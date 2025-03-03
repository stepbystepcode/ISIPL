import React, { useState } from 'react';
import { ShortAnswerQuestion as ShortAnswerQuestionType } from '@/types/questions';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: string) => void;
}

export const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (answer.trim() !== '' && onAnswerSubmit) {
      onAnswerSubmit(question.id, answer);
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
      <CardContent className="space-y-4">
        {!showAnswer && !isSubmitted && (
          <Textarea
            placeholder="请输入您的答案"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
          />
        )}
        
        {(showAnswer || isSubmitted) && (
          <div className="space-y-2">
            {isSubmitted && !showAnswer && (
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-1">您的答案:</h4>
                <p className="whitespace-pre-wrap">{answer}</p>
              </div>
            )}
            
            {showAnswer && (
              <div className="p-3 border rounded-md bg-green-50">
                <h4 className="font-medium mb-1">参考答案:</h4>
                <p className="whitespace-pre-wrap">{question.answer}</p>
              </div>
            )}
            
            {showAnswer && question.keywords && (
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-1">关键词:</h4>
                <div className="flex flex-wrap gap-1">
                  {question.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      {!showAnswer && !isSubmitted && (
        <CardFooter>
          <Button onClick={handleSubmit} disabled={answer.trim() === ''}>
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
