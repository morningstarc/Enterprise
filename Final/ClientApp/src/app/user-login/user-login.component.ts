import { Component, OnInit } from '@angular/core';
import { UserCreds } from './user-creds';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userCreds: UserCreds = new UserCreds();
  errorMessage: string;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.loginService.login(this.userCreds).subscribe({
      next: resp => this.router.navigate(['/todos']),
      error: errorMessage => this.errorMessage = errorMessage
    })
  }

}
