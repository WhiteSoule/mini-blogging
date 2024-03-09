import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { TokenService } from '../services/token.service';

/**
 *Intercepts request and adds the authentication token when present 
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService:TokenService
  ){}

  intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    const token = this.tokenService.getToken()

    if(token != null){
      let clone = request.clone({
        headers:request.headers.set('Authorization','Token ' + token)
      })
      return next.handle(clone).pipe(
        catchError(error => {
          if(error.status === 401){
            this.tokenService.removeExpiredToken()
          }
          throw new Error('Session expired')
        })
      )
    }
    return next.handle(request)
  }
  
};

export const TokenInterceptorProvider :Provider={
  provide:HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi:true
}
