import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from './auth-modal/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { SigninComponent } from '../core/auth-modal/signin/signin.component';
import { FormsModule } from '@angular/forms';



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
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService
    ],
})
export class CoreModule { }