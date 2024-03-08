import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import {User} from "../interfaces/userInterface";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  apiUrl = 'https://api.realworld.io/api'

  constructor(
    private http : HttpClient,
    private tokenService :TokenService
  ) { }

  loginUser(email:string, password:string):void {//todo: typeSafe with Userinterface
    const body = {
        "user": {
          "email": email,
          "password": password
        }
    };
    this.http.post<User>(this.apiUrl+'/users/login',body)
      .pipe(
        catchError(this.handleError('login',body))
      )
      .subscribe({
        next: value => this.tokenService.saveToken(value.token),
        error: error => console.log(error)
      });
  }
  handleError(arg0: string, body: { user: { email: string; password: string; }; }): (err: any, caught: Observable<User>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.user.token);
  }

  public isLoggedIn(){
    return
  }

  registerUser(userName:string, email:string, password:string) :Observable<any> {//todo: typeSafe with Userinterface
    const body={
      "user": {
        "username": userName,
        "email": email,
        "password": password
      }
    }
    return this.http.post(this.apiUrl+'/users',body)
  }
}
