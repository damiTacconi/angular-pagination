import { Injectable } from '@angular/core';
import { UserCredentials } from '../models/user-credentials';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://utn2019-avanzada2-tp9.herokuapp.com/";
  loginUrl = `${this.url}login`;
  registerUrl = `${this.url}sign-up`;

  redirectUrl = 'products';

  constructor(private http: HttpClient) { }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
  private getHeaders(options: {}) {
    return {
      'headers': new HttpHeaders(options)
    };
  }

  signIn(user: UserCredentials): Observable<any> {
    const httpOptions = this.getHeaders({
      'Content-Type': 'application/json'
    });

    const observer = this.http.post(this.loginUrl, user, httpOptions);

    observer.subscribe(response => {
      console.log(response)
      const token = response['jwt'];
      localStorage.setItem('token', token);
    })

    return observer;

  }

  signUp(user: UserCredentials): Observable<any> {
    const httpOptions = this.getHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.registerUrl, user, httpOptions);
  }
}
