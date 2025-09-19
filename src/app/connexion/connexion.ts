import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      // TODO: Implémenter la logique de connexion
      console.log('Connexion:', { email: this.email, password: this.password });
      
      // Simulation d'une requête
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
