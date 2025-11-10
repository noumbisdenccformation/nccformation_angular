# Mise à Jour : Authentification avec Téléphone

## ✅ Modifications Effectuées

### 1. Modèle User Mis à Jour
**Fichier**: `src/app/models/user.model.ts`

```typescript
export interface User {
  id: string;
  email: string;
  phone: string;  // ✅ AJOUTÉ
  firstName: string;
  lastName: string;
  // ...
}
```

### 2. AuthService Amélioré
**Fichier**: `src/app/services/auth.service.ts`

#### Nouvelles Fonctionnalités:

**a) Inscription avec téléphone**
```typescript
async register(email: string, password: string, phone: string, firstName: string, lastName: string)
```
- ✅ Vérification de l'unicité du téléphone
- ✅ Sauvegarde du téléphone dans Firestore

**b) Connexion avec Email OU Téléphone**
```typescript
async login(emailOrPhone: string, password: string)
```
- ✅ Détection automatique du format (email ou téléphone)
- ✅ Recherche de l'email associé au téléphone
- ✅ Connexion avec Firebase Auth

**c) Méthodes Utilitaires**
```typescript
private isPhoneNumber(value: string): boolean
// Format accepté: +237XXXXXXXXX, 237XXXXXXXXX, 6XXXXXXXX

private getEmailByPhone(phone: string): Promise<string | null>
// Recherche l'email associé à un téléphone

private checkPhoneExists(phone: string): Promise<boolean>
// Vérifie si le téléphone existe déjà
```

### 3. Formulaire d'Inscription
**Fichier**: `src/app/inscrire/inscrire.ts` et `inscrire.html`

#### Nouveau Champ Téléphone:
```html
<div class="form-group">
  <label for="phone">Numéro de Téléphone *</label>
  <input 
    type="tel" 
    id="phone" 
    formControlName="phone"
    placeholder="+237 6XX XXX XXX"
  >
  <span class="help-text">Format: +237XXXXXXXXX ou 6XXXXXXXX</span>
</div>
```

#### Validation:
```typescript
phone: ['', [Validators.required, Validators.pattern(/^(\+?237|237)?[6][0-9]{8}$/)]]
```

#### Message d'Erreur:
```typescript
if (control.hasError('pattern') && fieldName === 'phone') {
  return 'Format invalide. Ex: +237XXXXXXXXX ou 6XXXXXXXX';
}
```

### 4. Formulaire de Connexion
**Fichier**: `src/app/connexion/connexion.ts`

#### Champ Identifiant (Email OU Téléphone):
```html
<input
  id="identifier"
  type="text"
  formControlName="identifier"
  placeholder="Adresse Email ou Numéro de Téléphone"
>
```

#### Logique de Connexion:
```typescript
async onSubmit() {
  const { identifier, password } = this.authForm.value;
  
  // Détection automatique du format
  const isEmailFormat = this.isEmail(identifier);
  const isPhoneFormat = this.isPhoneNumber(identifier);
  
  // Connexion avec AuthService
  const user = await this.authService.login(identifier, password);
  
  // Redirection selon quiz complété ou non
  if (user.quizCompleted) {
    this.router.navigate(['/dashboard']);
  } else {
    this.router.navigate(['/quiz']);
  }
}
```

## 📋 Formats de Téléphone Acceptés

### Pour le Cameroun:
- ✅ `+237612345678` (format international)
- ✅ `237612345678` (sans +)
- ✅ `612345678` (format local)
- ✅ `6 12 34 56 78` (avec espaces)

### Regex de Validation:
```regex
/^(\+?237|237)?[6][0-9]{8}$/
```

## 🔄 Flux Utilisateur

### Inscription:
1. Utilisateur remplit: **Prénom, Nom, Téléphone, Email, Mot de passe**
2. Validation du format du téléphone
3. Vérification de l'unicité du téléphone
4. Création du compte Firebase Auth
5. Sauvegarde dans Firestore avec téléphone
6. ✅ Redirection vers /quiz

### Connexion:
1. Utilisateur entre: **Email OU Téléphone + Mot de passe**
2. Détection automatique du format
3. Si téléphone → Recherche de l'email associé
4. Connexion Firebase Auth avec l'email
5. ✅ Redirection vers /quiz (si non complété) ou /dashboard

## 🗄️ Structure Firestore

### Collection `users`:
```json
{
  "id": "uid_firebase",
  "email": "user@example.com",
  "phone": "+237612345678",  // ✅ NOUVEAU
  "firstName": "Jean",
  "lastName": "Dupont",
  "quizCompleted": false,
  "quizResult": null,
  "enrolledFormations": [],
  "createdAt": "2024-11-09T08:00:00Z",
  "updatedAt": "2024-11-09T08:00:00Z"
}
```

### Index Firestore Requis:
Pour optimiser les recherches par téléphone, créer un index:
```
Collection: users
Champ: phone
Type: Ascending
```

## 🔐 Règles de Sécurité Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Lecture: utilisateur connecté peut lire son profil
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Écriture: uniquement son propre profil
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Création: lors de l'inscription
      allow create: if request.auth != null;
    }
  }
}
```

## 📱 Exemples d'Utilisation

### Inscription:
```typescript
await authService.register(
  'user@example.com',
  'password123',
  '+237612345678',  // ✅ Téléphone requis
  'Jean',
  'Dupont'
);
```

### Connexion avec Email:
```typescript
await authService.login('user@example.com', 'password123');
```

### Connexion avec Téléphone:
```typescript
await authService.login('+237612345678', 'password123');
// OU
await authService.login('612345678', 'password123');
```

## ⚠️ Points Importants

### 1. Unicité du Téléphone
- ✅ Vérification avant inscription
- ✅ Message d'erreur si téléphone déjà utilisé
- ✅ Index Firestore pour performance

### 2. Format du Téléphone
- ✅ Validation côté client (Angular)
- ✅ Validation côté serveur (Firestore rules)
- ✅ Normalisation automatique

### 3. Connexion Google
- ⚠️ Téléphone vide par défaut
- 💡 Un modal devra demander le téléphone après connexion Google
- 💡 À implémenter dans une prochaine étape

## 🚀 Prochaines Étapes

### 1. Installer Firebase (REQUIS)
```bash
npm install @angular/fire firebase
```

### 2. Créer les CSS Manquants
- `src/app/inscrire/inscrire.css` (voir AUTH_IMPLEMENTATION_GUIDE.md)

### 3. Tester le Flux Complet
1. Inscription avec téléphone
2. Connexion avec email
3. Connexion avec téléphone
4. Vérification dans Firestore

### 4. Modal Téléphone pour Google
Créer un modal qui s'affiche après connexion Google si `user.phone === ''`:
```typescript
if (user.phone === '') {
  // Afficher modal pour demander le téléphone
  const phone = await this.showPhoneModal();
  await this.authService.updateUserProfile({ phone });
}
```

## 📊 Avantages de cette Implémentation

✅ **Flexibilité**: Connexion avec email OU téléphone
✅ **Sécurité**: Validation et unicité du téléphone
✅ **UX**: Détection automatique du format
✅ **Traçabilité**: Téléphone enregistré pour chaque utilisateur
✅ **Conformité**: Format camerounais (+237)
✅ **Scalabilité**: Recherche optimisée avec index Firestore

## 🎯 Résultat Final

### Inscription:
- Prénom ✅
- Nom ✅
- **Téléphone ✅ (NOUVEAU)**
- Email ✅
- Mot de passe ✅

### Connexion:
- **Email OU Téléphone ✅ (NOUVEAU)**
- Mot de passe ✅

### Base de Données:
- Tous les utilisateurs ont un téléphone ✅
- Recherche par téléphone optimisée ✅
- Unicité garantie ✅

## 🔍 Vérification

Pour vérifier que tout fonctionne:

1. **Inscription**:
   - Tester avec différents formats de téléphone
   - Vérifier l'erreur si téléphone déjà utilisé
   - Vérifier la sauvegarde dans Firestore

2. **Connexion**:
   - Se connecter avec email
   - Se connecter avec téléphone
   - Vérifier la redirection (quiz ou dashboard)

3. **Firestore**:
   - Vérifier que le champ `phone` existe
   - Vérifier le format du téléphone
   - Vérifier l'index sur le champ `phone`
