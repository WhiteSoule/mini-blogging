import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {routes} from "../app.routes";
import {RouterLink, RouterLinkActive} from "@angular/router";

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
  isUserAuthenticated: boolean=false;//toDo: link to service to get userStatus


  protected readonly routes = routes;
}
