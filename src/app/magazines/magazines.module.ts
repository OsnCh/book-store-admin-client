import { NgModule } from '@angular/core';
import { MagazinesComponent } from './magazines.component';
import { Routes, RouterModule } from '@angular/router';
import { ListMagazinesComponent } from './list-magazines/list-magazines.component';
import { UpdateMagazinesComponent } from './update-magazines/update-magazines.component';
import { AddMagazinesComponent } from './add-magazines/add-magazines.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: '/magazines/all', pathMatch: 'full' }
  ,{
    path: '', component: MagazinesComponent,
    children: [
      { path: 'category/:categoryId', component: ListMagazinesComponent },
      { path: 'all', component: ListMagazinesComponent },
      { path: 'add', component: AddMagazinesComponent },
      { path: 'update', component: UpdateMagazinesComponent }
    ]
  }
];

@NgModule({
  declarations: [MagazinesComponent, ListMagazinesComponent, UpdateMagazinesComponent, AddMagazinesComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MagazinesModule { }
