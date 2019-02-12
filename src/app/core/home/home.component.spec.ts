import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';

import { HomeComponent } from './home.component';
import * as fromApp from '../../store/app-reducer';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromRecipes from '../../recipes/store/recipes.reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
