import { Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppComponent} from "./app.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  },
  {
    path:'register',
    component: SignUpComponent
  },
  {
    path:'login',
    component: SignInComponent
  }
];
