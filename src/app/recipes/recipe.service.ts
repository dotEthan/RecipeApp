import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            "Burger",
            "really good food",
            "https://upload.wikimedia.org/wikipedia/commons/6/60/Vegan_patties_with_potatoes_and_salad.jpg",
            [
                new Ingredient('meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            "Schnitzel",
            "At best OK food",
            "https://upload.wikimedia.org/wikipedia/commons/6/60/Vegan_patties_with_potatoes_and_salad.jpg",
            [
                new Ingredient('bun', 2),
                new Ingredient('meat', 1)
            ]
        )
    ];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}