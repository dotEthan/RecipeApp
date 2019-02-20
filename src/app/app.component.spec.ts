import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { AuthModalComponent } from './core/auth-modal/auth-modal.component';
import { AuthOverComponent } from './core/auth-modal/auth-over/auth-over.component';
import { SigninComponent } from './core/auth-modal/auth-over/signin/signin.component';
// Store
import * as fromApp from './store/app-reducer'; // from root reducer
import * as fromShoppingList from './shopping-list/store/shopping-list.reducers'; // from feature reducers
import * as fromRecipes from './recipes/store/recipes.reducer'; // from feature reducers
import * as fromAuth from './core/auth-modal/store/auth.reducers'; // from feature reducers

import * as AuthActions from './core/auth-modal/store/auth.actions'; // actions to test
import * as RecipeActions from './recipes/store/recipes.actions'; // actions to test
import * as ShoppingListActions from './shopping-list/store/shopping-list.actions'; // actions to test


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        AuthModalComponent,
        AuthOverComponent,
        SigninComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({
          ...fromApp.reducers,
          shoppingList: combineReducers(fromShoppingList.shoppingListReducer),
          recipes: combineReducers(fromRecipes.recipeReducer),
          auth: combineReducers(fromAuth.authReducer),
        }),
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // store = TestBed.get(Store);
    // spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call local storage and check if token exists', () => {
    let spy = spyOn(localStorage, 'getItem').and.callFake((key) => {
      return key;
    });

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith('token');
  });

  it('should initialize firebase app if it does not already exist', () => {
    // firebase.
    console.log('inside', firebase.apps.length);
    let spy = spyOn(firebase, 'initializeApp').and.returnValue(true);

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

});
