import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GetCategoriesItemModel } from '../../models/category/getCategoriesItem.model';
import { AddCategoryModel } from '../../models/category/addCategory.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {

  @ViewChild('content') content;
  @Output() onUpdateCategories: EventEmitter<any> = new EventEmitter();

  private categoryAddForm: FormGroup;
  private currentModal: NgbModalRef;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryAddForm = this.formBuilder.group({
      name:  ['', [Validators.required,
        Validators.minLength(4)]], 
      description: ['', [Validators.required,
        Validators.minLength(20)]]
      });
  }

  open() {
    this.currentModal = this.modalService.
      open(this.content, { ariaLabelledBy: 'modal-basic-title' });
    this.currentModal.result;
  }

  async add() {  
      if(!this.categoryAddForm.valid){
        return false;
      }
      let addModel = new AddCategoryModel;
      addModel.name = this.getControls().name.value;
      addModel.description = this.getControls().description.value;
      let responseResult = await this.categoryService.addCategory(addModel);
      if(!responseResult){
        return false;
      }
      this.currentModal.close();
      this.onUpdateCategories.emit();
      return true;
  }

  private getControls(){
    return this.categoryAddForm.controls;
  }

}
