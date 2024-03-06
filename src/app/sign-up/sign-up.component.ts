import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {RouterLink} from "@angular/router";

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
  signupControl = new FormGroup({
    userName: new FormControl<string>('',Validators.required),
    password : new FormControl<string>('',Validators.required),
    email: new FormControl<string>('',Validators.required)
  })
  emailExists: boolean=false;

  onSubmit() {
    console.warn((this.signupControl.value))
    //toDo: Here do API calls and change emailExists in case of failure.
  }
}
