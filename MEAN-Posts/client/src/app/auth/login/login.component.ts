import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLoginFormSubmit(loginForm: NgForm) {
    if (loginForm.invalid) return;

    const { email, password } = loginForm.value;
    this.authService.loginUser(email, password);
  }
}
