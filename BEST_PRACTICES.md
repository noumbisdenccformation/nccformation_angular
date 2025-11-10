# 🎯 Bonnes Pratiques Angular - NCC-Academy

Guide des bonnes pratiques à suivre pour maintenir un code de qualité.

---

## 🔄 Gestion des Observables

### ✅ TOUJOURS désabonner les subscriptions

```typescript
// ❌ MAUVAIS - Memory leak
export class MyComponent implements OnInit {
  ngOnInit() {
    this.service.getData().subscribe(data => {
      this.data = data;
    });
  }
}

// ✅ BON - Avec takeUntil
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.data = data);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Exceptions où la désinscription n'est PAS nécessaire

1. **HttpClient** - Se désabonne automatiquement
2. **ActivatedRoute.snapshot** - Pas d'observable
3. **Async pipe** - Gère la désinscription automatiquement

```typescript
// ✅ BON - HttpClient se désabonne automatiquement
this.http.get('/api/data').subscribe(...);

// ✅ BON - Async pipe dans le template
{{ data$ | async }}
```

---

## 🛡️ Typage Strict

### ✅ Éviter 'any' autant que possible

```typescript
// ❌ MAUVAIS
quizResult?: any;

// ✅ BON
quizResult?: QuizResult;

export interface QuizResult {
  objectif: string;
  interet: string[];
  experience: string;
  recommendedPathId: string;
  completedAt: Date;
}
```

### ✅ Utiliser des types union pour les valeurs limitées

```typescript
// ❌ MAUVAIS
status: string;

// ✅ BON
status: 'pending' | 'in_progress' | 'completed' | 'rejected';
```

---

## 🎭 Gestion des Erreurs

### ✅ Toujours utiliser try-catch-finally

```typescript
// ❌ MAUVAIS
async onSubmit() {
  this.isLoading = true;
  try {
    await this.service.save();
    this.isLoading = false;  // ❌ Oublié si erreur
  } catch (error) {
    this.error = error.message;
  }
}

// ✅ BON
async onSubmit() {
  this.isLoading = true;
  this.error = null;
  
  try {
    await this.service.save();
    this.router.navigate(['/success']);
  } catch (error: any) {
    this.error = error?.message || 'Une erreur est survenue';
    console.error('Erreur lors de la sauvegarde:', error);
  } finally {
    this.isLoading = false;  // ✅ Toujours exécuté
  }
}
```

### ✅ Gérer les erreurs HTTP avec catchError

```typescript
getData(): Observable<Data[]> {
  return this.http.get<Data[]>('/api/data').pipe(
    catchError(error => {
      console.error('Erreur HTTP:', error);
      return of([]);  // Valeur par défaut
    })
  );
}
```

---

## 📝 Validation des Formulaires

### ✅ Utiliser Reactive Forms avec validation

```typescript
// ✅ BON
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [
    Validators.required, 
    Validators.pattern(/^(\+?237|237)?[6][0-9]{8}$/)
  ]],
  password: ['', [Validators.required, Validators.minLength(6)]]
}, { validators: this.customValidator });
```

### ✅ Afficher les erreurs de manière user-friendly

```typescript
getErrorMessage(fieldName: string): string {
  const control = this.form.get(fieldName);
  
  if (!control || !control.touched) return '';

  if (control.hasError('required')) {
    return 'Ce champ est requis';
  }
  if (control.hasError('email')) {
    return 'Email invalide';
  }
  if (control.hasError('minlength')) {
    const minLength = control.errors?.['minlength'].requiredLength;
    return `Minimum ${minLength} caractères`;
  }
  
  return '';
}
```

---

## 🏗️ Architecture des Composants

### ✅ Composants Smart vs Dumb

```typescript
// ✅ Smart Component (Container)
@Component({
  selector: 'app-formation-page',
  template: `
    <app-formation-list 
      [formations]="formations$ | async"
      (select)="onSelect($event)">
    </app-formation-list>
  `
})
export class FormationPageComponent {
  formations$ = this.service.getFormations();
  
  onSelect(id: string) {
    this.router.navigate(['/formation', id]);
  }
}

// ✅ Dumb Component (Presentational)
@Component({
  selector: 'app-formation-list',
  template: `...`
})
export class FormationListComponent {
  @Input() formations: Formation[] = [];
  @Output() select = new EventEmitter<string>();
}
```

---

## 🚀 Performance

### ✅ Utiliser OnPush Change Detection

```typescript
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class MyComponent {
  // Utiliser des Observables ou Signals
  data$ = this.service.getData();
}
```

### ✅ TrackBy pour les listes

```typescript
// Template
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>

// Component
trackById(index: number, item: Formation): string {
  return item.id;
}
```

### ✅ Lazy Loading des modules

```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'formation',
    loadComponent: () => import('./formation/formation').then(m => m.Formation)
  }
];
```

---

## 🔐 Sécurité

### ✅ Ne JAMAIS stocker de données sensibles en clair

```typescript
// ❌ MAUVAIS
localStorage.setItem('password', password);

// ✅ BON
// Laisser Firebase gérer l'authentification
await signInWithEmailAndPassword(auth, email, password);
```

### ✅ Valider côté serveur ET client

```typescript
// Client (Angular)
if (!this.isValidEmail(email)) {
  return;
}

// Serveur (Firebase Functions)
if (!admin.auth().validateEmail(email)) {
  throw new Error('Email invalide');
}
```

### ✅ Utiliser des Guards pour protéger les routes

```typescript
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/connexion']);
  return false;
};
```

---

## 📦 Organisation du Code

### ✅ Structure des dossiers

```
src/app/
├── core/                 # Services singleton, guards, interceptors
│   ├── services/
│   ├── guards/
│   └── interceptors/
├── shared/              # Composants, directives, pipes partagés
│   ├── components/
│   ├── directives/
│   └── pipes/
├── features/            # Modules de fonctionnalités
│   ├── formation/
│   ├── quiz/
│   └── auth/
└── models/              # Interfaces et types
```

### ✅ Nommage des fichiers

```
formation.component.ts   // ❌ Ancien style
formation.ts            // ✅ Nouveau style (standalone)

formation.service.ts    // ✅ Services
formation.model.ts      // ✅ Modèles
auth.guard.ts          // ✅ Guards
```

---

## 🧪 Tests

### ✅ Tester les cas critiques

```typescript
describe('AuthService', () => {
  it('should register a new user', async () => {
    const user = await service.register(
      'test@test.com',
      'password123',
      '237612345678',
      'John',
      'Doe'
    );
    
    expect(user).toBeDefined();
    expect(user.email).toBe('test@test.com');
  });

  it('should throw error if email already exists', async () => {
    await expectAsync(
      service.register('existing@test.com', 'pass', '237612345678', 'John', 'Doe')
    ).toBeRejectedWithError('Cette adresse email est déjà utilisée');
  });
});
```

---

## 📱 Responsive Design

### ✅ Utiliser TailwindCSS ou CSS Grid/Flexbox

```html
<!-- ✅ BON - Responsive avec Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div *ngFor="let formation of formations">
    {{ formation.title }}
  </div>
</div>
```

---

## 🎨 Accessibilité

### ✅ Ajouter des labels ARIA

```html
<!-- ✅ BON -->
<button 
  aria-label="Fermer le modal"
  (click)="close()">
  <i class="icon-close"></i>
</button>

<input 
  type="text"
  aria-describedby="email-error"
  [attr.aria-invalid]="emailControl.invalid">
<span id="email-error" *ngIf="emailControl.invalid">
  Email invalide
</span>
```

---

## 📊 Monitoring et Logging

### ✅ Logger les erreurs importantes

```typescript
// ✅ BON
try {
  await this.service.criticalOperation();
} catch (error) {
  console.error('Erreur critique:', {
    error,
    userId: this.currentUser?.id,
    timestamp: new Date(),
    context: 'CriticalOperation'
  });
  
  // Envoyer à un service de monitoring (Sentry, LogRocket)
  this.errorTracker.captureException(error);
}
```

---

## 🔄 État de l'Application

### ✅ Utiliser des Signals (Angular 16+)

```typescript
// ✅ BON - Avec Signals
export class MyComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
```

### ✅ Ou BehaviorSubject pour les versions antérieures

```typescript
// ✅ BON - Avec BehaviorSubject
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);
  public data$ = this.dataSubject.asObservable();

  updateData(data: Data[]) {
    this.dataSubject.next(data);
  }
}
```

---

## 📝 Checklist Avant Commit

- [ ] Aucun `console.log` inutile
- [ ] Aucun type `any` (sauf justifié)
- [ ] Toutes les subscriptions sont désabonnées
- [ ] Gestion d'erreurs avec try-catch-finally
- [ ] Validation des entrées utilisateur
- [ ] Tests unitaires passent
- [ ] Pas d'erreurs ESLint/TSLint
- [ ] Code formaté (Prettier)
- [ ] Commentaires pour le code complexe

---

## 🎓 Ressources Utiles

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular Performance Guide](https://angular.io/guide/performance-best-practices)

---

**Maintenu par:** L'équipe NCC-Academy  
**Dernière mise à jour:** 10 novembre 2025
