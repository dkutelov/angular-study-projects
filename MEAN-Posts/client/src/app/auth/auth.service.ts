import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<{ isAuth: boolean }>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    // use subject to create observable that will push any changes in the stutus
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post("http://localhost:5000/api/auth/signup", authData)
      .subscribe((result) => {
        console.log(result);
        this.router.navigate(["/"]);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ message: string; token: string }>(
        "http://localhost:5000/api/auth/login",
        authData,
      )
      .subscribe((response) => {
        this.token = response.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next({ isAuth: true });
          this.router.navigate(["/"]);
        }
      });
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next({ isAuth: false });
  }
}
