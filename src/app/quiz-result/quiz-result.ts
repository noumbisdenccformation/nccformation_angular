import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { QuizResult as QuizResultModel } from '../models/quiz.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-result.html',
  styleUrl: './quiz-result.css'
})
export class QuizResult implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  result: QuizResultModel | null = null;
  showConfetti = true;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizResult()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.result = result;
        if (!result) {
          // Si pas de résultat, rediriger vers le quiz
          this.router.navigate(['/quiz']);
        }
      });

    // Arrêter les confettis après 3 secondes
    setTimeout(() => {
      this.showConfetti = false;
    }, 3000);
  }

  getDifficultyLabel(difficulty: string): string {
    const labels: { [key: string]: string } = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avance': 'Avancé'
    };
    return labels[difficulty] || difficulty;
  }

  getDifficultyColor(difficulty: string): string {
    const colors: { [key: string]: string } = {
      'debutant': '#48bb78',
      'intermediaire': '#ed8936',
      'avance': '#e53e3e'
    };
    return colors[difficulty] || '#667eea';
  }

  startFormation(): void {
    if (this.result) {
      // Rediriger vers la page de la formation avec l'ID
      this.router.navigate(['/formation', this.result.recommendedPath.id]);
    }
  }

  exploreOtherPaths(): void {
    this.router.navigate(['/formation']);
  }

  retakeQuiz(): void {
    this.quizService.resetQuiz();
    this.router.navigate(['/quiz']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
