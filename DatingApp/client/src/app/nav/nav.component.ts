import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // default value of boolean is false
  loggedIn: boolean;

  constructor(private accountSerivce: AccountService) {}

  ngOnInit(): void {}

  login() {
    // Observables are lazy. They do nothing if we do not subscribe.
    this.accountSerivce.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.loggedIn = false;
  }
}
