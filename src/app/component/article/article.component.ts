import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgFor
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() article:Article|undefined;

  favorite(){
    
  }

  unFavorite(){

  }
}
