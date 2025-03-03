import { v4 as uuidv4 } from 'uuid';
import { Question, QuestionType, QuestionBank } from '@/types/questions';

// Sample question data for different subjects
const sampleQuestionBank: QuestionBank = {
  '高等数学': {
    'singleChoice': [
      {
        id: uuidv4(),
        type: 'singleChoice',
        content: '若函数f(x)=x²在点x₀处的导数为4，则x₀的值为？',
        subject: '高等数学',
        difficulty: 'easy',
        options: [
          { id: 'A', content: '1' },
          { id: 'B', content: '2' },
          { id: 'C', content: '-2' },
          { id: 'D', content: '±2' }
        ],
        answer: 'D',
        tags: ['微积分', '导数']
      }
    ],
    'multipleChoice': [
      {
        id: uuidv4(),
        type: 'multipleChoice',
        content: '下列关于连续函数的说法中，正确的有：',
        subject: '高等数学',
        difficulty: 'medium',
        options: [
          { id: 'A', content: '连续函数在闭区间上一定有最大值和最小值' },
          { id: 'B', content: '连续函数在开区间上一定有最大值和最小值' },
          { id: 'C', content: '连续函数的导数一定存在' },
          { id: 'D', content: '连续函数在闭区间上一定满足介值定理' }
        ],
        answers: ['A', 'D'],
        tags: ['连续性', '函数性质']
      }
    ],
    'fillBlank': [
      {
        id: uuidv4(),
        type: 'fillBlank',
        content: '若函数f(x)=sin(x)在x=0处的泰勒展开式为f(x)=x-x³/3!+x⁵/5!-..., 则f(x)在x=0处的二阶导数值为_____。',
        subject: '高等数学',
        difficulty: 'medium',
        blanks: 1,
        answers: ['0'],
        tags: ['泰勒展开', '导数']
      }
    ]
  },
  '线性代数': {
    'singleChoice': [
      {
        id: uuidv4(),
        type: 'singleChoice',
        content: '矩阵A的特征值为2,3,4，则det(A)=?',
        subject: '线性代数',
        difficulty: 'medium',
        options: [
          { id: 'A', content: '9' },
          { id: 'B', content: '24' },
          { id: 'C', content: '12' },
          { id: 'D', content: '6' }
        ],
        answer: 'B',
        tags: ['特征值', '行列式']
      }
    ],
    'trueFalse': [
      {
        id: uuidv4(),
        type: 'trueFalse',
        content: '若矩阵A是对称矩阵，则A的所有特征值都是实数。',
        subject: '线性代数',
        difficulty: 'easy',
        answer: true,
        tags: ['对称矩阵', '特征值']
      }
    ]
  },
  '离散数学': {
    'singleChoice': [
      {
        id: uuidv4(),
        type: 'singleChoice',
        content: '在一个有10个顶点的简单无向图中，最多可能有多少条边？',
        subject: '离散数学',
        difficulty: 'medium',
        options: [
          { id: 'A', content: '45' },
          { id: 'B', content: '90' },
          { id: 'C', content: '10' },
          { id: 'D', content: '100' }
        ],
        answer: 'A',
        tags: ['图论', '简单图']
      }
    ],
    'shortAnswer': [
      {
        id: uuidv4(),
        type: 'shortAnswer',
        content: '简述归纳法的基本步骤和应用场景。',
        subject: '离散数学',
        difficulty: 'medium',
        answer: '归纳法的基本步骤包括：1. 证明基础情况成立；2. 假设n=k时命题成立；3. 证明n=k+1时命题也成立。归纳法常用于证明与自然数相关的命题、递归算法的正确性、数列性质等。',
        keywords: ['基础情况', '归纳假设', '归纳步骤', '自然数', '递归']
      }
    ]
  },
  '概率论与数理统计': {
    'singleChoice': [
      {
        id: uuidv4(),
        type: 'singleChoice',
        content: '若随机变量X服从正态分布N(0,1)，则P(X>1.96)=?',
        subject: '概率论与数理统计',
        difficulty: 'medium',
        options: [
          { id: 'A', content: '0.025' },
          { id: 'B', content: '0.05' },
          { id: 'C', content: '0.95' },
          { id: 'D', content: '0.975' }
        ],
        answer: 'A',
        tags: ['正态分布', '概率计算']
      }
    ],
    'essay': [
      {
        id: uuidv4(),
        type: 'essay',
        content: '详细解释中心极限定理及其在实际应用中的意义。',
        subject: '概率论与数理统计',
        difficulty: 'hard',
        modelAnswer: '中心极限定理是概率论中的一个基本定理，它表明在适当的条件下，大量相互独立的随机变量的均值经适当标准化后依分布收敛于标准正态分布。这一定理解释了为什么许多自然和社会现象中的数据分布近似于正态分布...',
        rubric: [
          { criteria: '定理的准确陈述', points: 3 },
          { criteria: '数学推导的正确性', points: 4 },
          { criteria: '实际应用举例', points: 3 }
        ]
      }
    ]
  },
  '数据库': {
    'multipleChoice': [
      {
        id: uuidv4(),
        type: 'multipleChoice',
        content: '关系数据库的特点包括：',
        subject: '数据库',
        difficulty: 'easy',
        options: [
          { id: 'A', content: '数据以表格形式存储' },
          { id: 'B', content: '支持SQL查询语言' },
          { id: 'C', content: '只能存储文本数据' },
          { id: 'D', content: '不支持事务处理' }
        ],
        answers: ['A', 'B'],
        tags: ['关系数据库', '数据库特性']
      }
    ],
    'fillBlank': [
      {
        id: uuidv4(),
        type: 'fillBlank',
        content: 'SQL中，用于从表中选择数据的语句是_____，用于更新表中数据的语句是_____。',
        subject: '数据库',
        difficulty: 'easy',
        blanks: 2,
        answers: ['SELECT', 'UPDATE'],
        tags: ['SQL', '数据操作']
      }
    ]
  },
  '操作系统': {
    'trueFalse': [
      {
        id: uuidv4(),
        type: 'trueFalse',
        content: '分页存储管理方式中，页表的作用是实现从逻辑地址到物理地址的映射。',
        subject: '操作系统',
        difficulty: 'medium',
        answer: true,
        tags: ['内存管理', '分页机制']
      }
    ],
    'shortAnswer': [
      {
        id: uuidv4(),
        type: 'shortAnswer',
        content: '简述死锁产生的四个必要条件。',
        subject: '操作系统',
        difficulty: 'medium',
        answer: '死锁产生的四个必要条件是：1. 互斥条件：资源不能被共享，只能由一个进程使用；2. 请求与保持条件：进程已获得的资源在未使用完之前不能被强行剥夺；3. 不剥夺条件：进程已获得的资源在未使用完之前不能被强行剥夺；4. 循环等待条件：若干进程之间形成头尾相接的循环等待资源关系。',
        keywords: ['互斥', '请求与保持', '不剥夺', '循环等待']
      }
    ]
  }
};

// Get all questions for a specific subject
export const getQuestionsBySubject = (subject: string): Record<QuestionType, Question[]> => {
  const subjectQuestions = sampleQuestionBank[subject] || {};
  
  // Create an empty result with all question types
  const result: Partial<Record<QuestionType, Question[]>> = {
    singleChoice: [],
    multipleChoice: [],
    trueFalse: [],
    fillBlank: [],
    shortAnswer: [],
    essay: []
  };
  
  // Fill in the questions that exist for this subject
  Object.entries(subjectQuestions).forEach(([type, questions]) => {
    result[type as QuestionType] = questions as Question[];
  });
  
  return result as Record<QuestionType, Question[]>;
};

// Get questions by subject and type
export const getQuestionsByType = (subject: string, type: QuestionType): Question[] => {
  return sampleQuestionBank[subject]?.[type] || [];
};

// Get all available subjects
export const getAllSubjects = (): string[] => {
  return Object.keys(sampleQuestionBank);
};

// Get all question types
export const getAllQuestionTypes = (): QuestionType[] => {
  return ['singleChoice', 'multipleChoice', 'trueFalse', 'fillBlank', 'shortAnswer', 'essay'];
};

// Add a new question
export const addQuestion = (question: Omit<Question, 'id'>): Question => {
  const newQuestion = { ...question, id: uuidv4() } as Question;
  
  if (!sampleQuestionBank[question.subject]) {
    sampleQuestionBank[question.subject] = {};
  }
  
  if (!sampleQuestionBank[question.subject][question.type]) {
    sampleQuestionBank[question.subject][question.type] = [];
  }
  
  sampleQuestionBank[question.subject][question.type]!.push(newQuestion);
  
  return newQuestion;
};

// Get a random question from a specific subject and type
export const getRandomQuestion = (subject: string, type: QuestionType): Question | null => {
  const questions = getQuestionsByType(subject, type);
  if (questions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

// Get random questions for a specific subject
export const getRandomQuestions = (subject: string, count: number): Question[] => {
  const allQuestions: Question[] = [];
  
  // Collect all questions for the subject
  Object.values(sampleQuestionBank[subject] || {}).forEach(questions => {
    if (questions) {
      allQuestions.push(...questions);
    }
  });
  
  // Shuffle and return the requested number
  return shuffleArray(allQuestions).slice(0, Math.min(count, allQuestions.length));
};

// Helper function to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
