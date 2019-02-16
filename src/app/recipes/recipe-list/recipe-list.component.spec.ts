import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';

import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import * as fromApp from '../../store/app-reducer';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
import * as fromRecipes from '../../recipes/store/recipes.reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { inject } from '@angular/core';
import { TestStore } from '../../testing/store.mock';

describe('RecipeListComponent', () => {
    let component: RecipeListComponent;
    let fixture: ComponentFixture<RecipeListComponent>;
    let store: TestStore<fromRecipes.State>;

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
                }),
                BrowserAnimationsModule,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeListComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
