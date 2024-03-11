import {Component, OnInit, inject} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../interfaces/userInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { ArticleComponent } from '../../component/article/article.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ArticleComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  username :string =''
  profile :Profile={
    bio:'',
    following:false,
    image:'',
    username:''
  }
  currentUser : UserResponse|undefined
  isFollowing=this.profile.following
  articles:Article[]=[]

  constructor(
    private profileService : ProfileService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private articleService:ArticleService
  ){
    this.username = this.route.snapshot.params['username']
  }


  ngOnInit(){
    this.profileService.getProfile(this.username)
    .subscribe({
      next: value => this.profile = value.profile
    })
    this.authService.getUser().subscribe({
      next: value => {
        this.currentUser = value.user
      }
    })
    this.articleService.getArticles({author:this.username}).subscribe({
      next: value=>{
        this.articles = value.articles
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
