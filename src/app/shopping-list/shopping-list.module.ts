import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SlEachComponent } from './sl-each/sl-each.component';
import { IngredientInputComponent } from './sl-each/ingredient-input/ingredient-input.component';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        SlEachComponent,
        IngredientInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule { }