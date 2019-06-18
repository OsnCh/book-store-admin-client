import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetBooksItemModel } from '../../models/book/getBooksItem.model';
import { Constants } from 'src/app/common/constants';
import { UpdateBookModel } from '../../models/book/updateBook.model';
import { GetSelectCategoryModel } from '../../models/category/getSelectCategory.model';

@Component({
  selector: 'app-update-book-modal',
  templateUrl: './update-book-modal.component.html',
  styleUrls: ['./update-book-modal.component.scss']
})
export class UpdateBookModalComponent implements OnInit {
  private updateBookForm: FormGroup;
  private bookData: GetBooksItemModel;
  private categories: Array<GetSelectCategoryModel>;

  private price: number = 0;

  constructor(private dialogRef: MatDialogRef<UpdateBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder) { 
      this.bookData = data.book;
      this.categories = data.categories;
    }

  ngOnInit() {
    this.updateBookForm = this.formBuilder.group({
      name: [this.bookData.name, [Validators.required,
      Validators.minLength(4)]],
      description: ['', [Validators.required,
      Validators.minLength(20)]],
      price: [this.bookData.price, [Validators.required,
      Validators.pattern(Constants.onlyNumberPattern)]],
      category: [''],
      isActive: ['']
    });
    this.getControls().name.setValue(this.bookData.name);
    this.getControls().description.setValue(this.bookData.description);
    const selectedValue = (this.bookData.category)?this.bookData.category.id:this.categories[0].id;
    this.getControls().category.setValue(selectedValue);
    this.getControls().isActive.setValue(this.bookData.isActive);
    this.price = this.bookData.price;
  }

  private getControls() { return this.updateBookForm.controls }

  public update(){
    let updateModel = new UpdateBookModel;
    updateModel.id = this.bookData.id;
    updateModel.name = this.getControls().name.value;
    updateModel.description = this.getControls().description.value;
    updateModel.price = this.getControls().price.value;
    updateModel.categoryId = this.getControls().category.value;
    updateModel.isActive = this.getControls().isActive.value;
    this.dialogRef.close(updateModel)
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
