import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { from } from 'rxjs';

import { RecipesComponent } from '../recipes.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import * as fromApp from '../../store/app-reducer';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromRecipes from '../../recipes/store/recipes.reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

describe('RecipeListComponent', () => {
    let component: RecipeListComponent;
    let fixture: ComponentFixture<RecipeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RecipeListComponent,
                RecipeItemComponent,
            ],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
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
        fixture = TestBed.createComponent(RecipeListComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        console.log(component.recipeState);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
