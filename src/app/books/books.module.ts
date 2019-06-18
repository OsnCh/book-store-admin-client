import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksService } from '../services/books.service';

const routes: Routes = [
  { path: '', redirectTo: '/books/all', pathMatch: 'full' },
  { path: '', component: BooksComponent,
    children: [
      {path: 'category/:categoryId', component: ListBookComponent},
      {path: 'all', component: ListBookComponent },
      {path: 'add', component: AddBookComponent }
    ]}
];

@NgModule({
  declarations: [BooksComponent, ListBookComponent, AddBookComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers:[BooksService],
  exports: [ RouterModule ]
})
export class BooksModule { }
