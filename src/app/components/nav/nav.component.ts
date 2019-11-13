import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userLogged: Boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.userLogged = this.authService.isLogged();
      }
    })
  }


  logout() {
    this.authService.logout();
  }

}
