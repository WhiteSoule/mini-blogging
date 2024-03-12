import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {\
  const articleSlug:string

  constructor(
    private article:ArticleService,
    private route: ActivatedRoute,

  ){
    this.articleSlug = this.route.snapshot.params['articleSlug']
  }
}
