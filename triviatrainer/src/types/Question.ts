export interface Question  {
    category: string
    correctAnswer: string
    difficulty: string
    id: number
    incorrectAnswers: string[]
    question: {
      text: string
    }
}

