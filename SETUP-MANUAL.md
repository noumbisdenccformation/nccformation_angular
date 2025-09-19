# Configuration manuelle Google Cloud

## 1. Installer Google Cloud CLI
```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz
tar -xf google-cloud-cli-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh
source ~/.bashrc
```

## 2. Se connecter et configurer
```bash
gcloud auth login
gcloud config set project nccformation-8e052
```

## 3. Créer le service account
```bash
gcloud iam service-accounts create github-actions --display-name="GitHub Actions"
```

## 4. Donner les permissions
```bash
gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.editor"
```

## 5. Créer la clé JSON
```bash
gcloud iam service-accounts keys create github-key.json \
  --iam-account=github-actions@nccformation-8e052.iam.gserviceaccount.com
```

## 6. Copier dans GitHub Secrets
- Copier le contenu de `github-key.json`
- GitHub > Settings > Secrets and variables > Actions
- Nouveau secret : `GCP_SA_KEY`
- Coller le JSON complet

## 7. Test du déploiement
```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

✅ Le déploiement se lancera automatiquement !