import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/models/user-credentials';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLogged()) this.router.navigate(['products']);

    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email, Validators.required], [CustomValidators.validateEmail(this.authService)]),
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required, CustomValidators.validatePassword(this.password)])
    })
  }

  signUp() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.controls;
      const user = new UserCredentials();
      user.email = email.value;
      user.password = password.value;
      this.authService.signUp(user).subscribe(response => {
        alert("CREADO CON EXITO !");
        this.router.navigate(['']);
      }, error => {
        alert(`NO SE PUDO REGISTRAR: ${error.error.message}`);
      })
    }
  }

  updateConfirmPasswordControl() {
    this.registerForm.controls.confirmPassword.setValidators([CustomValidators.validatePassword(this.password)]);
    this.registerForm.controls.confirmPassword.updateValueAndValidity()
  }
  changePassword(event) {
    this.password = event.target.value;
    this.updateConfirmPasswordControl();
  }

  changeConfirmPassword(event) {
    this.updateConfirmPasswordControl();
  }

  get formEmail() {
    return this.registerForm.get('email')
  }

  get formConfirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get formPassword() {
    return this.registerForm.get('password')
  }

}
