import { Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { Constants } from 'src/app/common/constants';
import { AddBookModel } from 'src/app/shared/models/book/addBook.model';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  private categories: Array<GetSelectCategoryModel>;
  private currentCategoryId: string;
  private addBookForm: FormGroup;

  private firstSelect: string;

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private booksService: BooksService) {
    this.categories = JSON.parse(localStorage['categories']);
    this.firstSelect = this.getFirstSelect();
  }

  ngOnInit() {
    this.addBookForm = this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.minLength(4)]],
      description: ['', [Validators.required,
      Validators.minLength(20)]],
      price: ['', [Validators.required,
      Validators.pattern(Constants.onlyNumberPattern)]],
      category: ['']
    });
    this.getControls().price.setValue(0);
  }

  private getControls() { return this.addBookForm.controls }

  disabledSelect(): boolean {
    if (this.currentCategoryId) {
      return true;
    }

    return false;
  }

  getFirstSelect(): string{
    if(this.currentCategoryId){
      return this.currentCategoryId;
    }
    return this.categories[0].id;
  }

  add() {
    let addModel = new AddBookModel;
    addModel.categoryId = this.getControls().category.value;
    addModel.description = this.getControls().description.value;
    addModel.name = this.getControls().name.value;
    addModel.price = this.getControls().price.value;
    this.booksService.addBook(addModel).subscribe(() =>{
      this.cancel();
    }, (error) => { alert(error); });
  }

  cancel(){
    this.router.navigate(['books']);
  }

}
