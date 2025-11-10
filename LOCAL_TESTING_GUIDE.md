# Guide de Test en Local - NCC-Academy

## 🎯 Objectif

Tester le système d'authentification complet **SANS Firebase** en utilisant localStorage comme base de données temporaire.

## ✅ Ce qui a été mis en place

### 1. MockAuthService
**Fichier**: `src/app/services/mock-auth.service.ts`

Un service qui simule Firebase Auth et Firestore :
- ✅ Sauvegarde dans `localStorage`
- ✅ Inscription avec email + téléphone
- ✅ Connexion avec email OU téléphone
- ✅ Vérification d'unicité (email et téléphone)
- ✅ Gestion de session
- ✅ Déconnexion

### 2. Guard d'Authentification
**Fichier**: `src/app/guards/auth.guard.ts`

Protège les routes qui nécessitent une connexion :
- ✅ `/quiz` - Accessible uniquement si connecté
- ✅ `/quiz-result` - Accessible uniquement si connecté

### 3. Composants Mis à Jour
- ✅ `inscrire.ts` - Utilise MockAuthService
- ✅ `connexion.ts` - Utilise MockAuthService
- ✅ `inscrire.css` - Design moderne complet

## 🚀 Comment Tester

### Étape 1: Lancer l'Application

```bash
cd "d:\Mon projet de stage\nccformation_angular"
ng serve
```

Ouvrir le navigateur sur: `http://localhost:4200`

### Étape 2: Tester l'Inscription

1. Aller sur la page d'accueil
2. Cliquer sur "Commencer le Test Gratuit" (redirige vers `/inscrire`)
3. Remplir le formulaire :
   - **Prénom**: Jean
   - **Nom**: Dupont
   - **Téléphone**: +237612345678 ou 612345678
   - **Email**: jean@example.com
   - **Mot de passe**: password123
   - **Confirmation**: password123
   - ✅ Accepter les conditions

4. Cliquer sur "Créer mon compte"

**Résultat attendu**:
- ✅ Message dans la console: "✅ Inscription réussie (MOCK)"
- ✅ Redirection automatique vers `/quiz`
- ✅ Données sauvegardées dans localStorage

### Étape 3: Vérifier localStorage

Ouvrir la console du navigateur (F12) et taper:

```javascript
// Voir tous les utilisateurs
JSON.parse(localStorage.getItem('ncc_users'))

// Voir l'utilisateur connecté
JSON.parse(localStorage.getItem('ncc_current_user'))
```

**Vous devriez voir**:
```json
{
  "id": "user_1699524000000_abc123",
  "email": "jean@example.com",
  "phone": "+237612345678",
  "firstName": "Jean",
  "lastName": "Dupont",
  "quizCompleted": false,
  "enrolledFormations": [],
  "createdAt": "2024-11-09T08:00:00.000Z",
  "updatedAt": "2024-11-09T08:00:00.000Z"
}
```

### Étape 4: Tester la Protection des Routes

1. Se déconnecter (ou ouvrir en navigation privée)
2. Essayer d'accéder directement à: `http://localhost:4200/quiz`

**Résultat attendu**:
- ⚠️ Message console: "⚠️ Accès refusé - Redirection vers /connexion"
- ✅ Redirection automatique vers `/connexion`

### Étape 5: Tester la Connexion avec Email

1. Aller sur `/connexion`
2. Entrer:
   - **Identifiant**: jean@example.com
   - **Mot de passe**: password123

3. Cliquer sur "Connexion"

**Résultat attendu**:
- ✅ Message console: "✅ Connexion réussie (MOCK)"
- ✅ Redirection vers `/quiz` (si quiz non complété)

### Étape 6: Tester la Connexion avec Téléphone

1. Se déconnecter
2. Aller sur `/connexion`
3. Entrer:
   - **Identifiant**: +237612345678 (ou 612345678)
   - **Mot de passe**: password123

4. Cliquer sur "Connexion"

**Résultat attendu**:
- ✅ Détection automatique du format téléphone
- ✅ Recherche de l'email associé
- ✅ Connexion réussie
- ✅ Redirection vers `/quiz`

### Étape 7: Tester les Validations

#### Téléphone Invalide
Essayer d'inscrire avec:
- `123456` ❌ Trop court
- `712345678` ❌ Ne commence pas par 6
- `abc123456` ❌ Contient des lettres

**Résultat attendu**:
- ❌ Message: "Format invalide. Ex: +237XXXXXXXXX ou 6XXXXXXXX"

#### Email Déjà Utilisé
1. S'inscrire avec `jean@example.com`
2. Se déconnecter
3. Essayer de s'inscrire à nouveau avec le même email

**Résultat attendu**:
- ❌ Message: "Cette adresse email est déjà utilisée"

#### Téléphone Déjà Utilisé
1. S'inscrire avec `+237612345678`
2. Se déconnecter
3. Essayer de s'inscrire à nouveau avec le même téléphone

**Résultat attendu**:
- ❌ Message: "Ce numéro de téléphone est déjà utilisé"

### Étape 8: Tester le Flux Complet

1. **Inscription** → Remplir le formulaire → Créer le compte
2. **Redirection automatique** → `/quiz`
3. **Compléter le quiz** → Voir les résultats
4. **Déconnexion** → Bouton déconnexion (à ajouter)
5. **Reconnexion** → Avec email ou téléphone
6. **Accès au quiz** → Déjà complété, voir résultats

## 🔍 Points de Vérification

### ✅ Inscription
- [ ] Formulaire s'affiche correctement
- [ ] Validation en temps réel fonctionne
- [ ] Téléphone accepte les formats: +237XXXXXXXXX, 237XXXXXXXXX, 6XXXXXXXX
- [ ] Email valide requis
- [ ] Mot de passe minimum 6 caractères
- [ ] Confirmation mot de passe correspond
- [ ] Checkbox conditions requise
- [ ] Bouton Google visible (simulé)
- [ ] Lien "Se connecter" fonctionne

### ✅ Connexion
- [ ] Champ unique pour email OU téléphone
- [ ] Détection automatique du format
- [ ] Connexion avec email fonctionne
- [ ] Connexion avec téléphone fonctionne
- [ ] Message d'erreur si identifiant incorrect
- [ ] Lien "S'inscrire" fonctionne

### ✅ Protection des Routes
- [ ] `/quiz` redirige vers `/connexion` si non connecté
- [ ] `/quiz-result` redirige vers `/connexion` si non connecté
- [ ] Après connexion, accès au quiz autorisé

### ✅ Données localStorage
- [ ] `ncc_users` contient tous les utilisateurs
- [ ] `ncc_current_user` contient l'utilisateur connecté
- [ ] Données persistent après rafraîchissement
- [ ] Déconnexion supprime `ncc_current_user`

## 🎨 Design

### Page d'Inscription
- ✅ Gradient purple/blue en arrière-plan
- ✅ Card blanche centrée avec ombre
- ✅ Animation slide-up à l'ouverture
- ✅ Logo emoji animé (bounce)
- ✅ Inputs avec focus bleu
- ✅ Messages d'erreur en rouge
- ✅ Bouton gradient avec hover effect
- ✅ Séparateur "OU"
- ✅ Bouton Google avec icône
- ✅ Section avantages en bas
- ✅ Responsive mobile

### Page de Connexion
- ✅ Design moderne avec Tailwind
- ✅ Champ unique pour identifiant
- ✅ Toggle mot de passe (afficher/masquer)
- ✅ Messages d'erreur clairs
- ✅ Bouton désactivé pendant chargement

## 🧪 Commandes de Test Console

Ouvrir la console du navigateur (F12) et tester:

```javascript
// Voir tous les utilisateurs
console.table(JSON.parse(localStorage.getItem('ncc_users')))

// Voir l'utilisateur connecté
console.log(JSON.parse(localStorage.getItem('ncc_current_user')))

// Compter les utilisateurs
JSON.parse(localStorage.getItem('ncc_users')).length

// Réinitialiser tout
localStorage.clear()
location.reload()
```

## 📊 Scénarios de Test Complets

### Scénario 1: Nouvel Utilisateur
1. Ouvrir l'app en navigation privée
2. Aller sur `/inscrire`
3. S'inscrire avec de nouvelles données
4. Vérifier la redirection vers `/quiz`
5. Compléter le quiz
6. Vérifier que `quizCompleted: true`

### Scénario 2: Utilisateur Existant
1. Se connecter avec email
2. Vérifier l'accès au quiz
3. Se déconnecter
4. Se reconnecter avec téléphone
5. Vérifier que c'est le même compte

### Scénario 3: Validations
1. Essayer tous les formats de téléphone invalides
2. Essayer un email invalide
3. Essayer un mot de passe trop court
4. Essayer sans accepter les conditions
5. Vérifier tous les messages d'erreur

### Scénario 4: Protection
1. Ouvrir en navigation privée
2. Essayer d'accéder à `/quiz` directement
3. Vérifier la redirection vers `/connexion`
4. Se connecter
5. Vérifier l'accès au quiz

## 🐛 Debugging

### Si l'inscription ne fonctionne pas:
```javascript
// Vérifier les erreurs console
// Vérifier que MockAuthService est bien injecté
// Vérifier localStorage
localStorage.getItem('ncc_users')
```

### Si la connexion ne fonctionne pas:
```javascript
// Vérifier que l'utilisateur existe
JSON.parse(localStorage.getItem('ncc_users')).find(u => u.email === 'test@test.com')

// Vérifier la détection du format
const phone = '+237612345678'
/^\+?[0-9\s-]{8,20}$/.test(phone) // true si téléphone
```

### Si la redirection ne fonctionne pas:
```javascript
// Vérifier l'état d'authentification
JSON.parse(localStorage.getItem('ncc_current_user')) !== null
```

## ✅ Checklist Avant Push GitHub

- [ ] Tous les tests passent
- [ ] Aucune erreur dans la console
- [ ] Design responsive fonctionne
- [ ] Validations fonctionnent
- [ ] Protection des routes fonctionne
- [ ] localStorage fonctionne correctement
- [ ] Messages d'erreur sont clairs
- [ ] Animations sont fluides
- [ ] Code est propre et commenté

## 🚀 Prochaine Étape

Une fois tous les tests validés en local:

1. **Commit les changements**:
```bash
git add .
git commit -m "feat: Système d'authentification avec email et téléphone (Mock)"
```

2. **Push sur GitHub**:
```bash
git push origin main
```

3. **Passer à Firebase**:
- Remplacer `MockAuthService` par `AuthService`
- Configurer Firebase Auth
- Configurer Firestore
- Migrer les données de test

## 📝 Notes Importantes

⚠️ **MockAuthService est TEMPORAIRE**
- Utilisé uniquement pour les tests en local
- Sera remplacé par le vrai AuthService avec Firebase
- Les données localStorage seront perdues après nettoyage

✅ **Avantages du Mock**
- Test rapide sans configuration Firebase
- Pas besoin de connexion internet
- Données facilement inspectables
- Développement plus rapide

🎯 **Objectif**
- Valider le flux utilisateur
- Valider les validations
- Valider le design
- Valider la logique métier
- Avant d'intégrer Firebase
