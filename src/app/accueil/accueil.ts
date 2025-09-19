import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
