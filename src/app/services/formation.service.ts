import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Formation, CourseModule, MicroProject, FinalProject } from '../models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private formations = new BehaviorSubject<Formation[]>([]);
  private selectedFormation = new BehaviorSubject<Formation | null>(null);

  constructor() {
    this.loadMockFormations();
  }

  private loadMockFormations(): void {
    const mockFormations: Formation[] = [
      {
        id: 'fullstack-web',
        title: 'Développeur Web Full-Stack',
        slug: 'developpeur-web-fullstack',
        description: 'Maîtrisez Angular, Node.js et créez des applications web complètes',
        longDescription: 'Formation complète pour devenir développeur web full-stack. Apprenez à créer des applications web modernes avec Angular pour le frontend et Node.js pour le backend.',
        category: 'dev-web',
        duration: '6 mois',
        durationInWeeks: 24,
        level: 'intermediaire',
        price: 2500,
        discountPrice: 1999,
        thumbnail: 'assets/img/formations/fullstack-web.jpg',
        coverImage: 'assets/img/formations/fullstack-web-cover.jpg',
        isActive: true,
        isFeatured: true,
        enrollmentCount: 1247,
        rating: 4.8,
        reviewCount: 342,
        modules: [],
        prerequisites: ['Bases en HTML/CSS', 'Connaissance de JavaScript'],
        learningObjectives: [
          'Créer des applications web complètes',
          'Maîtriser Angular et Node.js',
          'Déployer des applications en production',
          'Travailler avec des bases de données',
          'Implémenter des API RESTful'
        ],
        targetAudience: [
          'Débutants en développement web',
          'Développeurs souhaitant se spécialiser',
          'Reconversion professionnelle'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'Express'],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-11-01')
      },
      {
        id: 'crypto-trading',
        title: 'Spécialiste Crypto & Blockchain',
        slug: 'specialiste-crypto-blockchain',
        description: 'Maîtrisez le trading, la blockchain et les smart contracts',
        longDescription: 'Devenez expert en crypto-monnaies et blockchain. Apprenez le trading, le développement de smart contracts et les stratégies d\'investissement.',
        category: 'blockchain',
        duration: '4 mois',
        durationInWeeks: 16,
        level: 'intermediaire',
        price: 1800,
        discountPrice: 1499,
        thumbnail: 'assets/img/formations/crypto.jpg',
        coverImage: 'assets/img/formations/crypto-cover.jpg',
        isActive: true,
        isFeatured: true,
        enrollmentCount: 892,
        rating: 4.7,
        reviewCount: 234,
        modules: [],
        prerequisites: ['Bases en finance', 'Intérêt pour la technologie'],
        learningObjectives: [
          'Comprendre la blockchain',
          'Trader les crypto-monnaies',
          'Développer des smart contracts',
          'Analyser les marchés crypto',
          'Gérer un portefeuille crypto'
        ],
        targetAudience: [
          'Investisseurs débutants',
          'Développeurs blockchain',
          'Traders en formation'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['Bitcoin', 'Ethereum', 'Trading', 'Smart Contracts', 'DeFi'],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-11-01')
      },
      {
        id: 'marketing-digital',
        title: 'Responsable Marketing Digital',
        slug: 'responsable-marketing-digital',
        description: 'SEO, SEA, Social Media et stratégies digitales',
        longDescription: 'Formation complète en marketing digital. Maîtrisez le SEO, SEA, les réseaux sociaux et créez des stratégies marketing efficaces.',
        category: 'marketing-digital',
        duration: '5 mois',
        durationInWeeks: 20,
        level: 'debutant',
        price: 1600,
        discountPrice: 1299,
        thumbnail: 'assets/img/formations/marketing.jpg',
        coverImage: 'assets/img/formations/marketing-cover.jpg',
        isActive: true,
        isFeatured: true,
        enrollmentCount: 1534,
        rating: 4.9,
        reviewCount: 456,
        modules: [],
        prerequisites: ['Aucun prérequis'],
        learningObjectives: [
          'Maîtriser le SEO et SEA',
          'Créer des campagnes publicitaires',
          'Gérer les réseaux sociaux',
          'Analyser les performances',
          'Développer une stratégie digitale'
        ],
        targetAudience: [
          'Entrepreneurs',
          'Marketeurs en reconversion',
          'Community managers'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['SEO', 'SEA', 'Google Ads', 'Facebook Ads', 'Analytics'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-11-01')
      },
      {
        id: 'ecommerce-specialist',
        title: 'E-Commerçant Professionnel',
        slug: 'ecommercant-professionnel',
        description: 'Créez et gérez votre boutique en ligne rentable',
        longDescription: 'Apprenez à créer, gérer et développer une boutique en ligne rentable. De la création à la vente, maîtrisez tous les aspects de l\'e-commerce.',
        category: 'ecommerce',
        duration: '4 mois',
        durationInWeeks: 16,
        level: 'debutant',
        price: 1400,
        discountPrice: 1199,
        thumbnail: 'assets/img/formations/ecommerce.jpg',
        coverImage: 'assets/img/formations/ecommerce-cover.jpg',
        isActive: true,
        isFeatured: false,
        enrollmentCount: 678,
        rating: 4.6,
        reviewCount: 189,
        modules: [],
        prerequisites: ['Aucun prérequis'],
        learningObjectives: [
          'Créer une boutique en ligne',
          'Gérer les stocks et commandes',
          'Optimiser les conversions',
          'Maîtriser le dropshipping',
          'Développer sa clientèle'
        ],
        targetAudience: [
          'Entrepreneurs',
          'Commerçants traditionnels',
          'Freelances'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['Shopify', 'WooCommerce', 'Dropshipping', 'Marketing', 'Logistique'],
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-11-01')
      },
      {
        id: 'ux-ui-designer',
        title: 'UX/UI Designer',
        slug: 'ux-ui-designer',
        description: 'Figma, design thinking et expérience utilisateur',
        longDescription: 'Devenez designer UX/UI professionnel. Maîtrisez Figma, le design thinking et créez des expériences utilisateur exceptionnelles.',
        category: 'design',
        duration: '5 mois',
        durationInWeeks: 20,
        level: 'intermediaire',
        price: 1900,
        discountPrice: 1599,
        thumbnail: 'assets/img/formations/design.jpg',
        coverImage: 'assets/img/formations/design-cover.jpg',
        isActive: true,
        isFeatured: true,
        enrollmentCount: 945,
        rating: 4.8,
        reviewCount: 287,
        modules: [],
        prerequisites: ['Sens créatif', 'Bases en design'],
        learningObjectives: [
          'Maîtriser Figma',
          'Appliquer le design thinking',
          'Créer des wireframes et prototypes',
          'Conduire des tests utilisateurs',
          'Designer pour mobile et web'
        ],
        targetAudience: [
          'Designers en reconversion',
          'Développeurs web',
          'Créatifs'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['Figma', 'UX', 'UI', 'Prototyping', 'User Research'],
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-11-01')
      },
      {
        id: 'data-science',
        title: 'Data Scientist & IA',
        slug: 'data-scientist-ia',
        description: 'Python, Machine Learning, Deep Learning et analyse de données',
        longDescription: 'Formation complète en Data Science et Intelligence Artificielle. Maîtrisez Python, les algorithmes de Machine Learning, le Deep Learning et l\'analyse de données pour devenir un expert recherché dans le domaine de l\'IA.',
        category: 'data-science',
        duration: '6 mois',
        durationInWeeks: 24,
        level: 'intermediaire',
        price: 2200,
        discountPrice: 1899,
        thumbnail: 'assets/img/formations/data-science.jpg',
        coverImage: 'assets/img/formations/data-science-cover.jpg',
        isActive: true,
        isFeatured: true,
        enrollmentCount: 756,
        rating: 4.9,
        reviewCount: 198,
        modules: [],
        prerequisites: ['Bases en mathématiques', 'Connaissance de Python recommandée', 'Statistiques de base'],
        learningObjectives: [
          'Maîtriser Python pour la Data Science',
          'Créer des modèles de Machine Learning',
          'Développer des réseaux de neurones',
          'Analyser et visualiser des données complexes',
          'Déployer des modèles IA en production',
          'Utiliser TensorFlow et PyTorch'
        ],
        targetAudience: [
          'Développeurs souhaitant se spécialiser en IA',
          'Analystes de données',
          'Ingénieurs en reconversion',
          'Étudiants en sciences'
        ],
        certification: true,
        mentorRequired: true,
        finalProjectRequired: true,
        tags: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'Pandas', 'NumPy', 'IA'],
        createdAt: new Date('2024-04-01'),
        updatedAt: new Date('2024-11-01')
      }
    ];

    this.formations.next(mockFormations);
  }

  getAllFormations(): Observable<Formation[]> {
    return this.formations.asObservable();
  }

  getFeaturedFormations(): Observable<Formation[]> {
    const featured = this.formations.value.filter(f => f.isFeatured);
    return of(featured);
  }

  getFormationById(id: string): Observable<Formation | undefined> {
    if (!id) {
      console.error('Formation ID is required');
      return of(undefined);
    }
    return this.formations.pipe(
      map(formations => formations.find(f => f.id === id || f.slug === id))
    );
  }

  getFormationBySlug(slug: string): Observable<Formation | undefined> {
    const formation = this.formations.value.find(f => f.slug === slug);
    return of(formation);
  }

  getFormationsByCategory(category: string): Observable<Formation[]> {
    const filtered = this.formations.value.filter(f => f.category === category);
    return of(filtered);
  }

  searchFormations(query: string): Observable<Formation[]> {
    const lowerQuery = query.toLowerCase();
    const results = this.formations.value.filter(f => 
      f.title.toLowerCase().includes(lowerQuery) ||
      f.description.toLowerCase().includes(lowerQuery) ||
      f.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return of(results);
  }

  enrollInFormation(formationId: string, userId: string): Observable<boolean> {
    // Logique d'inscription à implémenter avec le backend
    console.log(`User ${userId} enrolled in formation ${formationId}`);
    return of(true);
  }

  getModulesByFormation(formationId: string): Observable<CourseModule[]> {
    const formation = this.formations.value.find(f => f.id === formationId);
    return of(formation?.modules || []);
  }

  getMicroProjectsByModule(moduleId: string): Observable<MicroProject[]> {
    // Logique à implémenter
    return of([]);
  }

  submitMicroProject(projectId: string, userId: string, submission: any): Observable<boolean> {
    // Logique de soumission à implémenter
    console.log(`User ${userId} submitted project ${projectId}`);
    return of(true);
  }
}
