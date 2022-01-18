import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

import { User } from '../services/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public auth: Auth,
    public router: Router,
    public ngZone: NgZone,
    public firestore: Firestore
  ) {
    const usersCollection = collection(firestore, 'users');
    // this.angularFireAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem('user', 'null');
    //   }
    // });
  }

  //signIn(email: string, password: string) {}
  async signIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.setUserData(result.user);
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  setUserData(user: any) {
    // there is user.accessToken
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userObj: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    console.log(user);

    return setDoc(userRef, userObj);
  }
}
