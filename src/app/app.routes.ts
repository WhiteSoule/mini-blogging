import { Routes } from '@angular/router';
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {AppComponent} from "./app.component";
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
  },
  {
    path:'settings',
    component: SettingsComponent
  },
];
