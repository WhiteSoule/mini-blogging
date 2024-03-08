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
          this.toaster.success('You are logged in','Toastr fun!')
        },
        error: error => this.handleError(error)
      });
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
  
  handleError(error: string){
    throw new Error(error);
  }

  public isLogged(){
    return !! localStorage.getItem('token');
  }

  registerUser(params:RegistrationParameters) :void {//todo: typeSafe with Userinterface
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
      error: error => console.log(error)
    })
  }
}
