import { Component, OnInit, ViewChild } from '@angular/core';
import { GetBooksItemModel } from 'src/app/shared/models/book/getBooksItem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetSelectCategoryModel } from 'src/app/shared/models/category/getSelectCategory.model';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';
import { UpdateBookModalComponent } from 'src/app/shared/components/update-book-modal/update-book-modal.component';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { UpdateBookModel } from 'src/app/shared/models/book/updateBook.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';
import { FilterModel } from 'src/app/shared/models/filter.model';

const paginatorSize:number = 5;

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('filter') filter: FilterComponent;

  private categoryByLink: string;

  private displayedColumns = ['select', 'name', 'description', 'price', 'isActive', 'category', 'updateColumn'];
  private allowMultiSelect = true;

  private categoryId: string;
  private books: MatTableDataSource<GetBooksItemModel>;
  private booksSelectionModel: SelectionModel<GetBooksItemModel>;

  private booksModels: Array<GetBooksItemModel>;

  private categories: Array<GetSelectCategoryModel>;

  private filterModel: FilterModel;

  constructor(private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private modal: MatDialog,
    private router: Router,
    private activateRouter:ActivatedRoute) {
    this.categoryByLink = this.activateRouter.snapshot.params['categoryId'];
  }



  ngOnInit() {
    this.updateBooks();
    this.filter.changeState.subscribe((model) => {
      this.filterModel = model;
      this.initTableModels();
    });
  }

  private updateBooks() {
    this.booksService.getBooks(this.categoryId).subscribe((data) => {
      this.booksModels = data.books;
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
      let sortArray = this.books.data.sort(compare);
      let minPrice = (this.books.data.length > 0) ? sortArray[0].price : 0;
      let maxPrice = (this.books.data.length > 0) ? sortArray[sortArray.length - 1].price : 0;
      this.filter.setData(this.categories, minPrice, maxPrice, this.categoryByLink);
    });
  }

  public addBookOpen() {
    this.router.navigate(['books', 'add']);
  }

  private openUpdateBookModal(book: GetBooksItemModel) {
    this.modal.open(UpdateBookModalComponent, {
      width: '33%',
      minWidth: '400px',
      data: { book: book, categories: this.categories }
    }).afterClosed().subscribe((updateData: UpdateBookModel) => {
       this.booksService.updateBook(updateData).subscribe(() => {
         let dataFromList = this.books.data.find(v => v.id == updateData.id);
         if(!dataFromList){
           return;
         }
        dataFromList.category = this.categories.find(c => c.id === updateData.categoryId);
        dataFromList.description = updateData.description;
        dataFromList.isActive = updateData.isActive;
        dataFromList.name = updateData.name;
        dataFromList.price = updateData.price;
        let cat = this.categories;
      })
    });
  }

  private categoriesIsAny(): boolean {
    if (!this.categories) {
      return false;
    }

    return this.categories.length > 0;
  }

  public deleteBooks(){
    this.booksService.deleteBooks(this.booksSelectionModel.
      selected.map((v) => v.id)).subscribe(() => {
        this.books.data = this.books.data.
          filter(v => !this.booksSelectionModel.selected.find(f => f.id == v.id))
          this.initTableModels();
      })
  }

  private isAllSelected() {
    const numSelected = this.booksSelectionModel.selected.length;
    const numRows = this.books.data.length;
    return numSelected == numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
    this.booksSelectionModel.clear() :
    this.books.data.forEach(row => this.booksSelectionModel.select(row));
  }

  private initTableModels(){
    this.books = new MatTableDataSource<GetBooksItemModel>((!this.filterModel)?
    this.booksModels:
    this.booksModels.filter(v => {
      let result = true;
      result = (!this.filterModel.name || v.name.indexOf(this.filterModel.name) >= 0)
      result = result && (!this.filterModel.minPrice || v.price >= this.filterModel.minPrice);
      result = result && (!this.filterModel.maxPrice || v.price <= this.filterModel.maxPrice);
      result = result && (!this.filterModel.categoryId || v.category.id == this.filterModel.categoryId);
      return result;
    }));
    this.booksSelectionModel = 
      new SelectionModel<GetBooksItemModel>(this.allowMultiSelect, this.books.data);
    this.booksSelectionModel.clear();
    this.configPaginator();
  }

  private configPaginator(){
    let paginatorSizes = new Array<number>();
    for(let i=1;i<this.books.data.length/paginatorSize  +
      (this.books.data.length%paginatorSize == 0? 0:1); i++){
        paginatorSizes.push(i*paginatorSize);
    }
    this.books.paginator = this.paginator;
    this.books.paginator.pageSizeOptions = paginatorSizes;
  }

  public disableDeleteBook(): boolean{
    if(!this.booksSelectionModel || !this.booksSelectionModel.selected){
      return false;
    }
    return this.booksSelectionModel.selected.length == 0
  }
}
