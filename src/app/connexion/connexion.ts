import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
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
export class Connexion {
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
      
      if (user.quizCompleted) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.error.set(error.message || `Échec de la connexion. Vérifiez votre ${authType.toLowerCase()} et votre mot de passe.`);
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword(): void {
    this.showPassword.update(value => !value);
  }
}
