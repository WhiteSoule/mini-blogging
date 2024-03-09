import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class TokenService {
  constructor() {
  }

  saveToken(token:string):void{
    localStorage.setItem('token',token);
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
