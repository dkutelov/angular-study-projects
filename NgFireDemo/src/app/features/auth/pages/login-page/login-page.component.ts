import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserCredentails } from 'src/app/core/interfaces/user-credentails';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  login(userCredentails: UserCredentails) {
    this.authService
      .login(userCredentails)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((error) => console.log(error.message));
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/dashboard']))
      .catch((e) => console.log(e.message));
  }
}
