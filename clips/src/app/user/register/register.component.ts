import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  age = new FormControl('');
  password = new FormControl('');
  phoneNumber = new FormControl('');

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    phoneNumber: this.phoneNumber,
  });
}
