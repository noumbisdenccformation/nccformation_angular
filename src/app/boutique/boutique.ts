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
    // Soins Corporels
    {
      id: 1,
      name: 'Crème Corps Hydratante Longrich',
      description: 'Crème nourrissante à base d\'ingrédients naturels pour une peau douce et éclatante',
      price: 8500,
      originalPrice: 12000,
      image: 'https://via.placeholder.com/400x400/E8F5E9/2E7D32?text=Cr%C3%A8me+Corps',
      category: 'Soins Corporels',
      rating: 4.9,
      reviews: 245,
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Lotion Corporelle Blanchissante',
      description: 'Formule avancée pour unifier le teint et hydrater en profondeur',
      price: 9500,
      originalPrice: 13500,
      image: 'https://via.placeholder.com/400x400/F3E5F5/6A1B9A?text=Lotion+Corps',
      category: 'Soins Corporels',
      rating: 4.8,
      reviews: 189,
      badge: 'Populaire'
    },
    {
      id: 3,
      name: 'Savon Antibactérien Longrich',
      description: 'Savon naturel aux propriétés antibactériennes et purifiantes',
      price: 3500,
      originalPrice: 5000,
      image: 'https://via.placeholder.com/400x400/E1F5FE/01579B?text=Savon',
      category: 'Soins Corporels',
      rating: 4.7,
      reviews: 312,
      badge: 'Nouveau'
    },
    {
      id: 4,
      name: 'Gel Douche Rafraîchissant',
      description: 'Gel douche revitalisant aux extraits naturels',
      price: 6500,
      originalPrice: 9000,
      image: 'https://via.placeholder.com/400x400/E0F2F1/00695C?text=Gel+Douche',
      category: 'Soins Corporels',
      rating: 4.6,
      reviews: 156,
      badge: 'Promo'
    },
    
    // Compléments Alimentaires
    {
      id: 5,
      name: 'Spiruline Longrich - 60 gélules',
      description: 'Complément alimentaire riche en protéines, vitamines et minéraux',
      price: 15000,
      originalPrice: 20000,
      image: 'https://via.placeholder.com/400x400/FFF3E0/E65100?text=Spiruline',
      category: 'Compléments',
      rating: 5.0,
      reviews: 423,
      badge: 'Premium'
    },
    {
      id: 6,
      name: 'Cordyceps Militaris - Immunité',
      description: 'Renforce le système immunitaire et augmente l\'énergie naturellement',
      price: 18000,
      originalPrice: 25000,
      image: 'https://via.placeholder.com/400x400/FBE9E7/BF360C?text=Cordyceps',
      category: 'Compléments',
      rating: 4.9,
      reviews: 298,
      badge: 'Bestseller'
    },
    {
      id: 7,
      name: 'Thé Vert Longrich - Détox',
      description: 'Thé détoxifiant pour purifier l\'organisme et favoriser la perte de poids',
      price: 12000,
      originalPrice: 16000,
      image: 'https://via.placeholder.com/400x400/F1F8E9/558B2F?text=Th%C3%A9+Vert',
      category: 'Compléments',
      rating: 4.8,
      reviews: 367,
      badge: 'Populaire'
    },
    {
      id: 8,
      name: 'Calcium + Zinc - Os & Articulations',
      description: 'Formule complète pour renforcer os et articulations',
      price: 14000,
      originalPrice: 19000,
      image: 'https://via.placeholder.com/400x400/FFF9C4/F57F17?text=Calcium+Zinc',
      category: 'Compléments',
      rating: 4.7,
      reviews: 201,
      badge: 'Nouveau'
    },
    
    // Cosmétiques
    {
      id: 9,
      name: 'Crème Visage Anti-Âge',
      description: 'Crème anti-rides aux peptides et collagène naturel',
      price: 16500,
      originalPrice: 22000,
      image: 'https://via.placeholder.com/400x400/FCE4EC/C2185B?text=Cr%C3%A8me+Visage',
      category: 'Cosmétiques',
      rating: 4.9,
      reviews: 278,
      badge: 'Premium'
    },
    {
      id: 10,
      name: 'Sérum Éclaircissant Visage',
      description: 'Sérum concentré pour un teint lumineux et uniforme',
      price: 13500,
      originalPrice: 18000,
      image: 'https://via.placeholder.com/400x400/F8BBD0/AD1457?text=S%C3%A9rum+Visage',
      category: 'Cosmétiques',
      rating: 4.8,
      reviews: 234,
      badge: 'Bestseller'
    },
    {
      id: 11,
      name: 'Rouge à Lèvres Longue Tenue',
      description: 'Rouge à lèvres mat longue durée, formule hydratante',
      price: 7500,
      originalPrice: 10000,
      image: 'https://via.placeholder.com/400x400/FFEBEE/D32F2F?text=Rouge+L%C3%A8vres',
      category: 'Cosmétiques',
      rating: 4.7,
      reviews: 189,
      badge: 'Populaire'
    },
    {
      id: 12,
      name: 'Mascara Volume Intense',
      description: 'Mascara volumateur pour des cils épais et allongés',
      price: 8500,
      originalPrice: 11500,
      image: 'https://via.placeholder.com/400x400/E8EAF6/3F51B5?text=Mascara',
      category: 'Cosmétiques',
      rating: 4.6,
      reviews: 145,
      badge: 'Nouveau'
    },
    
    // Soins Capillaires
    {
      id: 13,
      name: 'Shampooing Fortifiant',
      description: 'Shampooing aux extraits naturels pour cheveux forts et brillants',
      price: 7000,
      originalPrice: 9500,
      image: 'https://via.placeholder.com/400x400/E3F2FD/1976D2?text=Shampooing',
      category: 'Soins Capillaires',
      rating: 4.8,
      reviews: 267,
      badge: 'Bestseller'
    },
    {
      id: 14,
      name: 'Après-Shampooing Réparateur',
      description: 'Soin profond pour réparer les cheveux abîmés',
      price: 7500,
      originalPrice: 10000,
      image: 'https://via.placeholder.com/400x400/B3E5FC/0277BD?text=Apr%C3%A8s-Shampooing',
      category: 'Soins Capillaires',
      rating: 4.7,
      reviews: 198,
      badge: 'Populaire'
    },
    {
      id: 15,
      name: 'Huile Capillaire Nutritive',
      description: 'Huile naturelle pour nourrir et faire briller les cheveux',
      price: 9000,
      originalPrice: 12000,
      image: 'https://via.placeholder.com/400x400/FFF8E1/F57C00?text=Huile+Capillaire',
      category: 'Soins Capillaires',
      rating: 4.9,
      reviews: 312,
      badge: 'Premium'
    },
    
    // Hygiène
    {
      id: 16,
      name: 'Dentifrice Blancheur',
      description: 'Dentifrice blanchissant aux extraits de plantes',
      price: 4500,
      originalPrice: 6500,
      image: 'https://via.placeholder.com/400x400/E0F7FA/00838F?text=Dentifrice',
      category: 'Hygiène',
      rating: 4.8,
      reviews: 445,
      badge: 'Bestseller'
    },
    {
      id: 17,
      name: 'Déodorant Naturel 48h',
      description: 'Protection longue durée sans aluminium',
      price: 5500,
      originalPrice: 7500,
      image: 'https://via.placeholder.com/400x400/E8F5E9/388E3C?text=D%C3%A9odorant',
      category: 'Hygiène',
      rating: 4.7,
      reviews: 289,
      badge: 'Populaire'
    },
    {
      id: 18,
      name: 'Serviettes Hygiéniques Bio',
      description: 'Serviettes ultra-absorbantes 100% naturelles',
      price: 3500,
      originalPrice: 5000,
      image: 'https://via.placeholder.com/400x400/F3E5F5/7B1FA2?text=Serviettes',
      category: 'Hygiène',
      rating: 4.9,
      reviews: 523,
      badge: 'Premium'
    }
  ];

  categories = ['Tous', 'Soins Corporels', 'Compléments', 'Cosmétiques', 'Soins Capillaires', 'Hygiène'];
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
