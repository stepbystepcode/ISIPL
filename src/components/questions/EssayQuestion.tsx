import React, { useState } from 'react';
import { EssayQuestion as EssayQuestionType } from '@/types/questions';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EssayQuestionProps {
  question: EssayQuestionType;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: string) => void;
}

export const EssayQuestion: React.FC<EssayQuestionProps> = ({
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
            rows={8}
          />
        )}
        
        {(showAnswer || isSubmitted) && (
          <div className="space-y-4">
            {isSubmitted && !showAnswer && (
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-1">您的答案:</h4>
                <p className="whitespace-pre-wrap">{answer}</p>
              </div>
            )}
            
            {showAnswer && question.modelAnswer && (
              <div className="p-3 border rounded-md bg-green-50">
                <h4 className="font-medium mb-1">参考答案:</h4>
                <p className="whitespace-pre-wrap">{question.modelAnswer}</p>
              </div>
            )}
            
            {showAnswer && question.rubric && (
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">评分标准:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>评分标准</TableHead>
                      <TableHead className="text-right">分值</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {question.rubric.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.criteria}</TableCell>
                        <TableCell className="text-right">{item.points}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-medium">总分</TableCell>
                      <TableCell className="text-right font-medium">
                        {question.rubric.reduce((sum, item) => sum + item.points, 0)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
