import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//1. Service is injectable
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //2. Services are singleton; data created are stored for the lifetime of the app; in components these are distroyed
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
