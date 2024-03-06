import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  signinForm = new FormGroup({
    password : new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',Validators.required)
  })

  WrongCredentials = false

  onSubmit(){
    console.warn((this.signinForm.value))
  }
}
