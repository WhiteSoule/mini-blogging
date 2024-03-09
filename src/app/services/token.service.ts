import {Injectable} from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn:'root'
})
export class TokenService {
  constructor(
    private router: Router
  ) {
  }


  /**
   * adds the token to the local storage
   * @param token 
   */
  saveToken(token:string):void{
    localStorage.setItem('token',token);
  }

  /**
   * removes token from local storage because of user logout
   */
  removeToken(){
    localStorage.removeItem('token');
    this.router.navigate([''])
  }

  /**
   * removes token form local storage because token expired
   */
  removeExpiredToken(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  /**
   * get the token from local storage
   * @returns token
   */
  getToken(): string | null{
    return localStorage.getItem('token')
  }
}
