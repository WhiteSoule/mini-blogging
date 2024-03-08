import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(
    private authService:AuthenticationService
  ){}
  signupControl = new FormGroup({
    username: new FormControl<string>('',{nonNullable: true,validators:Validators.required}),
    password : new FormControl<string>('',{nonNullable: true,validators:Validators.required}),
    email: new FormControl<string>('',{nonNullable: true,validators:Validators.required})
  })
  emailExists: boolean=false;

  onSubmit() {
    this.authService.registerUser(this.signupControl.getRawValue())
  }
}
