// src/app/auth/auth.ts

import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; // Seul CommonModule est nécessaire pour *ngIf

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
  standalone: true, // Configuration en composant autonome
  imports: [
    FormsModule, 
    CommonModule // Nécessaire pour *ngIf et autres directives structurelles
  ]
})
export class AuthComponent {
  email = '';
  password = '';
  error: string | null = null;
  
  // Nouvelle variable d'état : 'login' ou 'signup'
  viewMode: 'login' | 'signup' = 'login'; 

  auth = getAuth();

  constructor() {}

  async login() {
    this.error = null;
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Connexion réussie !');
    } catch (err: any) {
      this.error = err.message;
      console.error('Erreur de connexion : ', err);
    }
  }

  async signup() {
    this.error = null;
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log('Inscription réussie !');
    } catch (err: any) {
      this.error = err.message;
      console.error('Erreur d\'inscription : ', err);
    }
  }

  // Méthode pour basculer entre Connexion et Inscription
  toggleView(mode: 'login' | 'signup') {
    this.viewMode = mode;
    this.error = null; 
  }

  onSubmit() {
    // Appelle la bonne fonction basée sur le mode actuel
    if (this.viewMode === 'login') {
      this.login();
    } else {
      this.signup();
    }
  }
}