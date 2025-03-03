export type QuestionType = 
  | 'singleChoice' 
  | 'multipleChoice' 
  | 'trueFalse' 
  | 'fillBlank' 
  | 'shortAnswer' 
  | 'essay';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  content: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface ChoiceOption {
  id: string;
  content: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'singleChoice';
  options: ChoiceOption[];
  answer: string; // id of the correct option
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  options: ChoiceOption[];
  answers: string[]; // ids of the correct options
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'trueFalse';
  answer: boolean;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fillBlank';
  blanks: number;
  answers: string[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'shortAnswer';
  answer: string;
  keywords?: string[];
}

export interface EssayQuestion extends BaseQuestion {
  type: 'essay';
  modelAnswer?: string;
  rubric?: {
    criteria: string;
    points: number;
  }[];
}

export type Question = 
  | SingleChoiceQuestion 
  | MultipleChoiceQuestion 
  | TrueFalseQuestion 
  | FillBlankQuestion 
  | ShortAnswerQuestion 
  | EssayQuestion;

export interface QuestionBank {
  [subject: string]: {
    [type in QuestionType]?: Question[];
  };
}
