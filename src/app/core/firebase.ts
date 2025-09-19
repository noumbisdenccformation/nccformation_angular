import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    const firebaseConfig = {
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain,
      projectId: environment.firebase.projectId,
      storageBucket: environment.firebase.storageBucket,
      messagingSenderId: environment.firebase.messagingSenderId,
      appId: environment.firebase.appId
    };
    initializeApp(firebaseConfig);
    console.log("Firebase initialisé avec succès !");
  }
}