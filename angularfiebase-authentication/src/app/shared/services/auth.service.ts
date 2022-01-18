//import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';

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
    // this.angularFireAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //   } else {
    //     localStorage.setItem('user', 'null');
    //   }
    // });
  }

  signIn(email: string, password: string) {}
  // async signIn(email: string, password: string) {
  //   try {
  //     const result = await this.angularFireAuth.signInWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     this.ngZone.run(() => {
  //       this.router.navigate(['dashboard']);
  //     });
  //     this.setUserData(result.user);
  //   } catch (error: any) {
  //     window.alert(error.message);
  //   }
  // }

  // setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //   };

  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }
}
