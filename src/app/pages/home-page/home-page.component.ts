import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article, ArticleFilter } from '../../interfaces/article';
import { ArticleComponent } from '../../component/article/article.component';
import { NgFor } from '@angular/common';
import { PaginationComponent } from '../../component/pagination/pagination.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ArticleComponent,
    NgFor,
    PaginationComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  articles:Article[]=[];
  filter:ArticleFilter={};
  currentPage:number = 1;
  totalArticles:number=0
  constructor(
    private router:Router,
    private articleService:ArticleService
  ){}

  ngOnInit(){
    this.fetchArticles()
  }

  fetchArticles(){
    this.articleService.getArticles(this.filter).subscribe({
      next: value=>{
        this.articles = value.articles
        this.totalArticles = value.articlesCount
      }
    })
  }

  onPageChange(page:number){
    this.currentPage=page
    this.filter ={...this.filter,offset:20*(page-1)} // *20 cause it is the default value of items per call
    this.fetchArticles()
  }

}
