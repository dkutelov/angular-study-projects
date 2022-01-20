import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Declare outside FormGroup otherwise the props will have type AbstractControl
  // new new FormControl -> type FormControl that we can pass down to Input component
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  showAlert = false;
  alertMsg = 'Please, wait! Your account is being created!';
  alertColor = 'blue';

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  });

  constructor(private angularFireAuth: AngularFireAuth) {}

  async register() {
    //reset
    this.showAlert = true;
    this.alertMsg = 'Please, wait! Your account is being created!';
    this.alertColor = 'blue';

    const { email, password } = this.registerForm.value;

    try {
      //both: regiter and sign in
      const userCred =
        await this.angularFireAuth.createUserWithEmailAndPassword(
          email,
          password
        );

      console.log(userCred);
    } catch (error) {
      // error of firebase come with code and message
      console.log(error);
      this.alertMsg = 'An unexprected error occured! Please, try again later.';
      this.alertColor = 'red';
      return; // prevent excution of further code
    }

    this.alertMsg = 'Success! Your accont has been created.';
    this.alertColor = 'green';
  }
}
