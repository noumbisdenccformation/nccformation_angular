import { Injectable } from '@angular/core';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../core/firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async signOut() {
    return signOut(auth);
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }
}