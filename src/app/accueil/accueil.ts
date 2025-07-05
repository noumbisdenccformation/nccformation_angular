import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements AfterViewInit {
  fruits = [
    // Première série d'images
    { title: 'kiwi', imageUrl: 'assets/img/dress2.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique1.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique2.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource1.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource2.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements1.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements2.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto1.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto2.png' },
    { title: 'Web', imageUrl: 'assets/img/web1.png' },
    { title: 'Web', imageUrl: 'assets/img/web2.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formations1.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formation2.png' },
    // Deuxième série d'images (duplication pour défilement continu)
    { title: 'kiwi', imageUrl: 'assets/img/dress2.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique1.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique2.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource1.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource2.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements1.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements2.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto1.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto2.png' },
    { title: 'Web', imageUrl: 'assets/img/web1.png' },
    { title: 'Web', imageUrl: 'assets/img/web2.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formations1.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formation2.png' },
    // Troisième série d'images (pour un défilement encore plus fluide)
    { title: 'kiwi', imageUrl: 'assets/img/dress2.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique1.png' },
    { title: 'Boutique', imageUrl: 'assets/img/boutique2.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource1.png' },
    { title: 'Ressource', imageUrl: 'assets/img/ressource2.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements1.png' },
    { title: 'Evenements', imageUrl: 'assets/img/evenements2.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto1.png' },
    { title: 'Crypto', imageUrl: 'assets/img/crypto2.png' },
    { title: 'Web', imageUrl: 'assets/img/web1.png' },
    { title: 'Web', imageUrl: 'assets/img/web2.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formations1.png' },
    { title: 'Coaching', imageUrl: 'assets/img/formation2.png' }
  ];

  ngAfterViewInit() {
    // No direct DOM manipulation needed, handled in template
  }
}
