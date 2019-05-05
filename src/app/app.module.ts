import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app-reducer';
import { AuthEffects } from './core/auth-modal/store/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeEffects } from './recipes/store/recipes.effects';
import { ShoppingListEffects } from './shopping-list/store/shopping-list.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    RecipesModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, RecipeEffects, ShoppingListEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
