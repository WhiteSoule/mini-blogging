import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

  articleSlug:string
  article:Article|undefined

  constructor(
    private articleService:ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService
  ){
    this.articleSlug = this.route.snapshot.params['articleSlug']
  }

  articleForm = new FormGroup({
    title: new FormControl('',{nonNullable: true,validators:Validators.required}),
    description: new FormControl(''),
    body: new FormControl(''),
    tagList: new FormControl<string[]>([]),
  })

  newTag = new FormControl('',{nonNullable: true})

  ngOnInit(){
    if(this.articleSlug){
      this.articleService.getArticle(this.articleSlug)
      .subscribe({
        next:value=>{
          this.article = value.article
          this.articleForm.setValue({
            body:value.article.body,
            description:value.article.description,
            tagList:value.article.tagList,
            title:value.article.title
          })
        }
      })
    }
  }

  createArticle(){
    this.articleService.createArticle(this.articleForm.getRawValue())
    .subscribe({
      next: value=>{
        this.router.navigate(['article',value.article.slug])
        this.toaster.success('Article created','Success')
      },
      error:error=>{
        this.toaster.error(error)
      }
    })
  }

  addTagToList():void{
    if(!this.tagList?.includes(this.newTag.value)){
      this.articleForm.patchValue({tagList:this.tagList?.concat(this.newTag.value)})
      this.newTag.setValue('')
    }else{
      this.toaster.info(`Tag ${this.newTag.value} already present`)
    }
  }

  removeTag(tag:string){
    let newTagList = this.tagList
    newTagList?.splice(newTagList.indexOf(tag),1)
    this.articleForm.patchValue({tagList:newTagList})
  }

  get tagList():string[]|null{
    return this.articleForm.getRawValue().tagList
  }


}
