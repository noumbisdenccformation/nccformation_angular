#!/usr/bin/env node

/**
 * Script de vérification avant déploiement Vercel
 * Vérifie que tous les fichiers nécessaires sont présents
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification avant déploiement Vercel...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Fonction de vérification de fichier
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - MANQUANT: ${filePath}`);
    checks.failed++;
    return false;
  }
}

// Fonction de vérification de contenu
function checkContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(searchString)) {
      console.log(`✅ ${description}`);
      checks.passed++;
      return true;
    } else {
      console.log(`⚠️  ${description} - Contenu manquant`);
      checks.warnings++;
      return false;
    }
  } else {
    console.log(`❌ ${description} - Fichier manquant`);
    checks.failed++;
    return false;
  }
}

console.log('📦 Fichiers de Configuration\n');
checkFile('vercel.json', 'vercel.json présent');
checkFile('package.json', 'package.json présent');
checkFile('angular.json', 'angular.json présent');
checkFile('.vercelignore', '.vercelignore présent');

console.log('\n🎨 Fichiers SEO\n');
checkFile('public/robots.txt', 'robots.txt présent');
checkFile('public/sitemap.xml', 'sitemap.xml présent');
checkFile('public/manifest.json', 'manifest.json présent');
checkFile('public/favicon.ico', 'favicon.ico présent');

console.log('\n📄 Configuration HTML\n');
checkContent('src/index.html', 'og:title', 'Meta Open Graph présents');
checkContent('src/index.html', 'twitter:card', 'Meta Twitter Card présents');
checkContent('src/index.html', 'description', 'Meta description présente');
checkContent('src/index.html', 'canonical', 'Canonical URL présente');

console.log('\n⚙️  Scripts de Build\n');
checkContent('package.json', 'vercel-build', 'Script vercel-build présent');
checkContent('vercel.json', 'dist/ncc-frontend/browser', 'Output directory configuré');

console.log('\n📊 Résumé\n');
console.log(`✅ Vérifications réussies: ${checks.passed}`);
console.log(`⚠️  Avertissements: ${checks.warnings}`);
console.log(`❌ Vérifications échouées: ${checks.failed}`);

if (checks.failed === 0) {
  console.log('\n🎉 Tous les fichiers nécessaires sont présents !');
  console.log('✨ Le projet est prêt pour le déploiement Vercel.\n');
  console.log('📝 Prochaines étapes:');
  console.log('   1. Testez le build: npm run build');
  console.log('   2. Commitez les changements: git add . && git commit -m "feat: Configuration Vercel"');
  console.log('   3. Poussez vers GitHub: git push origin main');
  console.log('   4. Déployez sur Vercel: https://vercel.com\n');
  process.exit(0);
} else {
  console.log('\n⚠️  Certains fichiers sont manquants.');
  console.log('📝 Veuillez créer les fichiers manquants avant de déployer.\n');
  process.exit(1);
}
