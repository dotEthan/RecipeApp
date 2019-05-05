import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const SET_RECIPES = 'SET_RECIPES';
export const STORE_RECIPES = 'STORE_RECIPES';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';


export class AddRecipe implements Action {
    readonly type = ADD_RECIPE

    constructor(public payload: Recipe) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE

    constructor(public payload: number) { }
}

export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES
    constructor() { console.log('fetch'); }
}

export class SetRecipes implements Action {
    readonly type = SET_RECIPES

    constructor(public payload: Recipe[]) { console.log('set'); }
}

export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES

    constructor() { console.log('store'); }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE

    constructor(public payload: { index: number, updatedRecipe: Recipe }) { }
}

export type RecipesActions = SetRecipes |
    AddRecipe |
    UpdateRecipe |
    DeleteRecipe |
    StoreRecipes |
    FetchRecipes;