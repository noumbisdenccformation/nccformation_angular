import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formation.html',
  styleUrls: ['./formation.css']
})
export class Formation {
  formations = [
    {
      id: 1,
      title: 'Développement Web Full Stack',
      description: 'Maîtrisez HTML, CSS, JavaScript, Angular et Spring Boot',
      image: 'assets/img/web1.png',
      price: 299,
      duration: '40h',
      level: 'Débutant à Avancé',
      students: 1250,
      rating: 4.8,
      instructor: 'Expert NCC',
      features: ['Projets pratiques', 'Certificat', 'Support 24/7']
    },
    {
      id: 2,
      title: 'Crypto-monnaies & Blockchain',
      description: 'Comprenez et investissez dans les crypto-monnaies',
      image: 'assets/img/crypto1.png',
      price: 199,
      duration: '25h',
      level: 'Débutant',
      students: 890,
      rating: 4.7,
      instructor: 'Expert Crypto',
      features: ['Trading pratique', 'Analyse technique', 'Portfolio']
    },
    {
      id: 3,
      title: 'Marketing Digital Avancé',
      description: 'Stratégies complètes pour réussir en ligne',
      image: 'assets/img/formations1.png',
      price: 249,
      duration: '30h',
      level: 'Intermédiaire',
      students: 675,
      rating: 4.9,
      instructor: 'Expert Marketing',
      features: ['SEO/SEA', 'Réseaux sociaux', 'Analytics']
    }
  ];

  categories = [
    { name: 'Développement', count: 12, icon: '💻' },
    { name: 'Marketing', count: 8, icon: '📈' },
    { name: 'Crypto', count: 6, icon: '₿' },
    { name: 'Design', count: 10, icon: '🎨' }
  ];
}