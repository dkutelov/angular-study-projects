import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  public async createUser(userData: IUser) {
    const userCred = await this.angularFireAuth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    //creates collection if does not exists
    await this.db.collection('users').add({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });
  }
}
