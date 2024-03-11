import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone:true,
  imports:[
    NgClass,
    NgFor
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() currentPage: number=0;
  @Input() itemsPerPage: number=20;
  @Input() totalItems: number=0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter()

  constructor(){}

  get totalPages(): number{
    return Math.ceil(this.totalItems/this.itemsPerPage)
  }

  changePage(page: number):void{
    if(page >=1 && page<=this.totalPages){
      this.currentPage = page
      this.pageChanged.emit(page)
    }
  }
}
