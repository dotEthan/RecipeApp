import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .pipe(ofType(RecipesActions.FETCH_RECIPES),
            switchMap((action: RecipesActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://angular-testing-a4072.firebaseio.com/recipes.json')
            }),
            map(
                (recipes) => {
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: RecipesActions.SET_RECIPES,
                        payload: recipes
                    };
                }
            ));

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .pipe(ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                console.log(state);
                return this.httpClient.put('https://angular-testing-a4072.firebaseio.com/recipes.json', state.recipes);
            }));

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromRecipes.FeatureState>) { }
}