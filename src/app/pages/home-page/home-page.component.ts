import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article';
import { ArticleComponent } from '../../component/article/article.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ArticleComponent,
    NgFor
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  articles:Article[]=[]
  constructor(
    private router:Router,
    private articleService:ArticleService
  ){}

  ngOnInit(){
    this.articleService.getArticles().subscribe({
      next: value=>{
        this.articles = value.articles
      }
    })
  }

}
