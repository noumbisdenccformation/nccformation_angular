// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common'; 
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Observable } from 'rxjs'; // N'oubliez pas cet import !

// NOUVEAUX IMPORTS POUR LA LOGIQUE D'AUTHENTIFICATION AVEC DÉLAI
import { DelayService } from './shared/delay'; 
import { AuthComponent } from './auth/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    RouterOutlet, 
    Header, 
    Footer,
    AsyncPipe,      
    AuthComponent   
  ]
})
export class App {
  protected title = 'ncc-frontend';

  // 1. DÉCLARATION PROPRE : Indique que la propriété est un Observable<boolean> 
  // et sera initialisée dans le constructeur.
  showAuthModal$: Observable<boolean>; 

  constructor(private delayService: DelayService) {
    // 2. INITIALISATION DANS LE CONSTRUCTEUR : Assure que delayService est disponible.
    this.showAuthModal$ = this.delayService.showAuth$;
  }
  
  // Méthode appelée pour fermer la modale
  closeModal() {
    this.delayService.closeAuth();
  }
}