import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GetCategoriesItemModel } from 'src/app/shared/models/category/getCategoriesItem.model';
import { UpdateCategoryModalComponent } from 'src/app/shared/components/update-category-modal/update-category-modal.component';
import { UpdateCategoryModel } from 'src/app/shared/models/category/updateCategory.model';

@Component({
  selector: 'app-dashboard-categories',
  templateUrl: './dashboard-categories.component.html',
  styleUrls: ['./dashboard-categories.component.scss']
})
export class DashboardCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, 
    private router: Router,
    private modal: MatDialog) {
  }

  ngOnInit() {
     this.updateCategories();
  }

  private categories: Array<GetCategoriesItemModel>;

  deleteCategory(item: GetCategoriesItemModel){
    this.categoryService.
      deleteCategory(item.id).subscribe(()=>{}, ()=>{},
        () => { this.categories = this.categories.filter((category) => category != item); });
  }

  updateCategories(){
    this.categoryService.getAllCategories().
           subscribe((response) => {
                 this.categories = response.categories;
          });
  }

  goBooks(idCategory: string){
    this.router.navigate(['books', 'category', idCategory]);
  }

  goMagazines(idCategory: string){
    this.router.navigate(['magazines','category', idCategory]);
  }

  public getUrlProducts(idCategory: string): string{
    return `dashboard/categories/${idCategory}`;
  }

  public openModalUpdateCategory(category: GetCategoriesItemModel){
    this.modal.open(UpdateCategoryModalComponent, {
      width: '33%',
      minWidth: '400px',
      data: category
    }).afterClosed().subscribe((updateData: UpdateCategoryModel) => {
      this.categoryService.updateCategory(updateData).subscribe(() => {
        let categoryChanged = this.categories.find(v => v.id == updateData.id)
        categoryChanged.name = updateData.name;
        categoryChanged.description = updateData.description;
      })
    });
  }
}
