import { User } from "./userInterface"

export interface Article {
    slug:string,
    title:string,
    description: string,
    body: string,
    tagList: string[],
    createdAt:string,
    updatedAt:string,
    favoritesCount:number,
    author:User
}


