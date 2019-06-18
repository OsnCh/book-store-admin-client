import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MagazinesService } from 'src/app/services/magazines.service';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { Constants } from 'src/app/common/constants';
import { GetMagazinesItemModel } from 'src/app/shared/models/magazine/getMagazinesItem.model';
import { UpdateMagazineModel } from 'src/app/shared/models/magazine/updateMagazine.model';

@Component({
  selector: 'app-update-magazines',
  templateUrl: './update-magazines.component.html',
  styleUrls: ['./update-magazines.component.scss']
})
export class UpdateMagazinesComponent implements OnInit {

  private categories: Array<GetSelectCategoryModel>;
  private currentCategoryId: string;
  private updateMagazineForm: FormGroup;
  private magazineModel: GetMagazinesItemModel;

  private price: number;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private magazinesService: MagazinesService) {
    this.categories = JSON.parse(localStorage['categories']);
    this.magazineModel = JSON.parse(localStorage['magazineModel']);
    if(!this.magazineModel){
      router.navigate(['magazines']);    
    }
  }

  ngOnInit() {
    this.updateMagazineForm = this.formBuilder.group({
      name: [this.magazineModel.name, [Validators.required,
      Validators.minLength(4)]],
      description: [this.magazineModel.description, [Validators.required,
      Validators.minLength(20)]],
      price: ['', [Validators.required,
      Validators.pattern(Constants.onlyNumberPattern)]],
      category: [this.magazineModel.category.id, Validators.required],
      isActive: [this.magazineModel.isActive]
    });
    setTimeout(() => this.price = this.magazineModel.price,0)
  }

  private getControls() { return this.updateMagazineForm.controls }

  cancel() {
    this.router.navigate(['magazines']);
  }

  private update(){
    let updateModel = new UpdateMagazineModel;
    updateModel.id = this.magazineModel.id;
    updateModel.name = this.getControls()['name'].value;
    updateModel.isActive = this.getControls()['isActive'].value;
    updateModel.price = this.getControls()['price'].value;
    updateModel.categoryId = this.getControls()['category'].value;
    updateModel.description = this.getControls()['description'].value;
    this.magazinesService.updateMagazines(updateModel).subscribe(() => this.cancel(), 
      (err) => alert(err));
  }

}
