import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredentails } from 'src/app/core/interfaces/user-credentails';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  register(userCredentials: UserCredentails) {
    this.authService
      .register(userCredentials)
      .then(() => this.router.navigate(['/login']))
      .catch((error) => {
        console.log(error.message);
      });
  }
}
