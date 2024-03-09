import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    console.log(request)
    return next.handle(request)
  }
};

export const TokenInterceptorProvider ={
  provide:HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi:true
}
