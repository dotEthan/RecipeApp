import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, tap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { from, empty } from 'rxjs';

import * as RecipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';
import * as fromApp from '../../store/app-reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>) { }

    @Effect()
    recipeFetch = this.actions$
        .pipe(ofType(RecipesActions.FETCH_RECIPES),
            switchMap((action) => {
                let uid = firebase.auth().currentUser.uid;
                // console.log('recipes fetch start', uid);
                return from(this.httpClient.get<Recipe[]>('https://angular-testing-a4072.firebaseio.com/' + uid + '/recipes.json')
                    .pipe(
                        // map((response) => {
                        //     console.log("recipes response: ", response);
                        //     return response;
                        // }),
                        catchError((err) => {
                            console.log('recipes err: ', err);
                            return empty();
                        })
                    ))
            }),
            map((recipes) => {
                // console.log('fetching recipes:', recipes);
                for (let recipe of recipes) {
                    // console.log('in for loop', recipe);
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [{ title: 'default', item: [] }];
                    }
                }
                // console.log('after fetching recipes:', recipes);
                return {
                    type: RecipesActions.SET_RECIPES,
                    payload: recipes
                };
            }
            ));

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .pipe(ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes'), this.store.select('auth')),
            switchMap(([action, recipesState, authState]) => {
                // console.log('storing: ', authState);
                let uid = firebase.auth().currentUser.uid;
                let token = authState.token;

                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': token
                    })
                };

                return this.httpClient.put<Recipe[]>('https://angular-testing-a4072.firebaseio.com/' + uid + '/recipes.json', recipesState.recipes, httpOptions)
                    .pipe(
                        // map((response) => console.log("the response", response)),
                        catchError((err) => {
                            console.log('put request error: ', err);
                            return empty();
                        }));
            }));
}