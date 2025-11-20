import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { 
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  Timestamp
} from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    console.log('AuthService avec Firebase activé');
  }

  async register(email: string, password: string, phone: string, firstName: string, lastName: string): Promise<User> {
    try {
      const phoneExists = await this.checkPhoneExists(phone);
      if (phoneExists) {
        throw new Error('Ce numéro de téléphone est déjà utilisé');
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`
      });

      const user: User = {
        id: firebaseUser.uid,
        email: email,
        phone: phone,
        firstName: firstName,
        lastName: lastName,
        quizCompleted: false,
        enrolledFormations: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await setDoc(doc(this.firestore, 'users', firebaseUser.uid), {
        ...user,
        createdAt: Timestamp.fromDate(user.createdAt),
        updatedAt: Timestamp.fromDate(user.updatedAt)
      });

      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      return user;
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      throw this.handleAuthError(error);
    }
  }

  async login(emailOrPhone: string, password: string): Promise<User> {
    try {
      let email = emailOrPhone;
      if (this.isPhoneNumber(emailOrPhone)) {
        const userEmail = await this.getEmailByPhone(emailOrPhone);
        if (!userEmail) {
          throw new Error('Aucun compte trouvé avec ce numéro de téléphone');
        }
        email = userEmail;
      }

      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = await this.getUserData(userCredential.user.uid);

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      return user;
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      throw this.handleAuthError(error);
    }
  }

  private isPhoneNumber(value: string): boolean {
    const phoneRegex = /^(\+?237|237)?[6][0-9]{8}$/;
    return phoneRegex.test(value.replace(/\s/g, ''));
  }

  private async getEmailByPhone(phone: string): Promise<string | null> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('phone', '==', phone));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData['email'] || null;
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de la recherche par téléphone:', error);
      return null;
    }
  }

  private async checkPhoneExists(phone: string): Promise<boolean> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('phone', '==', phone));
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Erreur lors de la vérification du téléphone:', error);
      return false;
    }
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      const firebaseUser = userCredential.user;

      let user = await this.getUserData(firebaseUser.uid);

      if (!user) {
        const names = firebaseUser.displayName?.split(' ') || ['', ''];
        user = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          phone: '',
          firstName: names[0],
          lastName: names.slice(1).join(' '),
          profileImage: firebaseUser.photoURL || undefined,
          quizCompleted: false,
          enrolledFormations: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await setDoc(doc(this.firestore, 'users', firebaseUser.uid), {
          ...user,
          createdAt: Timestamp.fromDate(user.createdAt),
          updatedAt: Timestamp.fromDate(user.updatedAt)
        });
      }

      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);

      return user;
    } catch (error: any) {
      console.error('Erreur lors de la connexion Google:', error);
      throw this.handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw this.handleAuthError(error);
    }
  }

  private async getUserData(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));

      if (userDoc.exists()) {
        const data = userDoc.data() as any;
        return {
          ...data,
          id: uid,
          createdAt: data['createdAt']?.toDate() || new Date(),
          updatedAt: data['updatedAt']?.toDate() || new Date()
        } as User;
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return null;
    }
  }

  async updateUserProfile(updates: Partial<User>): Promise<void> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) throw new Error('Utilisateur non connecté');

    try {
      const userRef = doc(this.firestore, 'users', currentUser.id);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });

      this.currentUserSubject.next({
        ...currentUser,
        ...updates,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  }

  async markQuizCompleted(quizResult: any): Promise<void> {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser) throw new Error('Utilisateur non connecté');

    try {
      await this.updateUserProfile({
        quizCompleted: true,
        // @ts-ignore - champ additionnel éventuel
        quizResult: quizResult
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du quiz:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private handleAuthError(error: any): Error {
    let message = 'Une erreur est survenue';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = "Cette adresse email est déjà utilisée";
        break;
      case 'auth/invalid-email':
        message = 'Adresse email invalide';
        break;
      case 'auth/operation-not-allowed':
        message = 'Opération non autorisée';
        break;
      case 'auth/weak-password':
        message = 'Le mot de passe est trop faible (minimum 6 caractères)';
        break;
      case 'auth/user-disabled':
        message = 'Ce compte a été désactivé';
        break;
      case 'auth/user-not-found':
        message = "Aucun compte trouvé avec cette adresse email";
        break;
      case 'auth/wrong-password':
        message = 'Mot de passe incorrect';
        break;
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        message = 'Identifiants incorrects. Vérifiez votre email/numéro de téléphone et votre mot de passe.';
        break;
      case 'auth/too-many-requests':
        message = 'Trop de tentatives. Veuillez réessayer plus tard';
        break;
      default:
        message = error.message || 'Une erreur est survenue';
    }

    return new Error(message);
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const querySnapshot = await getDocs(usersCollection);

      return querySnapshot.docs.map((docSnapshot: any) => {
        const data = docSnapshot.data();
        return {
          ...data,
          id: docSnapshot.id,
          createdAt: data['createdAt']?.toDate() || new Date(),
          updatedAt: data['updatedAt']?.toDate() || new Date()
        } as User;
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  async getUserStats(): Promise<{
    total: number;
    withQuiz: number;
    withEnrollments: number;
    recent: number;
  }> {
    try {
      const users = await this.getAllUsers();
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      return {
        total: users.length,
        withQuiz: users.filter(u => u.quizCompleted).length,
        withEnrollments: users.filter(u => u.enrolledFormations.length > 0).length,
        recent: users.filter(u => u.createdAt >= sevenDaysAgo).length
      };
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      throw error;
    }
  }
}
