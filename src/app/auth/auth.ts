import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html', // <-- Le nom du fichier est corrigé ici
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  email = '';
  password = '';
  error: string | null = null;

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
}