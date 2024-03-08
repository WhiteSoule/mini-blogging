import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {routes} from "../app.routes";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService:AuthenticationService
  ){}

  isUserAuthenticated: boolean = this.authService.isLogged();

  protected readonly routes = routes;
}
