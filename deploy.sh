#!/bin/bash

echo "🚀 Déploiement NCC Formation sur Google Cloud"

# Build Angular
echo "📦 Build du frontend..."
npm run build

# Deploy frontend to Cloud Storage
echo "🌐 Déploiement frontend..."
gsutil -m cp -r dist/ncc-frontend/* gs://nccformation-frontend/

# Build backend
echo "⚙️ Build du backend..."
mvn clean package -DskipTests

# Deploy backend to Cloud Run
echo "🔧 Déploiement backend..."
gcloud run deploy ncc-backend \
  --source . \
  --region=europe-west1 \
  --platform=managed \
  --allow-unauthenticated \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=1

echo "✅ Déploiement terminé !"
echo "Frontend: https://storage.googleapis.com/nccformation-frontend/index.html"
echo "Backend: https://ncc-backend-xxxxxxxxx-ew.a.run.app"