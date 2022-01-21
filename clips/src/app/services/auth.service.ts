import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public delayedIsAuthenticated$: Observable<boolean>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.userCollection = db.collection('users');
    // angularFireAuth provides user observable
    // angularFireAuth.user.subscribe(console.log);
    this.isAuthenticated$ = angularFireAuth.user.pipe(map((u) => !!u));
    this.delayedIsAuthenticated$ = this.isAuthenticated$.pipe(delay(1000));
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCred = await this.angularFireAuth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    if (!userCred.user) {
      throw new Error('User can not be found!');
    }

    const uid = userCred.user.uid;

    await this.userCollection.doc(uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    //update display name or profilePhoto in auth profile
    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  async loginUser(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  async logoutUser() {
    await this.angularFireAuth.signOut();
  }
}
