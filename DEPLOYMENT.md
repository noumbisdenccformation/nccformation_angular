# 🚀 Guide de Déploiement Vercel - NCC-Academy

## 📋 Prérequis

- Compte Vercel (gratuit) : https://vercel.com/signup
- Node.js 18+ installé
- Git configuré
- Projet Angular 20 fonctionnel

## 🔧 Configuration du Projet

### 1. Vérification des fichiers de configuration

✅ **vercel.json** - Configuration Vercel
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/ncc-frontend/browser"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*\\.(js|css|ico|png|jpg|jpeg|svg|gif|woff|woff2|ttf|eot))",
      "headers": { "cache-control": "s-maxage=31536000,immutable" },
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

✅ **package.json** - Scripts de build
```json
{
  "scripts": {
    "vercel-build": "ng build --configuration production"
  }
}
```

### 2. Optimisation du Build

**angular.json** - Configuration de production
- Output path: `dist/ncc-frontend`
- Output hashing: `all`
- Budget warnings: 500kB
- Budget errors: 1MB

## 🌐 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandée)

1. **Connexion à Vercel**
   - Allez sur https://vercel.com
   - Connectez-vous avec GitHub/GitLab/Bitbucket

2. **Import du projet**
   - Cliquez sur "Add New" → "Project"
   - Sélectionnez votre repository `nccformation_angular`
   - Vercel détecte automatiquement Angular

3. **Configuration du projet**
   ```
   Framework Preset: Angular
   Build Command: npm run vercel-build
   Output Directory: dist/ncc-frontend/browser
   Install Command: npm install
   ```

4. **Variables d'environnement** (si nécessaire)
   - Ajoutez vos clés Firebase dans Settings → Environment Variables
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - etc.

5. **Déploiement**
   - Cliquez sur "Deploy"
   - Attendez 2-3 minutes
   - Votre site est en ligne ! 🎉

### Méthode 2 : Via Vercel CLI

```bash
# Installation de Vercel CLI
npm install -g vercel

# Connexion à Vercel
vercel login

# Premier déploiement
vercel

# Déploiement en production
vercel --prod
```

## 🔗 URL de Déploiement

### URL Actuelle
```
https://nccformation-angular-spaa.vercel.app/
```

### Configuration du domaine personnalisé

1. Dans Vercel Dashboard → Settings → Domains
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions

## ✅ Checklist Post-Déploiement

### Tests de Fonctionnalité
- [ ] Page d'accueil charge correctement
- [ ] Navigation entre les pages fonctionne
- [ ] Quiz d'orientation fonctionne
- [ ] Page formations affiche les données
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Images et assets chargent correctement
- [ ] Pas d'erreurs dans la console

### Optimisation SEO
- [ ] Meta tags présents (title, description)
- [ ] Open Graph tags configurés
- [ ] Favicon visible
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] Performance Lighthouse > 90

### Sécurité
- [ ] HTTPS activé (automatique avec Vercel)
- [ ] Headers de sécurité configurés
- [ ] Variables d'environnement sécurisées
- [ ] Pas de clés API exposées dans le code

## 📊 Monitoring et Analytics

### Vercel Analytics
1. Activez Vercel Analytics dans le dashboard
2. Suivez les métriques de performance
3. Analysez le trafic et les erreurs

### Google Analytics (Optionnel)
1. Créez une propriété GA4
2. Ajoutez le tracking code dans `index.html`
3. Configurez les événements personnalisés

## 🔄 Déploiement Continu (CI/CD)

### Configuration Automatique
Vercel déploie automatiquement :
- **Production** : À chaque push sur `main`/`master`
- **Preview** : À chaque pull request
- **Development** : À chaque push sur les autres branches

### Webhooks
Configurez des webhooks pour :
- Notifications Slack/Discord
- Intégrations avec d'autres services
- Déclenchement de tests automatiques

## 🐛 Résolution des Problèmes

### Erreur : Build Failed
```bash
# Testez le build localement
npm run build

# Vérifiez les logs Vercel
vercel logs <deployment-url>
```

### Erreur : 404 sur les routes
- Vérifiez que `vercel.json` contient la règle de redirection
- Assurez-vous que `base href="/"` est dans `index.html`

### Erreur : Assets non chargés
- Vérifiez le chemin `distDir` dans `vercel.json`
- Confirmez que les assets sont dans `src/assets` ou `public`

### Performance lente
- Activez la compression Brotli (automatique)
- Optimisez les images (WebP, lazy loading)
- Utilisez le CDN Vercel Edge Network

## 📈 Optimisations Avancées

### 1. Edge Functions
```javascript
// api/hello.js
export default function handler(request) {
  return new Response('Hello from Edge!');
}
```

### 2. Incremental Static Regeneration (ISR)
- Configurez le cache pour les pages statiques
- Régénération automatique après X secondes

### 3. Image Optimization
```html
<!-- Utilisez next/image ou optimisez manuellement -->
<img src="/assets/image.webp" loading="lazy" alt="Description">
```

## 🎯 Prochaines Étapes

1. **Domaine Personnalisé**
   - Acheter un domaine (ex: ncc-academy.com)
   - Configurer dans Vercel

2. **Certificat SSL**
   - Automatique avec Vercel
   - Renouvellement automatique

3. **Monitoring Avancé**
   - Sentry pour le tracking d'erreurs
   - LogRocket pour les sessions utilisateur

4. **A/B Testing**
   - Vercel Edge Middleware
   - Tests de variantes de pages

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support
- Community Discord : https://vercel.com/discord

## 🎉 Félicitations !

Votre application NCC-Academy est maintenant déployée et accessible au monde entier ! 🌍

**URL de production** : https://nccformation-angular-spaa.vercel.app/

---

*Dernière mise à jour : Novembre 2025*
