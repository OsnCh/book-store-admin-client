import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardCategoriesComponent } from './dashboard-categories/dashboard-categories.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { CategoryService } from '../services/category.service';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from '../services/order.service';

export const routes: Routes = [
{
    path: '', redirectTo: '/dashboard/categories', pathMatch: 'full'
},
{
    path: '', component: DashboardComponent, data: { title: 'Dashboard | NestMarket' }, 
    children: [
        {
            path: 'categories', component: DashboardCategoriesComponent
        },
        {
            path: 'orders', component: OrdersComponent
        }
    ]
}];

@NgModule({
    declarations: [DashboardComponent, DashboardCategoriesComponent, DashboardMenuComponent, OrdersComponent],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
    ],
    providers: [CategoryService, OrderService],
    exports: [RouterModule],
})
export class DashboardModule {

}