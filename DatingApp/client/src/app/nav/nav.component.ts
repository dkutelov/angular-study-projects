import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // default value of boolean is false
  //loggedIn: boolean;
  //currentUser$: Observable<User>;

  // need to make accountService public to access in template
  constructor(
    public accountSerivce: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //this.currentUser$ = this.accountSerivce.currentUser$;
  }

  login() {
    // Observables are lazy. They do nothing if we do not subscribe.
    this.accountSerivce.login(this.model).subscribe(
      (response) => {
        console.log(response);
        // this.loggedIn = true;
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
        //this.toastr.error(error.error); handled by the interceptor
      }
    );
  }

  logout() {
    // this.loggedIn = false;
    this.accountSerivce.logout();
    this.router.navigateByUrl('/');
  }

  // getCurrentUser() {
  //   this.accountSerivce.currentUser$.subscribe((user) => {
  //     this.loggedIn = !!user;
  //   });
  // }
}
