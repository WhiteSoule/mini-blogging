import { Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path:'#',
    component:AppComponent
  },
  {
    path:'register',
    component:SignUpComponent
  },

];
