import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
// Les autres composants seront importés une fois créés

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'boutique', loadComponent: () => import('./boutique/boutique').then(m => m.Boutique) },
  { path: 'ressources', loadComponent: () => import('./ressources/ressources').then(m => m.Ressources) },
  { path: 'evenements', loadComponent: () => import('./evenements/evenements').then(m => m.Evenements) },
  { path: 'crypto', loadComponent: () => import('./crypto/crypto').then(m => m.Crypto) },
  { path: 'web', loadComponent: () => import('./web/web').then(m => m.Web) },
  { path: 'formation', loadComponent: () => import('./formation/formation').then(m => m.Formation) },
  { path: 'coaching', loadComponent: () => import('./coaching/coaching').then(m => m.Coaching) },
  { path: 'numerique', loadComponent: () => import('./numerique/numerique').then(m => m.Numerique) },
  { path: 'connexion', loadComponent: () => import('./connexion/connexion').then(m => m.Connexion) },
  { path: 'inscrire', loadComponent: () => import('./inscrire/inscrire').then(m => m.Inscrire) },
];
