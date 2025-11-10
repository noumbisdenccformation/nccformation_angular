import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizQuestion, QuizResponse, QuizResult, FormationPath } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Quel est votre objectif principal ?",
      type: 'single',
      category: 'objectif',
      options: [
        { id: 'emploi', label: 'Trouver un emploi dans le numérique', value: 'emploi', icon: '💼' },
        { id: 'entrepreneuriat', label: 'Lancer mon entreprise/startup', value: 'entrepreneuriat', icon: '🚀' },
        { id: 'revenu', label: 'Générer un revenu supplémentaire', value: 'revenu', icon: '💰' },
        { id: 'reconversion', label: 'Me reconvertir professionnellement', value: 'reconversion', icon: '🔄' }
      ]
    },
    {
      id: 2,
      question: "Quels domaines vous passionnent ? (Plusieurs choix possibles)",
      type: 'multiple',
      category: 'interet',
      options: [
        { id: 'dev-web', label: 'Développement Web & Applications', value: 'dev-web', icon: '💻' },
        { id: 'crypto', label: 'Crypto-monnaies & Blockchain', value: 'crypto', icon: '₿' },
        { id: 'marketing', label: 'Marketing Digital & Réseaux Sociaux', value: 'marketing', icon: '📱' },
        { id: 'ecommerce', label: 'E-commerce & Vente en ligne', value: 'ecommerce', icon: '🛒' },
        { id: 'data', label: 'Data Science & Intelligence Artificielle', value: 'data', icon: '📊' },
        { id: 'design', label: 'Design UX/UI & Création', value: 'design', icon: '🎨' },
        { id: 'cybersec', label: 'Cybersécurité', value: 'cybersec', icon: '🔒' },
        { id: 'gestion', label: 'Gestion de Projets Digitaux', value: 'gestion', icon: '📋' }
      ]
    },
    {
      id: 3,
      question: "Quel est votre niveau d'expérience dans le numérique ?",
      type: 'single',
      category: 'experience',
      options: [
        { id: 'debutant', label: 'Débutant complet - Je pars de zéro', value: 'debutant', icon: '🌱' },
        { id: 'bases', label: 'J\'ai quelques bases', value: 'bases', icon: '📚' },
        { id: 'autodidacte', label: 'Autodidacte - J\'ai appris seul(e)', value: 'autodidacte', icon: '🎯' },
        { id: 'professionnel', label: 'Professionnel - J\'ai de l\'expérience', value: 'professionnel', icon: '⭐' }
      ]
    }
  ];

  private currentQuizResponses = new BehaviorSubject<QuizResponse[]>([]);
  private quizResult = new BehaviorSubject<QuizResult | null>(null);

  constructor() {}

  getQuestions(): QuizQuestion[] {
    return this.quizQuestions;
  }

  saveResponse(response: QuizResponse): void {
    const currentResponses = this.currentQuizResponses.value;
    const existingIndex = currentResponses.findIndex(r => r.questionId === response.questionId);
    
    if (existingIndex !== -1) {
      currentResponses[existingIndex] = response;
    } else {
      currentResponses.push(response);
    }
    
    this.currentQuizResponses.next(currentResponses);
  }

  getResponses(): Observable<QuizResponse[]> {
    return this.currentQuizResponses.asObservable();
  }

  calculateResult(): QuizResult {
    const responses = this.currentQuizResponses.value;
    
    const objectifResponse = responses.find(r => r.questionId === 1);
    const interetResponse = responses.find(r => r.questionId === 2);
    const experienceResponse = responses.find(r => r.questionId === 3);

    const objectif = objectifResponse?.answer as string || '';
    const interets = Array.isArray(interetResponse?.answer) 
      ? interetResponse.answer 
      : [interetResponse?.answer as string];
    const experience = experienceResponse?.answer as string || '';

    const recommendedPath = this.getRecommendedPath(objectif, interets, experience);
    const personalizedMessage = this.generatePersonalizedMessage(objectif, interets, experience, recommendedPath);

    const result: QuizResult = {
      objectif,
      interet: interets,
      experience,
      recommendedPath,
      personalizedMessage
    };

    this.quizResult.next(result);
    return result;
  }

  private getRecommendedPath(objectif: string, interets: string[], experience: string): FormationPath {
    // Logique de recommandation basée sur les réponses
    const primaryInterest = interets[0] || 'dev-web';
    
    const pathsMap: { [key: string]: FormationPath } = {
      'dev-web': {
        id: 'fullstack-web',
        title: 'Développeur Web Full-Stack',
        description: 'Maîtrisez Angular, Node.js et créez des applications web complètes et modernes',
        duration: '6 mois',
        difficulty: experience === 'debutant' ? 'debutant' : 'intermediaire',
        mentorRequired: true,
        modules: [
          {
            id: 'mod1',
            title: 'Fondamentaux du Web',
            description: 'HTML, CSS, JavaScript - Créez votre première page web',
            duration: '3 semaines',
            order: 1,
            microProjects: [
              {
                id: 'mp1',
                title: 'Page Web Personnelle',
                description: 'Créez votre CV en ligne interactif',
                estimatedTime: '2 jours',
                deliverable: 'Site web déployé',
                isGameified: true
              }
            ]
          },
          {
            id: 'mod2',
            title: 'Framework Angular',
            description: 'Développez des applications web modernes avec Angular',
            duration: '6 semaines',
            order: 2,
            prerequisites: ['mod1'],
            microProjects: [
              {
                id: 'mp2',
                title: 'Application Todo Interactive',
                description: 'Créez une application de gestion de tâches',
                estimatedTime: '1 semaine',
                deliverable: 'Application fonctionnelle',
                isGameified: true
              }
            ]
          }
        ]
      },
      'crypto': {
        id: 'crypto-trading',
        title: 'Spécialiste Crypto & Blockchain',
        description: 'Maîtrisez le trading, la blockchain et les smart contracts',
        duration: '4 mois',
        difficulty: experience === 'debutant' ? 'debutant' : 'intermediaire',
        mentorRequired: true,
        modules: [
          {
            id: 'cmod1',
            title: 'Introduction aux Cryptos',
            description: 'Comprendre Bitcoin, Ethereum et l\'écosystème crypto',
            duration: '2 semaines',
            order: 1,
            microProjects: [
              {
                id: 'cmp1',
                title: 'Première Transaction Test',
                description: 'Effectuez une transaction test sur Binance Testnet',
                estimatedTime: '1 jour',
                deliverable: 'Transaction validée',
                isGameified: true
              }
            ]
          }
        ]
      },
      'marketing': {
        id: 'marketing-digital',
        title: 'Responsable Marketing Digital',
        description: 'SEO, SEA, Social Media et stratégies digitales',
        duration: '5 mois',
        difficulty: experience === 'debutant' ? 'debutant' : 'intermediaire',
        mentorRequired: true,
        modules: [
          {
            id: 'mmod1',
            title: 'Fondamentaux du Marketing Digital',
            description: 'Stratégies, outils et métriques essentielles',
            duration: '3 semaines',
            order: 1,
            microProjects: [
              {
                id: 'mmp1',
                title: 'Campagne Social Media',
                description: 'Créez et lancez votre première campagne',
                estimatedTime: '3 jours',
                deliverable: 'Campagne active avec métriques',
                isGameified: true
              }
            ]
          }
        ]
      },
      'ecommerce': {
        id: 'ecommerce-specialist',
        title: 'E-Commerçant Professionnel',
        description: 'Créez et gérez votre boutique en ligne rentable',
        duration: '4 mois',
        difficulty: experience === 'debutant' ? 'debutant' : 'intermediaire',
        mentorRequired: true,
        modules: [
          {
            id: 'emod1',
            title: 'Lancer sa Boutique en Ligne',
            description: 'Shopify, WooCommerce et stratégies de vente',
            duration: '2 semaines',
            order: 1,
            microProjects: [
              {
                id: 'emp1',
                title: 'Page Produit Professionnelle',
                description: 'Créez une page de vente optimisée',
                estimatedTime: '2 jours',
                deliverable: 'Page de vente déployée',
                isGameified: true
              }
            ]
          }
        ]
      },
      'data': {
        id: 'data-scientist',
        title: 'Data Analyst / Scientiste des Données',
        description: 'Python, analyse de données et Machine Learning',
        duration: '7 mois',
        difficulty: 'intermediaire',
        mentorRequired: true,
        modules: []
      },
      'design': {
        id: 'ux-ui-designer',
        title: 'UX/UI Designer',
        description: 'Figma, design thinking et expérience utilisateur',
        duration: '5 mois',
        difficulty: experience === 'debutant' ? 'debutant' : 'intermediaire',
        mentorRequired: true,
        modules: []
      },
      'cybersec': {
        id: 'cybersecurity',
        title: 'Spécialiste en Cybersécurité',
        description: 'Sécurité réseau, ethical hacking et protection des données',
        duration: '8 mois',
        difficulty: 'avance',
        mentorRequired: true,
        modules: []
      },
      'gestion': {
        id: 'project-manager',
        title: 'Gestionnaire de Projet Digital',
        description: 'Scrum, Agile et gestion d\'équipes tech',
        duration: '4 mois',
        difficulty: 'intermediaire',
        mentorRequired: true,
        modules: []
      }
    };

    return pathsMap[primaryInterest] || pathsMap['dev-web'];
  }

  private generatePersonalizedMessage(objectif: string, interets: string[], experience: string, path: FormationPath): string {
    const objectifMessages: { [key: string]: string } = {
      'emploi': 'Excellent ! Votre objectif de trouver un emploi dans le numérique est à portée de main.',
      'entrepreneuriat': 'Fantastique ! Votre esprit entrepreneurial va transformer vos idées en réalité.',
      'revenu': 'Parfait ! Générer un revenu supplémentaire est un objectif concret et atteignable.',
      'reconversion': 'Bravo ! Votre reconversion professionnelle commence aujourd\'hui.'
    };

    const experienceMessages: { [key: string]: string } = {
      'debutant': 'Pas de souci, nous commençons depuis les bases avec un accompagnement personnalisé.',
      'bases': 'Vos connaissances de base sont un excellent tremplin pour progresser rapidement.',
      'autodidacte': 'Votre capacité d\'apprentissage autonome est un atout majeur pour réussir.',
      'professionnel': 'Votre expérience professionnelle vous permettra d\'avancer rapidement.'
    };

    return `
      ${objectifMessages[objectif] || objectifMessages['emploi']}
      
      Votre passion pour ${this.getInterestLabel(interets[0])} est remarquable ! 
      ${experienceMessages[experience] || experienceMessages['debutant']}
      
      Nous avons conçu pour vous le parcours "${path.title}" qui correspond parfaitement à votre profil.
      
      🎯 Durée estimée : ${path.duration}
      🚀 Premier résultat tangible : ${path.modules[0]?.microProjects[0]?.estimatedTime || '1 semaine'}
      👨‍🏫 Accompagnement mentor : Inclus
      
      Votre premier micro-projet "${path.modules[0]?.microProjects[0]?.title}" vous permettra de créer quelque chose de concret dès le début !
      
      Prêt(e) à transformer votre passion en compétence monétisable ? 🚀
    `.trim();
  }

  private getInterestLabel(interest: string): string {
    const labels: { [key: string]: string } = {
      'dev-web': 'le développement web',
      'crypto': 'les crypto-monnaies',
      'marketing': 'le marketing digital',
      'ecommerce': 'l\'e-commerce',
      'data': 'la data science',
      'design': 'le design UX/UI',
      'cybersec': 'la cybersécurité',
      'gestion': 'la gestion de projets'
    };
    return labels[interest] || 'le numérique';
  }

  getQuizResult(): Observable<QuizResult | null> {
    return this.quizResult.asObservable();
  }

  resetQuiz(): void {
    this.currentQuizResponses.next([]);
    this.quizResult.next(null);
  }
}
