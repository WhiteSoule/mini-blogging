import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Article } from '../../interfaces/article';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-page',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    RouterLink
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css'
})
export class ArticlePageComponent {

  articleSlug:string
  article:Article|undefined
  currentUser:string|undefined
  constructor(
    private articleService:ArticleService,
    private router:Router,
    private route:ActivatedRoute,
    private profileService:ProfileService,
    private authService:AuthenticationService,
    private toaster:ToastrService
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
    this.authService.getUser()
      .subscribe({
        next: value => this.currentUser = value.user.username
      })
  }

  followUser(){
    this.profileService.followUser(this.article?.author.username!)
    .subscribe({
      next: value => {
        this.article!.author = value.profile
        this.toaster.success('you are following '+value.profile.username)
      }
    })
  }

  unfollowUser(){
    this.profileService.unFollowUser(this.article?.author.username!)
      .subscribe({
        next: value => {
          this.article!.author = value.profile
          this.toaster.success('you are not following '+value.profile.username+' anymore')
        }
      })
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

  deleteArticle(){
    this.articleService.deleteArticle(this.article!.slug)
      .subscribe({
        next: value => {
          this.toaster.success(`Article ${this.article?.slug} was deleted`)
          this.router.navigate(['/'])
        }
      })
  }

  get isUserAuthor():boolean{
    return this.currentUser === this.article?.author.username
  }
}
