import { NgModule, ErrorHandler, Optional, SkipSelf } from '@angular/core';
import { ErrorInterceptor } from './intercepters/error.intercepter';
import { LogInAuthGuard } from './guards/logInAuth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiIntercepter } from './intercepters/api.intercepter';
import { throwIfAlreadyLoaded } from './guards/module-imports-guard';
import { LogOutAuthGuard } from './guards/logOutAuth.guard';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: ErrorInterceptor,
       multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntercepter,
      multi: true
    },
    LogInAuthGuard,
    LogOutAuthGuard,
  ],
  exports: [HttpClientModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
 }
