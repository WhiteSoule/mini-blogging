import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../interfaces/userInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  
  profile :Profile={
    bio:'',
    following:false,
    image:'',
    username:''
  }
  currentUser : UserResponse|undefined
  isFollowing=this.profile.following

  constructor(
    private profileService : ProfileService,
    private authService: AuthenticationService,
    private route:ActivatedRoute,
    private router: Router
  ){}

  
  ngOnInit(){
    const username = this.route.snapshot.paramMap.get('username')!;
    this.profileService.getProfile(username)
    .subscribe({
      next: value => this.profile = value.profile
    })
    this.authService.getUser().subscribe({
      next: value => { 
        this.currentUser = value.user
      }
    })
  }

  isCurrentUser(): boolean {
    return this.profile.username === this.currentUser?.username
  }
  
  navigateToSettings() {
    this.router.navigate(['/settings'])
  }

  followUser(){
    this.profileService.followUser(this.profile.username)
    this.isFollowing = true
  }

  unfollowUser(){
    this.profileService.unFollowUser(this.profile.username)
    this.isFollowing = false 
  }
}
