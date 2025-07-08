import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './coaching.html',
  styleUrls: ['./coaching.css']
})
export class Coaching {
  coachingServices = [
    {
      id: 1,
      title: 'Coaching Personnel',
      description: 'Développez votre potentiel et atteignez vos objectifs personnels',
      icon: 'fas fa-user',
      price: 53000,
      duration: '1h',
      features: ['Bilan personnel', 'Plan d\'action', 'Suivi personnalisé']
    },
    {
      id: 2,
      title: 'Coaching Professionnel',
      description: 'Accélérez votre carrière et développez vos compétences',
      icon: 'fas fa-briefcase',
      price: 77000,
      duration: '1h30',
      features: ['Analyse de compétences', 'Stratégie carrière', 'Réseau professionnel']
    },
    {
      id: 3,
      title: 'Coaching Entrepreneurial',
      description: 'Lancez et développez votre entreprise avec succès',
      icon: 'fas fa-rocket',
      price: 119000,
      duration: '2h',
      features: ['Business plan', 'Stratégie marketing', 'Financement']
    }
  ];

  coaches = [
    {
      name: 'Sarah Martin',
      specialty: 'Développement personnel',
      experience: '8 ans',
      image: 'assets/img/coach1.jpg',
      rating: 4.9,
      sessions: 500
    },
    {
      name: 'Pierre Dubois',
      specialty: 'Coaching professionnel',
      experience: '12 ans',
      image: 'assets/img/coach2.jpg',
      rating: 4.8,
      sessions: 750
    },
    {
      name: 'Marie Leroy',
      specialty: 'Entrepreneuriat',
      experience: '10 ans',
      image: 'assets/img/coach3.jpg',
      rating: 5.0,
      sessions: 300
    }
  ];

  formData = {
    name: '',
    email: '',
    phone: '',
    coachingType: '',
    message: '',
    preferredDate: ''
  };

  submitForm() {
    if (this.formData.name && this.formData.email && this.formData.coachingType) {
      console.log('Demande de coaching:', this.formData);
      alert('Votre demande de coaching a été envoyée ! Nous vous contacterons bientôt.');
      this.resetForm();
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      coachingType: '',
      message: '',
      preferredDate: ''
    };
  }
}