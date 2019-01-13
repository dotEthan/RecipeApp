import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {

        return this.httpClient.put('https://angular-testing-a4072.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {

        return this.httpClient.get<Recipe[]>('https://angular-testing-a4072.firebaseio.com/recipes.json')
            .pipe(map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}