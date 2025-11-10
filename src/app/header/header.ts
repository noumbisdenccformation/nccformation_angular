import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // NOUVELLES propriétés pour le modal
  isAuthModalOpen = false;
  activeTab: 'login' | 'register' = 'login';

  // Méthodes existantes (navigateTo, etc.)...

  // NOUVELLES méthodes
  openAuthModal() {
    this.isAuthModalOpen = true;
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
  }

  onLogin() {
    // TODO: Implémenter la logique de connexion
    console.log('Connexion en cours...');
    this.closeAuthModal();
  }

  onRegister() {
    // TODO: Implémenter la logique d'inscription
    console.log('Inscription en cours...');
    this.closeAuthModal();
  }
}
