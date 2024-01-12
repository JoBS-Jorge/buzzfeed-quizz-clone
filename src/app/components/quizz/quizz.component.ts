import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = ""

  questions: any
  questionSelected: any

  anwsers: string[] = []
  anwserSelected: string = "" 

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value: string){
    this.anwsers.push(value)
    this.nextStep()
  }

  async nextStep () {
    this.questionIndex++

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnwser: string = await this.checkResult(this.anwsers)
      this.finished = true
      this.anwserSelected = quizz_questions.results[finalAnwser as keyof typeof quizz_questions.results]
    }
  }

  async checkResult (anwsers: string[]) {
    const result = anwsers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length) {
          return previous

      }else {
        return current
      }
    })

    return result
  }


}
