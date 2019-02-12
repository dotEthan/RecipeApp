import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';

import { AuthModalComponent } from './auth-modal.component';
import { AuthOverComponent } from './auth-over/auth-over.component';
import { SigninComponent } from './auth-over/signin/signin.component';
import { authReducer } from './store/auth.reducers';
// Store
import * as fromApp from '../../store/app-reducer'; // from root reducer
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers'; // from feature reducers
import * as fromRecipes from '../../recipes/store/recipes.reducer'; // from feature reducers
import * as fromAuth from '../../core/auth-modal/store/auth.reducers'; // from feature reducers

describe('AuthModalComponent', () => {
  let component: AuthModalComponent;
  let fixture: ComponentFixture<AuthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthModalComponent,
        AuthOverComponent,
        SigninComponent,
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot({
          ...fromApp.reducers,
          shoppingList: combineReducers(fromShoppingList.shoppingListReducer),
          recipes: combineReducers(fromRecipes.recipeReducer),
          auth: combineReducers(fromAuth.authReducer),
        }),
        BrowserAnimationsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
