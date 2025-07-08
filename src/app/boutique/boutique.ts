import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique.html',
  styleUrls: ['./boutique.css']
})
export class Boutique {
  products = [
    {
      id: 1,
      name: 'Pack Formation Complète',
      description: 'Accès à toutes nos formations + coaching personnalisé',
      price: 299000,
      originalPrice: 479000,
      image: 'assets/img/boutique1.png',
      category: 'Formation',
      rating: 4.9,
      reviews: 156,
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'EduTime Pro - Gestion Emploi du Temps',
      description: 'Application complète de gestion des emplois du temps scolaires pour tous niveaux',
      price: 0,
      originalPrice: 0,
      image: 'assets/img/formations1.png',
      category: 'Application',
      rating: 4.9,
      reviews: 342,
      badge: 'Innovation',
      isSpecial: true,
      packs: [
        { name: 'Gratuit', price: 0, priceText: 'Gratuit', features: ['Génération emplois du temps', 'Un enseignant par matière', 'Pas d\'impression/téléchargement'] },
        { name: 'Professionnel', price: 20000, priceText: '20 000 FCFA/an', features: ['Toutes fonctionnalités', 'Gestion salles labo', 'Plusieurs enseignants/matière', 'Export PDF', 'Cours troncs communs'] },
        { name: 'VIP', price: 0, priceText: 'Sur devis', features: ['Personnalisation complète', 'Gestion examens', 'Support prioritaire', 'Fonctionnalités sur mesure'] }
      ]
    },
    {
      id: 3,
      name: 'Template Site Web Pro',
      description: 'Templates professionnels prêts à utiliser',
      price: 59000,
      originalPrice: 89000,
      image: 'assets/img/web2.png',
      category: 'Template',
      rating: 4.8,
      reviews: 234,
      badge: 'Populaire'
    },
    {
      id: 4,
      name: 'Guide Crypto Avancé',
      description: 'E-book complet sur les stratégies d\'investissement crypto',
      price: 29000,
      originalPrice: 47000,
      image: 'assets/img/crypto2.png',
      category: 'E-book',
      rating: 4.7,
      reviews: 89,
      badge: 'Nouveau'
    },
    {
      id: 5,
      name: 'Consultation 1h',
      description: 'Séance de coaching personnalisé avec un expert',
      price: 53000,
      originalPrice: 72000,
      image: 'assets/img/formation2.png',
      category: 'Service',
      rating: 5.0,
      reviews: 67,
      badge: 'Premium'
    }
  ];

  categories = ['Tous', 'Formation', 'Application', 'E-book', 'Template', 'Service'];
  selectedCategory = 'Tous';
  cart: any[] = [];

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  getFilteredProducts() {
    if (this.selectedCategory === 'Tous') {
      return this.products;
    }
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: any) {
    this.cart.push(product);
  }

  tryProduct(product: any) {
    window.open('https://edutime-pro.vercel.app', '_blank');
  }

  getDiscount(product: any): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }
}// Updated mar. 08 juil. 2025 13:14:45 WAT
