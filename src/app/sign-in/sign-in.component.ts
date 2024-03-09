import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  apiUrl = 'https://api.realworld.io/api'
  WrongCredentials: boolean = false;

  constructor(
    private authService:AuthenticationService,
  ){}

  signinForm = new FormGroup({
    email : new FormControl<string>('',{nonNullable:true,validators:Validators.required}),
    password: new FormControl<string>('',{nonNullable:true,validators:Validators.required})
  })

  /**
   * sends the user input to back to try to log in
   */
  onSubmit(){
    this.authService.loginUser(this.signinForm.getRawValue())
  }
  
}
