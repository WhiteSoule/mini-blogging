import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthResponse, LoginParameters, RegistrationParameters, User} from "../interfaces/userInterface";
import {TokenService} from "./token.service";
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  apiUrl = 'https://api.realworld.io/api'

  constructor(
    private http : HttpClient,
    private tokenService :TokenService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  /**
   * loges the user in and navigates to the home page
   * @param params login parameters
   */
  loginUser(params:LoginParameters):void {
    const body = {
        "user": {
          "email": params.email,
          "password": params.password
        }
    };
    this.http.post<AuthResponse>(this.apiUrl+'/users/login',body)
      .subscribe({
        next: value => {
          this.tokenService.saveToken(value.user.token);
          this.router.navigate(['']);
          this.toaster.success('You are logged in','Welcom '+value.user.username)
        },
        error: error => this.handleError(JSON.stringify(error.error.errors))
      });
  }

  /**
   * loges out the use by removing the token from local storage
   */
  logout(){
    this.tokenService.removeToken()
    this.router.navigate([''])
  }
  
  /**
   * handel the case when error is sent from api call
   * @param error 
   */
  handleError(error: string){
    this.toaster.error(error)
    throw new Error(error);
  }

  /**
   * checks if the token is present in the local storage
   * @returns true if the user is logged in
   */
  public isLogged(){
    return !! localStorage.getItem('token');
  }

  /**
   * creates a new user and loges the user in
   * @param params register parameters
   */
  registerUser(params:RegistrationParameters) :void {
    const body={
      "user": {
        "username": params.username,
        "email": params.email,
        "password": params.password
      }
    }
    this.http.post<AuthResponse>(this.apiUrl+'/users',body)
    .subscribe({
      next: value => {
        this.tokenService.saveToken(value.user.token);
        this.router.navigate(['']);
        this.toaster.success('You are registered','Toastr fun!')
      },
      error: error => this.handleError(error.error.errors)
    })
  }
}
