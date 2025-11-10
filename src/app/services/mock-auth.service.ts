import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * MockAuthService - Service d'authentification MOCK pour tester en local
 * Ce service simule Firebase Auth et Firestore avec localStorage
 * À REMPLACER par AuthService avec Firebase en production
 */
@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private readonly USERS_KEY = 'ncc_users';
  private readonly CURRENT_USER_KEY = 'ncc_current_user';

  constructor() {
    // Charger l'utilisateur connecté depuis localStorage
    this.loadCurrentUser();
  }

  /**
   * Charger l'utilisateur connecté depuis localStorage
   */
  private loadCurrentUser(): void {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        // Convertir les dates
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  /**
   * Récupérer tous les utilisateurs depuis localStorage
   */
  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    if (!usersJson) return [];
    
    try {
      const users = JSON.parse(usersJson);
      return users.map((u: any) => ({
        ...u,
        createdAt: new Date(u.createdAt),
        updatedAt: new Date(u.updatedAt)
      }));
    } catch (error) {
      console.error('Erreur lors de la lecture des utilisateurs:', error);
      return [];
    }
  }

  /**
   * Sauvegarder les utilisateurs dans localStorage
   */
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(email: string, password: string, phone: string, firstName: string, lastName: string): Promise<User> {
    try {
      const users = this.getUsers();

      // Vérifier si l'email existe déjà
      if (users.some(u => u.email === email)) {
        throw new Error('Cette adresse email est déjà utilisée');
      }

      // Vérifier si le téléphone existe déjà
      if (users.some(u => u.phone === phone)) {
        throw new Error('Ce numéro de téléphone est déjà utilisé');
      }

      // Créer le nouvel utilisateur
      const newUser: User = {
        id: this.generateId(),
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        quizCompleted: false,
        enrolledFormations: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Sauvegarder l'utilisateur
      users.push(newUser);
      this.saveUsers(users);

      // Connecter automatiquement l'utilisateur
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));
      this.currentUserSubject.next(newUser);
      this.isAuthenticatedSubject.next(true);

      console.log('✅ Inscription réussie (MOCK):', newUser);
      return newUser;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      throw error;
    }
  }

  /**
   * Connexion d'un utilisateur avec email ou téléphone
   */
  async login(emailOrPhone: string, password: string): Promise<User> {
    try {
      const users = this.getUsers();

      // Rechercher l'utilisateur par email ou téléphone
      const user = users.find(u => 
        u.email === emailOrPhone || u.phone === emailOrPhone
      );

      if (!user) {
        throw new Error('Aucun compte trouvé avec cet identifiant');
      }

      // Note: Dans ce mock, on ne vérifie pas vraiment le mot de passe
      // En production avec Firebase, le mot de passe sera vérifié

      // Connecter l'utilisateur
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      console.log('✅ Connexion réussie (MOCK):', user);
      return user;
    } catch (error: any) {
      console.error('❌ Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Connexion avec Google (simulée)
   */
  async loginWithGoogle(): Promise<User> {
    try {
      // Simuler une connexion Google
      const mockGoogleUser: User = {
        id: this.generateId(),
        email: 'google.user@gmail.com',
        phone: '', // Sera demandé après
        firstName: 'Google',
        lastName: 'User',
        profileImage: 'https://via.placeholder.com/150',
        quizCompleted: false,
        enrolledFormations: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const users = this.getUsers();
      
      // Vérifier si l'utilisateur existe déjà
      let existingUser = users.find(u => u.email === mockGoogleUser.email);
      
      if (!existingUser) {
        users.push(mockGoogleUser);
        this.saveUsers(users);
        existingUser = mockGoogleUser;
      }

      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(existingUser));
      this.currentUserSubject.next(existingUser);
      this.isAuthenticatedSubject.next(true);

      console.log('✅ Connexion Google réussie (MOCK):', existingUser);
      return existingUser;
    } catch (error: any) {
      console.error('❌ Erreur lors de la connexion Google:', error);
      throw error;
    }
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    console.log('✅ Déconnexion réussie (MOCK)');
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(email: string): Promise<void> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Aucun compte trouvé avec cette adresse email');
    }

    console.log('✅ Email de réinitialisation envoyé (MOCK) à:', email);
    // En production, Firebase enverra un vrai email
  }

  /**
   * Mettre à jour le profil utilisateur
   */
  async updateUserProfile(updates: Partial<User>): Promise<void> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) throw new Error('Utilisateur non connecté');

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) throw new Error('Utilisateur non trouvé');

    // Mettre à jour l'utilisateur
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date()
    };

    users[userIndex] = updatedUser;
    this.saveUsers(users);

    // Mettre à jour l'utilisateur courant
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);

    console.log('✅ Profil mis à jour (MOCK):', updatedUser);
  }

  /**
   * Marquer le quiz comme complété
   */
  async markQuizCompleted(quizResult: any): Promise<void> {
    await this.updateUserProfile({
      quizCompleted: true,
      quizResult: quizResult
    });
  }

  /**
   * Récupérer l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Récupérer tous les utilisateurs (pour l'admin)
   */
  async getAllUsers(): Promise<User[]> {
    return this.getUsers();
  }

  /**
   * Récupérer les statistiques des utilisateurs
   */
  async getUserStats(): Promise<{
    total: number;
    withQuiz: number;
    withEnrollments: number;
    recent: number;
  }> {
    const users = this.getUsers();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: users.length,
      withQuiz: users.filter(u => u.quizCompleted).length,
      withEnrollments: users.filter(u => u.enrolledFormations.length > 0).length,
      recent: users.filter(u => u.createdAt >= sevenDaysAgo).length
    };
  }

  /**
   * Générer un ID unique
   */
  private generateId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Réinitialiser toutes les données (pour les tests)
   */
  resetAllData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    console.log('🗑️ Toutes les données ont été réinitialisées (MOCK)');
  }
}
