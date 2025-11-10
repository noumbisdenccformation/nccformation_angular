import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockAuthService } from '../services/mock-auth.service';

/**
 * Guard d'authentification
 * Protège les routes qui nécessitent une connexion
 */
export const authGuard = () => {
  const authService = inject(MockAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Rediriger vers la page de connexion si non authentifié
  console.warn('⚠️ Accès refusé - Redirection vers /connexion');
  router.navigate(['/connexion']);
  return false;
};
