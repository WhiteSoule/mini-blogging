import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environment';
import { Article, ArticleFilter, ArticleResponse, ArticlesResponse, NewArticle, UpdateArticle } from '../interfaces/article';
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

  favoriteArticle(articleSlug:string): Observable<ArticleResponse>{
    return this.http.post<ArticleResponse>(`${this.articlesUrl}/${articleSlug}/favorite`,{})
  }

  unFavoriteArticle(articleSlug:string): Observable<ArticleResponse>{
    return this.http.delete<ArticleResponse>(`${this.articlesUrl}/${articleSlug}/favorite`)
  }

  getArticle(articleSlug: string){
    return this.http.get(`${this.articlesUrl}/${articleSlug}`)
  }

  getArticles(filters:ArticleFilter):Observable<ArticlesResponse>{
    let params = new HttpParams()

    if(filters){
      if(filters.tag) {
        params = params.set('tag', filters.tag)
      }
      if(filters.author) {
        params = params.set('author', filters.author)
      }
      if(filters.favorited){
        params = params.set('favorited', filters.favorited)
      }
      if(filters.offset) {
        params = params.set('offset', filters.offset)
      }
      if(filters.limit){
        params = params.set('limit', filters.limit)
      }
    }
    const option = {
    params: params
    }

    return this.http.get<ArticlesResponse>(`${this.articlesUrl}`,option)
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
