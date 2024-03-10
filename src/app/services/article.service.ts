import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environment';
import { ArticleResponse, ArticlesResponse, NewArticle, UpdateArticle } from '../interfaces/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl
  private articlesUrl = this.apiUrl+'/articles'

  constructor(
    private http:HttpClient,
    private router:Router,
    private toast:ToastrService
  ) { }

  favoriteArticle(articleSlug:string){
    return this.http.post(`${this.articlesUrl}/${articleSlug}/favorite`,{})
  }

  unFavoriteArticle(articleSlug:string){
    return this.http.delete(`${this.articlesUrl}/${articleSlug}/favorite`)
  }

  getArticle(articleSlug: string){
    return this.http.get(`${this.articlesUrl}/${articleSlug}`)
  }

  getArticles():Observable<ArticlesResponse>{
    return this.http.get<ArticlesResponse>(`${this.articlesUrl}`)
  }
  
  getFeedArticles():Observable<ArticlesResponse>{
    return this.http.get<ArticlesResponse>(`${this.articlesUrl}/feed`)
  }

  createArticle(newArticle:NewArticle):Observable<ArticleResponse>{
    const body={
      "article":{...newArticle}
    }
    return this.http.post<ArticleResponse>(`${this.articlesUrl}`,body)
  }

  updateArticle(updateArticle:UpdateArticle,articleSlug:string){
    const body={
      "article":{...updateArticle}
    }
    return this.http.put<ArticleResponse>(`${this.articlesUrl}/${articleSlug}`,body)
  }

  deleteArticle(articleSlug:string){
    return this.http.delete<ArticleResponse>(`${this.articlesUrl}/${articleSlug}`)
  }
}
