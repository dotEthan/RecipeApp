import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeItemComponent } from './recipe-item.component';
import * as fromApp from '../../../store/app-reducer';
import * as fromShoppingList from '../../../shopping-list/store/shopping-list.reducers';
import * as fromRecipes from '../../../recipes/store/recipes.reducer';
import * as fromAuth from '../../../core/auth-modal/store/auth.reducers';

describe('RecipeItemComponent', () => {
    let component: RecipeItemComponent;
    let fixture: ComponentFixture<RecipeItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
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
        fixture = TestBed.createComponent(RecipeItemComponent);
        component = fixture.componentInstance;
        component.index = 1;
        component.recipe = {
            name: 'Recipe 1',
            description: 'good',
            imagePath: 'main.jpg',
            ingredients: [],
            directions: [],
            url: '',
            keyword: '',
            tags: []
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});