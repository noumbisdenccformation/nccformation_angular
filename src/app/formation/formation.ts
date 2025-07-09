import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formation.html',
  styleUrls: ['./formation.css']
})
export class Formation implements OnInit {
  
  constructor(private apiService: ApiService) {}
  formations: any[] = [];
  
  ngOnInit() {
    this.loadFormations();
  }
  
  loadFormations() {
    this.apiService.getActiveFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des formations:', error);
        // Fallback avec données statiques
        this.formations = [
          {
            id: 1,
            title: 'Développement Web Full Stack',
            description: 'Maîtrisez HTML, CSS, JavaScript, Angular et Spring Boot',
            price: 179000,
            duration: '40h',
            level: 'Débutant à Avancé',
            currentStudents: 45
          },
          {
            id: 2,
            title: 'Crypto-monnaies & Blockchain', 
            description: 'Comprenez et investissez dans les crypto-monnaies',
            price: 119000,
            duration: '25h',
            level: 'Débutant',
            currentStudents: 32
          },
          {
            id: 3,
            title: 'Marketing Digital Avancé',
            description: 'Stratégies complètes pour réussir en ligne', 
            price: 149000,
            duration: '30h',
            level: 'Intermédiaire',
            currentStudents: 28
          },
          {
            id: 4,
            title: 'EduTime Pro',
            description: 'Gestion complète des emplois du temps scolaires',
            price: 20000,
            duration: 'Illimité',
            level: 'Tous niveaux',
            currentStudents: 156
          }
        ];
      }
    });
  }

  categories = [
    { name: 'Développement', count: 12, icon: '💻' },
    { name: 'Marketing', count: 8, icon: '📈' },
    { name: 'Crypto', count: 6, icon: '₿' },
    { name: 'Design', count: 10, icon: '🎨' }
  ];
}