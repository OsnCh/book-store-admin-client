import { Component, OnInit, Inject } from '@angular/core';
import { GetCategoriesItemModel } from '../../models/category/getCategoriesItem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateCategoryModel } from '../../models/category/updateCategory.model';

@Component({
  selector: 'app-update-category-modal',
  templateUrl: './update-category-modal.component.html',
  styleUrls: ['./update-category-modal.component.scss']
})
export class UpdateCategoryModalComponent implements OnInit {
  private updateCategoryForm: FormGroup;
  private categoryData: GetCategoriesItemModel;

  constructor(private dialogRef: MatDialogRef<UpdateCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: GetCategoriesItemModel,
    private formBuilder: FormBuilder) { 
      this.categoryData = this.data;
      debugger;
    }


  ngOnInit() {
    this.updateCategoryForm = this.formBuilder.group({
      name: [this.categoryData.name, [Validators.required,
      Validators.minLength(4)]],
      description: ['', [Validators.required,
      Validators.minLength(20)]]
    });
    this.getControls().name.setValue(this.categoryData.name);
    this.getControls().description.setValue(this.categoryData.description);
  }

  private getControls() { return this.updateCategoryForm.controls }

  public update(){
    let updateModel = new UpdateCategoryModel;
    updateModel.id = this.categoryData.id
    updateModel.name = this.getControls().name.value;
    updateModel.description = this.getControls().description.value;
    this.dialogRef.close(updateModel)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
