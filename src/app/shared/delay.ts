// src/app/shared/delay.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelayService {
  private showAuthSubject = new BehaviorSubject<boolean>(false);
  showAuth$ = this.showAuthSubject.asObservable();

  constructor() {
    // 10 secondes * 1000 millisecondes/seconde = 10000 ms
    const delayTime = 10 * 1000; 
    
    // Déclenche l'affichage après 10 secondes
    setTimeout(() => {
      this.showAuthSubject.next(true);
      // VÉRIFICATION : Ouvrez la console du navigateur (F12) et cherchez ce message.
      console.log('10 secondes écoulées. Affichage du modal d\'authentification.');
    }, delayTime);
  }

  closeAuth() {
    this.showAuthSubject.next(false);
  }
}