import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(){}

  intercept(request:HttpRequest<unknown>,next:HttpHandler): Observable<HttpEvent<unknown>>{
    console.log(request)
    return next.handle(request)
  }
};

export const TokenInterceptorProvider ={
  provide:HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi:true
}
