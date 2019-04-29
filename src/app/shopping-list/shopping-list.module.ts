import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SlEachComponent } from './sl-each/sl-each.component';
import { IngredientInputComponent } from './sl-each/ingredient-input/ingredient-input.component';
import { SlButtonComponent } from './sl-button/sl-button.component';
import { shoppingListReducer } from './store/shopping-list.reducers';
import { ShoppingListEffects } from './store/shopping-list.effects';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        SlEachComponent,
        IngredientInputComponent,
        SlButtonComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule,
        ReactiveFormsModule,
        StoreModule.forFeature('recipes', shoppingListReducer),
        EffectsModule.forFeature([ShoppingListEffects])
    ]
})
export class ShoppingListModule { }