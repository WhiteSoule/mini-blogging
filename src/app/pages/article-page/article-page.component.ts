import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Article } from '../../interfaces/article';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {

  articleSlug:string
  article:Article|undefined
  constructor(
    private articleService:ArticleService,
    private router:Router,
    private route:ActivatedRoute,
    private profileService:ProfileService,
    private authService:AuthenticationService
  ){
    this.articleSlug = this.route.snapshot.params['articleSlug']
  }

  ngOnInit(){
    this.articleService.getArticle(this.articleSlug)
      .subscribe({
        next:value=>{
          this.article = value.article
        }
      })
  }

  followUser(){
    this.profileService.followUser(this.article?.author.username!)
  }

  unfollowUser(){
    this.profileService.unFollowUser(this.article?.author.username!)
  }

  favorite(){
    if(this.article){
      if(!this.article.favorited){
        this.articleService.favoriteArticle(this.article.slug)
        .subscribe({
          next:(value)=>this.article=value.article
        })
      }else{
        this.articleService.unFavoriteArticle(this.article.slug)
        .subscribe({
          next:(value)=>this.article=value.article
        })
      }
    }
  }

  get isUserAuthor():boolean{
    return this.authService.currentUserUsername === this.article?.author.username
  }
}
