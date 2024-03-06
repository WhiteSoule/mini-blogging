import { Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppComponent} from "./app.component";
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  {
    path:'#',
    component:AppComponent
  },
  {
    path:'register',
    component:SignUpComponent
  },
  {
    path:'login',
    component:SignInComponent
  }
];
