import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetSelectCategoryModel } from '../../models/category/getSelectCategory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/common/constants';
import { AddBookModel } from '../../models/book/addBook.model';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {

  private categories: Array<GetSelectCategoryModel>;
  private currentCategoryId: string;
  private addBookForm: FormGroup;

  private firstSelect: string;

  constructor(private dialogRef: MatDialogRef<AddBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder) {
    this.categories = data.categories;
    this.currentCategoryId = data.currentCategoryId;
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
    this.dialogRef.close(addModel);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
