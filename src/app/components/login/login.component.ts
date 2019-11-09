import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogged()) this.router.navigate(['products']);
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.controls;
      const user = new UserCredentials();
      user.email = email.value;
      user.password = password.value;
      this.authService.signIn(user).subscribe(response => {
        this.router.navigate([this.authService.redirectUrl]);
      }, error => {
        alert(`NO SE PUDO LOGUEAR: ${error}`);
      })
    }
  }


}
