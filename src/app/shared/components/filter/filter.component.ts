import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { GetSelectCategoryModel } from '../../models/category/getSelectCategory.model';
import { FilterModel } from '../../models/filter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/common/constants';
import { MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  private filterGroup: FormGroup;

  private minPrice: number;
  private maxPrice: number;
  private minValuePrice: number;
  private maxValuePrice: number; 
  private intervalPrice: number;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterGroup = this.formBuilder.group({
      name: ['', []],
      minPrice: ['', [Validators.pattern(Constants.onlyNumberPattern)]],
      maxPrice: ['', [Validators.pattern(Constants.onlyNumberPattern)]],
      category: ['']
    });
  }

  @Output() changeState: EventEmitter<FilterModel> = new EventEmitter();

  private categories: Array<GetSelectCategoryModel>;

  public setData(categories: Array<GetSelectCategoryModel>, minPrice: number, maxPrice:number, selectCategory?: string) {
    this.categories = categories;
    if (selectCategory) {
        this.filterGroup.controls['category'].setValue(selectCategory);
        this.filterGroup.controls['category'].disable();
        this.emite();
    }
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.intervalPrice = (maxPrice - minPrice)/100;
  }

  private emite() {
    if (!this.filterGroup.valid) {
      return;
    }
    let model = new FilterModel;
    model.name = this.filterGroup.controls['name'].value;
    model.minPrice = this.filterGroup.controls['minPrice'].value;
    model.maxPrice = this.filterGroup.controls['maxPrice'].value;
    model.categoryId = this.filterGroup.controls['category'].value;
    this.changeState.emit(model);
  }
}
