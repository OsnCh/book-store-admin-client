import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardCategoriesComponent } from './dashboard-categories/dashboard-categories.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';

export const routes: Routes = [
{
    path: '', redirectTo: '/dashboard/categories', pathMatch: 'full'
},
{
    path: '', component: DashboardComponent, data: { title: 'Dashboard | NestMarket' }, 
    children: [
        {
            path: 'categories', component: DashboardCategoriesComponent
        }
    ]
}];

@NgModule({
    declarations: [DashboardComponent, DashboardCategoriesComponent, DashboardMenuComponent],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [RouterModule],
})
export class DashboardModule {

}