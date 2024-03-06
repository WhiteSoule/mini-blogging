import { NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError } from 'rxjs';

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

  constructor(private http:HttpClient){}

  signinForm = new FormGroup({
    password : new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',Validators.required)
  })

  WrongCredentials = false

  onSubmit(){
    const body = {
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": {
          "email": this.getEmail,
          "password": this.getPassword
        }
      })
    };
    this.http.get(this.apiUrl+'/users/login',body).subscribe(
      data => console.warn(data)
    )
  }

  get getPassword(){return this.signinForm.get('password')?.getRawValue()}
  get getEmail(){return this.signinForm.get('email')?.getRawValue()}
  
}
