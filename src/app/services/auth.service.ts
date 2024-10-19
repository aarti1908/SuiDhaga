import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.afAuth.authState;
  }

  // Sign up with email and password
  async signUp(email: string, password: string, userData : any) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if (userCredential.user) {
      console.log('User created successfully:', userCredential.user.uid);
      await this.saveUserData(userCredential.user, userData);
      console.log('User data saved successfully');
    }
  }

  private async saveUserData(user: any, additionalData: any) {
    try {
      const userRef = this.firestore.collection('users').doc(user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        roleId : additionalData.roleId,
        name: additionalData.name
      };
      await userRef.set(userData, { merge: true });
      console.log('Data written to Firestore successfully');
    } catch (error) {
      console.error('Error writing to Firestore:', error);
    }
  }

  // Sign in with email and password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut();
  }

  // Check if user is logged in
  isAuthenticated() {
    return this.user$.pipe(map((user) => !!user));
  }
}
