import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignupFormSubmit(signupForm: NgForm) {
    if (signupForm.invalid) return;

    const { email, password } = signupForm.value;
    this.authService.createUser(email, password);
  }
}
