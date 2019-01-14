import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from './auth-modal/auth.service';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SigninComponent } from '../core/auth-modal/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-modal/auth-interceptor';



@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        AuthModalComponent,
        SigninComponent
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
        SigninComponent
    ],
    providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
})
export class CoreModule { }