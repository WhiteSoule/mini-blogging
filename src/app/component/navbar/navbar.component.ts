import { Component, OnInit } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {routes} from "../../app.routes";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';

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
export class NavbarComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  currentUserUsername: string = ''
  
  constructor(
    private router: Router,
    private authService:AuthenticationService
  ){}

  ngOnInit(): void {
    this.router.events.subscribe(()=>{
      this.isUserAuthenticated = this.authService.isLogged();
    })
    this.authService.getUser().subscribe({
      next: value => this.currentUserUsername = value.user.username
    }) 
  }

  protected readonly routes = routes;
}
