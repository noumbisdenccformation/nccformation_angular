import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Fonction de démarrage de l'application
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
