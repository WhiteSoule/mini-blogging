import { User } from "./userInterface"

export interface Article {
    slug:string,
    title:string,
    description: string,
    body: string,
    tagList: string[],
    createdAt:string,
    favorited:boolean,
    updatedAt:string,
    favoritesCount:number,
    author:User
}

export interface ArticleFilter{
    tag?:string,
    author?:string,
    favorited?:string,
    offset?:number,
    limit?:number
}
export interface NewArticle extends UpdateArticle{
    tagList?: string[]|null
}

export interface UpdateArticle{
    title: string,
    description?: string|null,
    body?: string|null
}


export interface ArticlesResponse{
    articles:Article[],
    articlesCount:number
}

export interface ArticleResponse{
    article:Article
}