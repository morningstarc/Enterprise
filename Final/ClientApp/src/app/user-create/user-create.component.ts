import { Component, OnInit } from '@angular/core';
import { UserCreds } from '../user-login/user-creds';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userCreds: UserCreds = new UserCreds();
  errorMessage: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.loginService.createUser(this.userCreds).subscribe({
      next: resp => this.router.navigate(['/usr/login']),
      error: error => this.errorMessage = error
    })
  }

}
