import React from 'react';
import { Question } from '@/types/questions';
import { SingleChoiceQuestion } from './SingleChoiceQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TrueFalseQuestion } from './TrueFalseQuestion';
import { FillBlankQuestion } from './FillBlankQuestion';
import { ShortAnswerQuestion } from './ShortAnswerQuestion';
import { EssayQuestion } from './EssayQuestion';

interface QuestionRendererProps {
  question: Question;
  showAnswer?: boolean;
  onAnswerSubmit?: (questionId: string, answer: any) => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  showAnswer = false,
  onAnswerSubmit
}) => {
  switch (question.type) {
    case 'singleChoice':
      return (
        <SingleChoiceQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    case 'multipleChoice':
      return (
        <MultipleChoiceQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    case 'trueFalse':
      return (
        <TrueFalseQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    case 'fillBlank':
      return (
        <FillBlankQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    case 'shortAnswer':
      return (
        <ShortAnswerQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    case 'essay':
      return (
        <EssayQuestion 
          question={question} 
          showAnswer={showAnswer} 
          onAnswerSubmit={onAnswerSubmit} 
        />
      );
    default:
      return <div>Unsupported question type</div>;
  }
};
