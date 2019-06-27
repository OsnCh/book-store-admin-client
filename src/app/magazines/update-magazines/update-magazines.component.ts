import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private magazinesService: MagazinesService) {
  }

  ngOnInit() {
    this.updateMagazineForm = this.formBuilder.group({
      name: ['', [Validators.required,
      Validators.minLength(4)]],
      description: ['', [Validators.required,
      Validators.minLength(20)]],
      price: ['', [Validators.required,
      Validators.pattern(Constants.onlyNumberPattern)]],
      category: ['', Validators.required],
      isActive: ['']
    });
    this.parseRouteData();
  }

  private parseRouteData(){
    this.route.params.subscribe(async paramsId => {
      if (!paramsId.id) {
        this.cancel();
        return;
      }
      this.route.queryParams.subscribe(params => {
        if (!params || !params.magazine || !params.categories) {
          this.getDataFromApi(paramsId.id);
          return; 
        }
        try {
          this.categories = JSON.parse(params.categories);
          this.magazineModel = JSON.parse(params.magazine);
          this.initForm();
        } catch{
          this.getDataFromApi(paramsId.id);
        }
      });
    });
  }

  private getDataFromApi(id: string) {
    this.magazinesService.getMagazine(id).subscribe((response) => {
      this.magazineModel = response.magazine;
      this.categories = response.categories;
      this.initForm();
    }, () => this.cancel());
  }

  private initForm() {
    this.getControls()['name'].setValue(this.magazineModel.name);
    this.getControls()['description'].setValue(this.magazineModel.description);
    setTimeout(() => this.getControls()['price'].setValue(this.magazineModel.price), 0);
    this.getControls()['category'].setValue(this.magazineModel.category.id);
    this.getControls()['isActive'].setValue(this.magazineModel.isActive);
  }

  private getControls() { return this.updateMagazineForm.controls }

  public cancel() {
    this.router.navigate(['magazines']);
  }

  public update() {
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
