
export interface IQuestionsOnExamRes {
    message: string
    questions: Question[]
  }
  
  export interface Question {
    answers: Answer[]
    type: string
    _id: string
    question: string
    correct: string
    subject: Subject
    exam: Exam
    createdAt: string
  }
  
  export interface Answer {
    answer: string
    key: string
  }
  
  export interface Subject {
    _id: string
    name: string
    icon: string
    createdAt: string
  }
  
  export interface Exam {
    _id: string
    title: string
    duration: number
    subject: string
    numberOfQuestions: number
    active: boolean
    createdAt: string
  }
  
  
export interface IQuestionsOnExamAdaptorRes {
    questions: Question[]
  }



