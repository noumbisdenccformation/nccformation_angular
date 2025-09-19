#!/bin/bash

echo "🔑 Création de la clé service account pour GitHub Actions"

# Se connecter à GCP (si pas déjà fait)
gcloud auth login
gcloud config set project nccformation-8e052

# Créer le service account (si pas déjà fait)
gcloud iam service-accounts create github-actions --display-name="GitHub Actions"

# Donner les permissions nécessaires
gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.editor"

# Créer la clé JSON
gcloud iam service-accounts keys create github-key.json \
  --iam-account=github-actions@nccformation-8e052.iam.gserviceaccount.com

echo "✅ Clé créée dans github-key.json"
echo ""
echo "📋 ÉTAPES SUIVANTES :"
echo "1. Copier le contenu de github-key.json"
echo "2. Aller sur GitHub > Settings > Secrets and variables > Actions"
echo "3. Créer un nouveau secret nommé: GCP_SA_KEY"
echo "4. Coller le contenu JSON complet"
echo ""
echo "🔒 Contenu à copier :"
cat github-key.json