import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { GetSelectCategoryModel } from '../../models/category/getSelectCategory.model';
import { FilterModel } from '../../models/filter.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  private filterGroup: FormGroup;

  minPrice: number = 100;
  maxPrice: number = 1000;
  optionsSlider: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filterGroup = this.formBuilder.group({
      name: ['', []],
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
    this.optionsSlider.floor = minPrice;
    this.optionsSlider.ceil = maxPrice;
    delete this.optionsSlider;
    this.optionsSlider = {
      floor: this.minPrice,
      ceil: this.maxPrice,
      translate: (value: number, label: LabelType): string => {
        this.emite();
        switch (label) {
          case LabelType.Low:
            return '<b>Min price:</b> $' + value;
          case LabelType.High:
            return '<b>Max price:</b> $' + value;
          default:
            return '$' + value;
        }
      }
    };
  }

  private emite() {
    if (!this.filterGroup.valid) {
      return;
    }
    let model = new FilterModel;
    model.name = this.filterGroup.controls['name'].value;
    model.minPrice = this.minPrice;
    model.maxPrice = this.maxPrice;
    model.categoryId = this.filterGroup.controls['category'].value;
    this.changeState.emit(model);
  }
}
