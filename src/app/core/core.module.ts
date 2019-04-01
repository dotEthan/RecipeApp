import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SigninComponent } from '../core/auth-modal/auth-over/signin/signin.component';
import { AuthInterceptor } from './auth-modal/auth-interceptor';
import { AuthOverComponent } from './auth-modal/auth-over/auth-over.component';
import { HttpErrorInterceptor } from '../shared/error.interceptor';
import { MenuCloseDirective } from './header/menu-close.directive';



@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        AuthModalComponent,
        SigninComponent,
        AuthOverComponent,
        MenuCloseDirective
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        FormsModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        AuthModalComponent,
        SigninComponent,
        FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
    ],
})
export class CoreModule { }