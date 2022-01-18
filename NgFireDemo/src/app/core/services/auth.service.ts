import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { UserCredentails } from '../interfaces/user-credentails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  register({ email, password }: UserCredentails) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: UserCredentails) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
