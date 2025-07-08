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

  categories = ['Tous', 'Formation', 'E-book', 'Template', 'Service'];
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
    // Animation ou notification
  }

  getDiscount(product: any): number {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }
}