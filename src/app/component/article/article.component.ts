import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article';
import {CommonModule, NgFor, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    NgOptimizedImage,
    RouterLinkActive
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() article:Article={
    author:{
      bio:'',
      following:false,
      image:'',
      username:''
    },
    body:'',
    createdAt:'',
    description:'',
    favorited:false,
    favoritesCount:0,
    slug:'',
    tagList:[],
    title:'',
    updatedAt:''
  };

  constructor(
    private articleService:ArticleService
  ){}

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
}
