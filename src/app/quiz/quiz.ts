import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { QuizQuestion, QuizResponse } from '../models/quiz.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: Map<number, string | string[]> = new Map();
  showResult = false;
  isAnimating = false;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  selectOption(optionValue: string): void {
    if (this.currentQuestion.type === 'single') {
      this.selectedAnswers.set(this.currentQuestion.id, optionValue);
    } else if (this.currentQuestion.type === 'multiple') {
      const current = this.selectedAnswers.get(this.currentQuestion.id) as string[] || [];
      const index = current.indexOf(optionValue);
      
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(optionValue);
      }
      
      this.selectedAnswers.set(this.currentQuestion.id, current);
    }
  }

  isSelected(optionValue: string): boolean {
    const answer = this.selectedAnswers.get(this.currentQuestion.id);
    
    if (Array.isArray(answer)) {
      return answer.includes(optionValue);
    }
    
    return answer === optionValue;
  }

  canProceed(): boolean {
    const answer = this.selectedAnswers.get(this.currentQuestion.id);
    
    if (this.currentQuestion.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return !!answer;
  }

  nextQuestion(): void {
    if (!this.canProceed()) return;

    // Sauvegarder la réponse
    const response: QuizResponse = {
      questionId: this.currentQuestion.id,
      answer: this.selectedAnswers.get(this.currentQuestion.id)!
    };
    this.quizService.saveResponse(response);

    this.isAnimating = true;
    
    setTimeout(() => {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.showResult = true;
        this.quizService.calculateResult();
      }
      this.isAnimating = false;
    }, 300);
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.isAnimating = true;
      setTimeout(() => {
        this.currentQuestionIndex--;
        this.isAnimating = false;
      }, 300);
    }
  }

  viewResults(): void {
    this.router.navigate(['/quiz-result']);
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswers.clear();
    this.showResult = false;
    this.quizService.resetQuiz();
  }
}
