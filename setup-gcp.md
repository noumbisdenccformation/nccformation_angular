# Configuration Google Cloud Platform - Always Free

## 1. Créer le projet GCP
```bash
gcloud projects create nccformation-8e052 --name="NCC Formation"
gcloud config set project nccformation-8e052
```

## 2. Activer les APIs (GRATUIT)
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable firestore.googleapis.com
```

## 3. Créer le bucket Storage (Always Free: 5GB)
```bash
gsutil mb -l europe-west1 gs://nccformation-frontend
gsutil web set -m index.html -e index.html gs://nccformation-frontend
gsutil iam ch allUsers:objectViewer gs://nccformation-frontend
```

## 4. Configurer Firestore (Always Free: 1GB)
```bash
gcloud firestore databases create --region=europe-west1
```

## 5. Créer le service account
```bash
gcloud iam service-accounts create github-actions
gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/run.admin"
gcloud projects add-iam-policy-binding nccformation-8e052 \
  --member="serviceAccount:github-actions@nccformation-8e052.iam.gserviceaccount.com" \
  --role="roles/storage.admin"
```

## 6. Alertes budgétaires (Protection)
- Budget: 10€/mois avec alerte à 5€
- Notifications par email
- Arrêt automatique si dépassement

## 7. Limites Always Free respectées
- Cloud Run: 512Mi RAM, 1 CPU, 1 instance max
- Storage: 5GB max
- Firestore: 1GB + 50k lectures/jour
- Build: 120 minutes/jour

✅ **Résultat**: Hébergement gratuit permanent avec upgrade automatique possible