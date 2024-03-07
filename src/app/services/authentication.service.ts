import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, timestamp } from 'rxjs';

interface User{
  email:string,
  token:string,
  username:string,
  bio:string,
  image:string
}
interface AuthResp extends Object{
  user:User
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  apiUrl = 'https://api.realworld.io/api'

  constructor(private http : HttpClient) { }

  loginUser(email:string, password:string):Observable<User> {//todo: typeSafe with Userinterface
    const body = {
        "user": {
          "email": email,
          "password": password
        }
    };
    return this.http.post<User>(this.apiUrl+'/users/login',body).pipe(
      catchError(this.handleError('login',body))
    );
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
