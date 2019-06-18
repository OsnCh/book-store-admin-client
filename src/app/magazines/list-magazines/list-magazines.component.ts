import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';
import { MatTableDataSource } from '@angular/material/table';
import { GetMagazinesItemModel } from 'src/app/shared/models/magazine/getMagazinesItem.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MagazinesService } from 'src/app/services/magazines.service';
import { GetCategoriesItemModel } from 'src/app/shared/models/category/getCategoriesItem.model';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { FilterModel } from 'src/app/shared/models/filter.model';

const paginatorSize:number = 10;

@Component({
  selector: 'app-list-magazines',
  templateUrl: './list-magazines.component.html',
  styleUrls: ['./list-magazines.component.scss']
})
export class ListMagazinesComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('filter') filter: FilterComponent;

  private categoryByLink: string;
  private displayedColumns = ['select', 'name', 'description', 'price', 'isActive', 'category', 'updateColumn'];
  private allowMultiSelect = true;

  private categoryId: string;
  private magazines: MatTableDataSource<GetMagazinesItemModel>;
  private magazineModels: Array<GetMagazinesItemModel>;
  private magazineSelectionModel: SelectionModel<GetMagazinesItemModel>;

  private filterModel: FilterModel;
  private categories: Array<GetSelectCategoryModel>;

  constructor(private activatedRoute: ActivatedRoute,
    private magazinesService: MagazinesService, 
    private modal: MatDialog,
    private router: Router,
    private activateRouter:ActivatedRoute) {
    this.categoryByLink = this.activateRouter.snapshot.params['categoryId'];
  }

  ngOnInit() {
    this.updateBooks();
    this.filter.changeState.subscribe((model) => {
      this.filterModel = model;
      this.updateBooks();
    })
  }

  private updateBooks() {
    this.magazinesService.getMagazines(this.categoryId).subscribe((data) => {
      this.magazineModels = data.magazines;
      this.initTableModels();
      localStorage['categories'] = JSON.stringify(data.categories);
      this.categories = data.categories;
      let compare = (v1, v2) => {
        if(v1.price>v2.price)
          return 1
        if(v1.price<v2.price)
          return -1;
        return 0;
      }
      let sortArray = this.magazines.data.sort(compare);
      let minPrice = (this.magazines.data.length > 0) ? sortArray[0].price : 0;
      let maxPrice = (this.magazines.data.length > 0) ? sortArray[sortArray.length - 1].price : 0;
      debugger;
      this.filter.setData(this.categories, minPrice, maxPrice, this.categoryByLink);
    });
  }

  private configPaginator(){
    let paginatorSizes = new Array<number>();
    for(let i=1;i<this.magazines.data.length/paginatorSize  +
      (this.magazines.data.length%paginatorSize == 0? 0:1); i++){
        paginatorSizes.push(i*paginatorSize);
    }
    this.magazines.paginator = this.paginator;
    this.magazines.paginator.pageSizeOptions = paginatorSizes;
  }

  private categoriesIsAny(): boolean {
    if (!this.categories) {
      return false;
    }

    return this.categories.length > 0;
  }

  private isAllSelected() {
    const numSelected = this.magazineSelectionModel.selected.length;
    const numRows = this.magazines.data.length;
    return numSelected == numRows;
  }

  private masterToggle() {
    this.isAllSelected() ?
    this.magazineSelectionModel.clear() :
    this.magazines.data.forEach(row => this.magazineSelectionModel.select(row));
  }

  private goUpdateMagazine(magazine: GetMagazinesItemModel){
    localStorage['magazineModel'] = JSON.stringify(magazine);
    this.router.navigate(['magazines', 'update']);
  }

  private initTableModels(){
    this.magazines= new MatTableDataSource<GetMagazinesItemModel>((!this.filterModel)?
    this.magazineModels:
    this.magazineModels.filter(v => {
      let result = true;
      result = (!this.filterModel.name || v.name.indexOf(this.filterModel.name) >= 0)
      debugger;
      result = result && (!this.filterModel.minPrice || v.price >= this.filterModel.minPrice);
      result = result && (!this.filterModel.maxPrice || v.price <= this.filterModel.maxPrice);
      result = result && (!this.filterModel.categoryId || v.category.id == this.filterModel.categoryId);
      debugger;
      return result;
    }));
    this.magazineSelectionModel = 
      new SelectionModel<GetMagazinesItemModel>(this.allowMultiSelect, this.magazines.data);
    this.magazineSelectionModel.clear();
    this.configPaginator();
  }

  private delete(){
    this.magazinesService.delete(this.magazineSelectionModel.
      selected.map((v) => v.id)).subscribe(async () => {
        await Promise.call(this.magazines.data = this.magazines.data.
          filter(e => {
            !this.magazineSelectionModel.selected.find(f => f.id == e.id)
          }));
        await Promise.call(this.initTableModels());
      })
  }

  private disableDeleteMagazines(): boolean{
    if(!this.magazineSelectionModel || !this.magazineSelectionModel.selected){
      return false;
    }
    return this.magazineSelectionModel.selected.length == 0
  }

}
