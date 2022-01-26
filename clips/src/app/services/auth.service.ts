import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';

import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public delayedIsAuthenticated$: Observable<boolean>;
  private redirect = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = db.collection('users');
    // angularFireAuth provides user observable
    // angularFireAuth.user.subscribe(console.log);
    this.isAuthenticated$ = angularFireAuth.user.pipe(map((u) => !!u));
    this.delayedIsAuthenticated$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events
      .pipe(
        // Filter only NavigationEnd object
        filter((e) => e instanceof NavigationEnd), //return not the event object but boolean
        map((e) => this.route.firstChild), // returns an observable
        switchMap((route) => route?.data ?? of({})) // route.data is also an observable
        // if route is empty -> switchMap will error and break the app, therefor return empty observable
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      }); // will receive only the NavigationEnd event
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
    // redirects only if current route is protected e.g. data.authOnly is true
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
