
export interface CheckQuestionInterface {
  answers: Answer[]
  time: number
}

export interface Answer {
  questionId: string
  correct: string
}


export interface CheckQuestionRes {
  message: string
  correct: number
  wrong: number
  total: string
  WrongQuestions: WrongQuestion[]
  correctQuestions: CorrectQuestion[]
}

export interface WrongQuestion {
  QID: string
  Question: string
  inCorrectAnswer: string
  correctAnswer: string
  answers: Answers
}

export interface Answers {}

export interface CorrectQuestion {
  QID: string
  Question: string
  correctAnswer: string
  answers: Answers2
}

export interface Answers2 {}


export interface ScoreAdaptorRes {
  correct: number
  wrong: number
  total: string
  WrongQuestions: WrongQuestion[]
}