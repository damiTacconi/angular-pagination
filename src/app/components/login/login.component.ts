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
  submitted: boolean = false;

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
      this.submitted = true;
      const { email, password } = this.loginForm.controls;
      const user = new UserCredentials();
      user.email = email.value;
      user.password = password.value;
      this.authService.signIn(user).subscribe(response => {
        this.router.navigate([this.authService.redirectUrl]);
      }, error => {
        this.submitted = false;
        alert(`NO SE PUDO LOGUEAR: ${error.error.message}`);
      })
    }
  }
  get formEmail() {
    return this.loginForm.get('email')
  }
  get formPassword() {
    return this.loginForm.get('password')
  }


}
