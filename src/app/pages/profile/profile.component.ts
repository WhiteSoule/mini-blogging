import {Component, OnInit, inject} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../interfaces/userInterface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Article, ArticleFilter } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { ArticleComponent } from '../../component/article/article.component';
import { PaginationComponent } from '../../component/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ArticleComponent,
    PaginationComponent
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
  articles:Article[]=[]
  filter:ArticleFilter={};
  currentPage:number = 1;
  totalArticles:number=0

  constructor(
    private profileService : ProfileService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private articleService:ArticleService,
    private toaster: ToastrService
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
    this.fetchArticles()
  }

  fetchArticles(){
    const filter = {...this.filter,author:this.username}
    this.articleService.getArticles(filter).subscribe({
      next: value=>{
        this.articles = value.articles
        this.totalArticles = value.articlesCount
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
    .subscribe({
      next: value => {
        this.profile = value.profile
        this.toaster.success('you are following '+value.profile.username)
      }
    })
  }

  unfollowUser(){
    this.profileService.unFollowUser(this.profile.username)
    .subscribe({
      next: value => {
        this.profile = value.profile
        this.toaster.success('you are not following '+value.profile.username+' anymore')
    }
    })
  }

  onPageChange(page:number){
    this.currentPage=page
    this.filter ={...this.filter,offset:20*(page-1)} // *20 cause it is the default value of items per call
    this.fetchArticles()
  }

}
