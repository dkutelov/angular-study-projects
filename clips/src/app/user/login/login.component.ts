import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showAlert = false;
  alertMsg = 'Please, wait! You are logged in!';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private authService: AuthService) {}

  async login(form: NgForm) {
    if (form.valid) {
      this.showAlert = true;
      this.alertMsg = 'Please, wait! You are logged in!'; // always reset values
      this.alertColor = 'blue';
      this.inSubmission = true;

      const { email, password } = form.value;

      try {
        await this.authService.loginUser(email, password);
      } catch (error) {
        console.error(error);
        this.alertMsg =
          'An unexprected error occured! Please, try again later.';
        this.alertColor = 'red';
        this.inSubmission = false;
        return;
      }

      this.alertMsg = 'Success! Your are logged in.';
      this.alertColor = 'green';
    }
  }
}
