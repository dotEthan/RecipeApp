import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthOverComponent } from './auth-over.component';
import { SigninComponent } from './signin/signin.component';
import * as fromApp from '../../../store/app-reducer';
import * as fromShoppingList from '../../../shopping-list/store/shopping-list.reducers';
import * as fromRecipes from '../../../recipes/store/recipes.reducer';
import * as fromAuth from '../../../core/auth-modal/store/auth.reducers';

describe('AuthOverComponent', () => {
  let component: AuthOverComponent;
  let fixture: ComponentFixture<AuthOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthOverComponent,
        SigninComponent
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
