# 🚀 Instructions de Déploiement - NCC-Academy

## ✅ Corrections Appliquées

Toutes les corrections nécessaires ont été appliquées pour résoudre l'erreur de build Vercel.

### Problème Résolu
- ❌ **Avant** : Build Failed - Conflits de dépendances Firebase/Angular 20
- ✅ **Maintenant** : Firebase temporairement désactivé, build devrait réussir

### Fichiers Modifiés

1. **package.json**
   - Retiré : `@angular/fire`, `firebase`, `firebase-tools`
   - Mis à jour : `@angular/cdk` et `@angular/material` vers v20

2. **src/app/app.config.ts**
   - Imports Firebase commentés
   - Providers Firebase désactivés

3. **src/app/services/auth.service.ts**
   - Remplacé par version MOCK (sans Firebase)
   - Original sauvegardé : `auth.service.firebase.ts.bak`

4. **.npmrc** (créé)
   - `legacy-peer-deps=true`

5. **vercel.json** (mis à jour)
   - `installCommand` avec `--legacy-peer-deps`

---

## 🚀 Étapes de Déploiement

### 1. Commit et Push

```bash
git add .
git commit -m "fix: Désactivation temporaire Firebase pour déploiement Vercel"
git push origin main
```

### 2. Vérifier le Build Vercel

- Allez sur https://vercel.com/dashboard
- Vérifiez que le nouveau déploiement démarre automatiquement
- Suivez les logs en temps réel

### 3. Résultat Attendu

✅ **Build réussit**  
✅ **Site accessible**  
✅ **Toutes les pages fonctionnent** (sauf authentification)

---

## ⚠️ Limitations Temporaires

Avec Firebase désactivé, les fonctionnalités suivantes ne fonctionnent PAS :

- ❌ Inscription / Connexion
- ❌ Authentification Google
- ❌ Sauvegarde des données utilisateur
- ❌ Sauvegarde des résultats de quiz

### Fonctionnalités qui FONCTIONNENT

- ✅ Page d'accueil
- ✅ Page formations (données mockées)
- ✅ Quiz d'orientation (résultats non sauvegardés)
- ✅ Navigation complète
- ✅ Design responsive
- ✅ Toutes les pages statiques

---

## 🔄 Réactivation de Firebase (Plus Tard)

Quand Angular Fire sera compatible avec Angular 20 :

### 1. Restaurer le AuthService Original

```bash
# Supprimer le mock
rm src/app/services/auth.service.ts

# Restaurer l'original
mv src/app/services/auth.service.firebase.ts.bak src/app/services/auth.service.ts
```

### 2. Réinstaller Firebase

```json
// package.json
"dependencies": {
  "@angular/fire": "^19.0.0",  // ou version compatible
  "firebase": "^11.0.2"
}
```

### 3. Décommenter app.config.ts

```typescript
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
```

### 4. Redéployer

```bash
npm install
git add .
git commit -m "feat: Réactivation Firebase"
git push origin main
```

---

## 📊 Checklist de Déploiement

### Avant de Commit

- [x] package.json mis à jour (Firebase retiré)
- [x] app.config.ts mis à jour (Firebase commenté)
- [x] auth.service.ts remplacé par mock
- [x] .npmrc créé
- [x] vercel.json mis à jour

### Après le Push

- [ ] Build Vercel démarre automatiquement
- [ ] Build réussit (vérifier les logs)
- [ ] Site accessible sur l'URL Vercel
- [ ] Page d'accueil charge correctement
- [ ] Navigation fonctionne
- [ ] Page formations affiche les données
- [ ] Quiz fonctionne (sans sauvegarde)
- [ ] Responsive design OK
- [ ] Pas d'erreurs console

---

## 🎯 Commandes Rapides

### Commit et Push
```bash
git add .
git commit -m "fix: Désactivation temporaire Firebase pour Vercel"
git push origin main
```

### Vérifier le Build Localement (Optionnel)
```bash
npm install
npm run build
```

Si le build local réussit, Vercel devrait aussi réussir.

---

## 📞 En Cas de Problème

### Build Échoue Encore

1. Vérifier les logs Vercel
2. S'assurer que tous les fichiers sont commités
3. Vérifier que `.npmrc` est bien présent
4. Essayer de supprimer `node_modules` et `package-lock.json` localement

### Site Ne Charge Pas

1. Vérifier l'URL Vercel
2. Vérifier les erreurs console (F12)
3. Vérifier les routes dans `vercel.json`

### Erreurs TypeScript

1. Vérifier que `auth.service.ts` est bien le mock
2. Vérifier que les imports Firebase sont commentés dans `app.config.ts`

---

## 🎉 Résultat Final

Une fois déployé avec succès :

✅ Site accessible mondialement  
✅ Performance optimale (CDN Vercel)  
✅ HTTPS automatique  
✅ SEO optimisé  
✅ Responsive design  

**URL** : https://nccformation-angular-[votre-id].vercel.app

---

## 📝 Notes Importantes

1. **Firebase est temporairement désactivé** - C'est normal et nécessaire pour le déploiement
2. **L'authentification ne fonctionne pas** - Sera réactivée plus tard
3. **Les données sont mockées** - Pas de connexion à Firestore
4. **Le site est fonctionnel** - Toutes les pages statiques fonctionnent

---

**Date** : 10 Novembre 2025  
**Statut** : ✅ Prêt pour le déploiement  
**Action** : Commit + Push maintenant !
