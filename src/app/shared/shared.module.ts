import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import { MatInputModule } from '@angular/material/input';
import { AddBookModalComponent } from './components/add-book-modal/add-book-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { UpdateBookModalComponent } from './components/update-book-modal/update-book-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterComponent } from './components/filter/filter.component';
import { UpdateCategoryModalComponent } from './components/update-category-modal/update-category-modal.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';

export const sharedComponents = [
  SidebarComponent,
  AddButtonComponent,
  AddCategoryModalComponent,
  AddBookModalComponent,
  UpdateBookModalComponent,
  FilterComponent,
  UpdateCategoryModalComponent
];

@NgModule({
  declarations: [
    ...sharedComponents],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    NgbModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    //components
    ...sharedComponents
  ],
  entryComponents: [
    AddCategoryModalComponent,
    AddBookModalComponent,
    UpdateBookModalComponent,
    UpdateCategoryModalComponent
  ] //modals
})
export class SharedModule { }
