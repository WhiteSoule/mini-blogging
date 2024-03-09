import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  constructor(
    private authService:AuthenticationService
  ){}
  
  updateUserForm = new FormGroup({
    image: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl(''),
    email: new FormControl('',Validators.email),
    password: new FormControl(''),
  },Validators.email)

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      data => {
        this.updateUserForm.patchValue({
          bio: data.user.bio,
          email: data.user.email,
          image: data.user.image,
          username:data.user.username,
          password:''
        })
      }
    )
  }
  
  updateUser(){
    this.authService.updateUser(this.updateUserForm.getRawValue())
  }

  logout(){
    this.authService.logout()
  }

}
