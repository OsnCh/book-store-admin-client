import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInAuthGuard } from './core/guards/logInAuth.guard';
import { LogOutAuthGuard } from './core/guards/logOutAuth.guard';

const routes: Routes = [
    { path: "account", loadChildren: './account/account.module#AccountModule' },
    { path: "dashboard", loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [LogInAuthGuard]  },
    { path: "books", loadChildren: './books/books.module#BooksModule', canActivate: [LogInAuthGuard]  },
    { path: "magazines", loadChildren: './magazines/magazines.module#MagazinesModule', canActivate: [LogInAuthGuard]  },
    { path: "**", redirectTo:"dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
