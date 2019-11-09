import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'https://utn2019-avanzada2-tp9.herokuapp.com/api/products';

  constructor(private http: HttpClient) { }

  getProducts(options = {}): Observable<any> {
    const queryString = Object.entries(options).map(param => {
      return `${param[0]}=${param[1]}`;
    }).join('&');

    const httpOptions = {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(`${this.url}?${queryString}`, httpOptions);
  }
}
