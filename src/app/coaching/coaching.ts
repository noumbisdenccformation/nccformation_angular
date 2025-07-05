import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './coaching.html',
  styleUrls: ['./coaching.css']
})
export class Coaching {
  coachingServices = [
    {
      title: 'Coaching Personnel',
      description: 'Développez votre potentiel et atteignez vos objectifs personnels',
      icon: 'fas fa-user',
      price: 'À partir de 50€/session'
    },
    {
      title: 'Coaching Professionnel',
      description: 'Accélérez votre carrière et développez vos compétences',
      icon: 'fas fa-briefcase',
      price: 'À partir de 80€/session'
    },
    {
      title: 'Coaching Entrepreneurial',
      description: 'Lancez et développez votre entreprise avec succès',
      icon: 'fas fa-rocket',
      price: 'À partir de 100€/session'
    }
  ];

  submitForm() {
    // Logique pour soumettre le formulaire de demande de coaching
    alert('Votre demande de coaching a été envoyée ! Nous vous contacterons bientôt.');
  }
} 