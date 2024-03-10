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

export interface NewArticle extends UpdateArticle{
    tagList: string[]
}

export interface UpdateArticle{
    title: string,
    description: string,
    body: string
}


export interface ArticlesResponse{
    articles:Article[],
    articlesCount:number
}

export interface ArticleResponse{
    article:Article
}