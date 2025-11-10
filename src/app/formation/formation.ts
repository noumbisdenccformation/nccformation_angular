import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { Formation as FormationModel, FormationCategory } from '../models/formation.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './formation.html',
  styleUrls: ['./formation.css']
})
export class Formation implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  formations: FormationModel[] = [];
  filteredFormations: FormationModel[] = [];
  selectedFormation: FormationModel | null = null;
  selectedCategory: FormationCategory | 'all' = 'all';
  searchQuery = '';
  isLoading = true;

  categories = [
    { id: 'all', name: 'Toutes', icon: '', count: 0 },
    { id: 'dev-web', name: 'Développement Web', icon: '', count: 0 },
    { id: 'blockchain', name: 'Blockchain & Crypto', icon: '', count: 0 },
    { id: 'marketing-digital', name: 'Marketing Digital', icon: '', count: 0 },
    { id: 'ecommerce', name: 'E-commerce', icon: '', count: 0 },
    { id: 'design', name: 'Design UX/UI', icon: '', count: 0 },
    { id: 'data-science', name: 'Data Science', icon: '', count: 0 }
  ];

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFormations();

    // Vérifier si on affiche une formation spécifique
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.loadFormationDetails(params['id']);
        }
      });
  }

  loadFormations() {
    this.isLoading = true;
    this.formationService.getAllFormations()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.formations = data;
          this.filteredFormations = data;
          this.updateCategoryCounts();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des formations:', error);
          this.isLoading = false;
        }
      });
  }

  loadFormationDetails(id: string) {
    this.formationService.getFormationById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (formation) => {
          this.selectedFormation = formation || null;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la formation:', error);
        }
      });
  }

  updateCategoryCounts() {
    this.categories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = this.formations.length;
      } else {
        cat.count = this.formations.filter(f => f.category === cat.id).length;
      }
    });
  }

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId as FormationCategory | 'all';
    this.applyFilters();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.formations;

    // Filtre par catégorie
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(f => f.category === this.selectedCategory);
    }

    // Filtre par recherche
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    this.filteredFormations = filtered;
  }

  getLevelBadgeClass(level: string): string {
    const classes: { [key: string]: string } = {
      'debutant': 'level-beginner',
      'intermediaire': 'level-intermediate',
      'avance': 'level-advanced'
    };
    return classes[level] || 'level-beginner';
  }

  getLevelLabel(level: string): string {
    const labels: { [key: string]: string } = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avance': 'Avancé'
    };
    return labels[level] || level;
  }

  viewFormationDetails(formationId: string) {
    this.router.navigate(['/formation', formationId]);
  }

  enrollInFormation(formationId: string) {
    // Logique d'inscription
    console.log('Inscription à la formation:', formationId);
    // Rediriger vers la page d'inscription ou le dashboard
    this.router.navigate(['/inscrire'], { queryParams: { formation: formationId } });
  }

  backToList() {
    this.selectedFormation = null;
    this.router.navigate(['/formation']);
  }

  getCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategory);
    return category ? category.name : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}