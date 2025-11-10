# Guide d'Implémentation de l'Authentification NCC-Academy

## ✅ Ce qui a été créé

### 1. Service d'Authentification (`auth.service.ts`)
- ✅ Inscription avec email/password
- ✅ Connexion avec email/password
- ✅ Connexion avec Google
- ✅ Déconnexion
- ✅ Réinitialisation de mot de passe
- ✅ Gestion du profil utilisateur
- ✅ Sauvegarde des résultats du quiz
- ✅ Récupération de tous les utilisateurs (admin)
- ✅ Statistiques utilisateurs

### 2. Composant d'Inscription (`/inscrire`)
- ✅ Formulaire réactif avec validation
- ✅ Champs: Prénom, Nom, Email, Password, Confirmation
- ✅ Validation en temps réel
- ✅ Messages d'erreur personnalisés
- ✅ Bouton Google Sign-In
- ✅ Checkbox conditions d'utilisation
- ✅ Redirection vers /quiz après inscription

### 3. Configuration Firebase
- ✅ Firebase ajouté dans `app.config.ts`
- ✅ Auth et Firestore configurés
- ✅ Variables d'environnement prêtes

## 🔧 À COMPLÉTER

### Étape 1: Installer les dépendances Firebase

```bash
npm install @angular/fire firebase
```

### Étape 2: Créer le CSS pour l'inscription

Créer `src/app/inscrire/inscrire.css` avec le contenu suivant:

```css
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.register-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.register-header h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #718096;
  font-size: 1.1rem;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.register-form {
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #e53e3e;
}

.error-text {
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.5rem;
}

.checkbox-group {
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-top: 0.25rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-label span {
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;
}

.checkbox-label a {
  color: #667eea;
  text-decoration: none;
}

.checkbox-label a:hover {
  text-decoration: underline;
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  text-align: center;
  margin: 2rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #718096;
  position: relative;
  z-index: 1;
}

.btn-google {
  width: 100%;
  background: white;
  color: #2d3748;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.btn-google:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.btn-google i {
  font-size: 1.2rem;
}

.footer-link {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.footer-link p {
  color: #718096;
}

.footer-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.footer-link a:hover {
  text-decoration: underline;
}

.benefits {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
}

.benefit-item i {
  color: #48bb78;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .register-card {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .register-header h1 {
    font-size: 1.5rem;
  }
}
```

### Étape 3: Créer le composant de Connexion

Créer `src/app/connexion/connexion.ts`:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authService.login(email, password);
      
      // Rediriger selon si le quiz est complété
      if (user.quizCompleted) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      this.isLoading = false;
    }
  }

  async loginWithGoogle() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const user = await this.authService.loginWithGoogle();
      
      if (user.quizCompleted) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/quiz']);
      }
    } catch (error: any) {
      this.errorMessage = error.message;
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    
    if (!control || !control.touched) return '';

    if (control.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (control.hasError('email')) {
      return 'Email invalide';
    }

    return '';
  }
}
```

### Étape 4: Créer le Guard pour protéger les routes

Créer `src/app/guards/auth.guard.ts`:

```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Rediriger vers la page de connexion
  router.navigate(['/connexion']);
  return false;
};
```

### Étape 5: Protéger les routes dans `app.routes.ts`

```typescript
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'accueil', component: Accueil },
  { path: 'inscrire', loadComponent: () => import('./inscrire/inscrire').then(m => m.Inscrire) },
  { path: 'connexion', loadComponent: () => import('./connexion/connexion').then(m => m.Connexion) },
  
  // Routes protégées - nécessitent une authentification
  { 
    path: 'quiz', 
    loadComponent: () => import('./quiz/quiz').then(m => m.Quiz),
    canActivate: [authGuard]
  },
  { 
    path: 'quiz-result', 
    loadComponent: () => import('./quiz-result/quiz-result').then(m => m.QuizResult),
    canActivate: [authGuard]
  },
  { 
    path: 'formation/:id', 
    loadComponent: () => import('./formation/formation').then(m => m.Formation),
    canActivate: [authGuard]
  },
  
  // ... autres routes
];
```

### Étape 6: Mettre à jour le Quiz pour sauvegarder les résultats

Dans `quiz.service.ts`, ajouter:

```typescript
import { AuthService } from './auth.service';

constructor(private authService: AuthService) {}

async saveQuizResult(result: QuizResult): Promise<void> {
  await this.authService.markQuizCompleted(result);
}
```

### Étape 7: Modifier la page d'accueil

Remplacer le bouton "Commencer le Test Gratuit" pour rediriger vers l'inscription si non connecté:

```typescript
// Dans accueil.ts
constructor(
  private router: Router,
  private authService: AuthService
) {}

startQuiz() {
  if (this.authService.isAuthenticated()) {
    this.router.navigate(['/quiz']);
  } else {
    this.router.navigate(['/inscrire']);
  }
}
```

## 📊 Flux Utilisateur

### Nouveau Visiteur:
1. Arrive sur la page d'accueil
2. Clique sur "Commencer le Test Gratuit"
3. **Redirigé vers /inscrire**
4. Remplit le formulaire d'inscription
5. **Compte créé dans Firebase**
6. **Automatiquement redirigé vers /quiz**
7. Complète le quiz
8. Voit ses résultats personnalisés
9. Peut s'inscrire aux formations

### Utilisateur Existant:
1. Clique sur "Se connecter"
2. Entre email/password ou utilise Google
3. **Si quiz non complété** → Redirigé vers /quiz
4. **Si quiz complété** → Redirigé vers /dashboard
5. Accès à toutes les formations

## 🔐 Sécurité

### Règles Firestore à configurer:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // L'utilisateur peut lire et modifier uniquement son propre profil
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Les admins peuvent tout lire
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Formations collection
    match /formations/{formationId} {
      // Tout le monde peut lire les formations
      allow read: if true;
      
      // Seuls les admins peuvent modifier
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 📝 Base de Données Firestore

### Collections:

1. **users**
   - id (auto)
   - email
   - firstName
   - lastName
   - profileImage
   - quizCompleted
   - quizResult
   - enrolledFormations[]
   - createdAt
   - updatedAt
   - role (user/admin)

2. **formations** (à créer)
   - Toutes les données de formation

3. **enrollments** (à créer)
   - userId
   - formationId
   - enrolledAt
   - progress
   - completedModules[]

## 🎯 Avantages de cette Implémentation

✅ **Sécurité**: Firebase Auth avec validation
✅ **Traçabilité**: Tous les utilisateurs enregistrés dans Firestore
✅ **Personnalisation**: Quiz lié au profil utilisateur
✅ **Scalabilité**: Firebase gère l'infrastructure
✅ **UX**: Flux logique inscription → quiz → formations
✅ **Admin**: Possibilité de voir tous les utilisateurs inscrits
✅ **Multi-plateforme**: Fonctionne sur web, mobile, tablet

## 🚀 Prochaines Étapes

1. ✅ Installer Firebase
2. ✅ Créer les CSS manquants
3. ✅ Créer le composant de connexion
4. ✅ Créer le guard d'authentification
5. ✅ Protéger les routes
6. ✅ Créer le dashboard admin
7. ✅ Lier le quiz au profil utilisateur
8. ✅ Tester le flux complet
