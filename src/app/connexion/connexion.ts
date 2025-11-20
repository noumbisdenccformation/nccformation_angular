import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion implements OnInit {
  error = signal<string | null>(null);
  isLoading = signal(false);
  showPassword = signal(false);

  authForm = new FormGroup({
    identifier: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà authentifié, éviter d'afficher le formulaire de connexion
    if (this.authService.isAuthenticated()) {
      // On peut affiner selon le statut du quiz si nécessaire
      this.router.navigate(['/quiz']);
    }
  }

  private isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  private isPhoneNumber(input: string): boolean {
    const phoneRegex = /^(\+?237|237)?[6][0-9]{8}$/;
    return phoneRegex.test(input.replace(/\s/g, ''));
  }

  async onSubmit(): Promise<void> {
    this.error.set(null);

    if (this.authForm.invalid) {
      this.error.set("Veuillez remplir correctement tous les champs.");
      this.authForm.markAllAsTouched();
      return;
    }

    const { identifier, password } = this.authForm.value;

    if (!identifier || !password) return;

    const isEmailFormat = this.isEmail(identifier);
    const isPhoneFormat = this.isPhoneNumber(identifier);

    let authType: 'Email' | 'Téléphone';
    if (isEmailFormat) {
      authType = 'Email';
    } else if (isPhoneFormat) {
      authType = 'Téléphone';
    } else {
      this.error.set("Veuillez entrer une adresse email ou un numéro de téléphone valide.");
      this.authForm.get('identifier')?.setErrors({ 'invalidFormat': true });
      this.authForm.get('identifier')?.markAsTouched();
      return;
    }

    this.isLoading.set(true);

    try {
      const user = await this.authService.login(identifier, password);
      this.error.set(null);
      
      // Rediriger en fonction de l'état du quiz
      if (user.quizCompleted) {
        // Route dashboard non encore définie : on renvoie vers le résultat du quiz ou l'accueil
        this.router.navigate(['/quiz-result']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.error.set(error.message || `Échec de la connexion. Vérifiez votre ${authType.toLowerCase()} et votre mot de passe.`);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onLoginWithGoogle(): Promise<void> {
    this.error.set(null);
    this.isLoading.set(true);

    try {
      const user = await this.authService.loginWithGoogle();

      if (user.quizCompleted) {
        this.router.navigate(['/quiz-result']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.error.set(error.message || 'Une erreur est survenue lors de la connexion avec Google.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async onLoginWithFacebook(): Promise<void> {
    this.error.set(null);
    this.isLoading.set(true);

    try {
      const user = await this.authService.loginWithFacebook();

      if (user.quizCompleted) {
        this.router.navigate(['/quiz-result']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.error.set(error.message || 'Une erreur est survenue lors de la connexion avec Facebook.');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }
}
