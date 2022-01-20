import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.userCollection = db.collection('users');
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
}
