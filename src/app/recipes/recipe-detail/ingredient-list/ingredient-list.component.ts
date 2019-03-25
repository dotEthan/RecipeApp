import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromRecipe from '../../store/recipes.reducer';
import * as ShoppingListActions from '../../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.sass']
})
export class IngredientListComponent implements OnInit {
    @Input() ingredientsArray: [string, Ingredient[]];
    ingredientsTitle: string;
    ingredients: Ingredient[];

    constructor(private store: Store<fromRecipe.FeatureState>) { }

    ngOnInit() {
        this.ingredientsTitle = this.ingredientsArray[0];
        this.ingredients = this.ingredientsArray[1];
        console.log('ingredients list: ', this.ingredientsTitle);
    }

    onAddIngredientToList(ingredient: Ingredient) {
        this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }


}
