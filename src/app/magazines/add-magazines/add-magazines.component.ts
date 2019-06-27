import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MagazinesService } from 'src/app/services/magazines.service';
import { Constants } from 'src/app/common/constants';
import { AddMagazineModel } from 'src/app/shared/models/magazine/addMagazine.model';

@Component({
  selector: 'app-add-magazines',
  templateUrl: './add-magazines.component.html',
  styleUrls: ['./add-magazines.component.scss']
})
export class AddMagazinesComponent implements OnInit {

  private categories: Array<GetSelectCategoryModel>;
  private currentCategoryId: string;
  private addMagazineForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private magazinesService: MagazinesService) {
    this.categories = JSON.parse(localStorage['categories']);
  }

  ngOnInit() {
    this.addMagazineForm = this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.minLength(4)]],
      description: ['', [Validators.required,
      Validators.minLength(20)]],
      price: ['', [Validators.required,
      Validators.pattern(Constants.onlyNumberPattern)]],
      category: ['', Validators.required]
    });
    this.getControls().price.setValue(0);
  }


  private getControls() { return this.addMagazineForm.controls }

  cancel() {
    this.router.navigate(['magazines']);
  }

  public add() {
    let magazineModel = new AddMagazineModel;
    magazineModel.categoryId = this.getControls()['category'].value;
    magazineModel.description = this.getControls()['description'].value;
    magazineModel.name = this.getControls()['name'].value;
    magazineModel.price = this.getControls()['price'].value;
    this.magazinesService.addMagazine(magazineModel).subscribe(() =>
      this.cancel(), (err) => alert(err)
    );
  }

}
