import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Service d'authentification MOCK pour le déploiement Vercel
 * Version temporaire sans Firebase
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    console.log('AuthService en mode MOCK - Firebase désactivé pour Vercel');
  }

  async register(email: string, password: string, phone: string, firstName: string, lastName: string): Promise<User> {
    console.log('MOCK: register', { email, phone, firstName, lastName });
    const mockUser: User = {
      id: 'mock-' + Date.now(),
      email,
      phone,
      firstName,
      lastName,
      quizCompleted: false,
      enrolledFormations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.currentUserSubject.next(mockUser);
    this.isAuthenticatedSubject.next(true);
    return mockUser;
  }

  async login(emailOrPhone: string, password: string): Promise<User> {
    console.log('MOCK: login', { emailOrPhone });
    const mockUser: User = {
      id: 'mock-user-1',
      email: emailOrPhone,
      phone: '+237600000000',
      firstName: 'Test',
      lastName: 'User',
      quizCompleted: false,
      enrolledFormations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.currentUserSubject.next(mockUser);
    this.isAuthenticatedSubject.next(true);
    return mockUser;
  }

  async loginWithGoogle(): Promise<User> {
    console.log('MOCK: loginWithGoogle');
    const mockUser: User = {
      id: 'mock-google-user',
      email: 'google@test.com',
      phone: '+237600000000',
      firstName: 'Google',
      lastName: 'User',
      quizCompleted: false,
      enrolledFormations: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.currentUserSubject.next(mockUser);
    this.isAuthenticatedSubject.next(true);
    return mockUser;
  }

  async logout(): Promise<void> {
    console.log('MOCK: logout');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  async resetPassword(email: string): Promise<void> {
    console.log('MOCK: resetPassword', { email });
  }

  async updateUserProfile(updates: Partial<User>): Promise<void> {
    console.log('MOCK: updateUserProfile', updates);
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      this.currentUserSubject.next({
        ...currentUser,
        ...updates,
        updatedAt: new Date()
      });
    }
  }

  async markQuizCompleted(quizResult: any): Promise<void> {
    console.log('MOCK: markQuizCompleted', quizResult);
    await this.updateUserProfile({
      quizCompleted: true,
      quizResult: quizResult
    });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  async getAllUsers(): Promise<User[]> {
    console.log('MOCK: getAllUsers');
    return [];
  }

  async getUserStats(): Promise<{
    total: number;
    withQuiz: number;
    withEnrollments: number;
    recent: number;
  }> {
    console.log('MOCK: getUserStats');
    return {
      total: 0,
      withQuiz: 0,
      withEnrollments: 0,
      recent: 0
    };
  }
}
