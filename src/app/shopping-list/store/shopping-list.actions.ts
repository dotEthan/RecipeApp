import { Action } from '@ngrx/store';

import { NamedItem } from '../../shared/namedItem.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_VIEWABLE_LIST = 'ADD_VIEWABLE_LIST';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_LIST = 'DELETE_LIST';
export const FETCH_SHOPPING_LISTS = 'FETCH_SHOPPING_LISTS';
export const MAXIMIZE_VIEWABLE_LIST = 'MAXIMIZE_VIEWABLE_LIST';
export const MINIMIZE_VIEWABLE_LIST = 'MINIMIZE_VIEWABLE_LIST';
export const SET_SHOPPING_LISTS = 'SET_SHOPPING_LISTS';
export const START_EDIT_INGREDIENT = 'START_EDIT_INGREDIENT';
export const START_EDIT_LIST = 'START_EDIT_LIST';
export const STOP_EDIT = 'STOP_EDIT';
export const STORE_SHOPPING_LISTS = 'STORE_SHOPPING_LISTS';
export const SWITCH_DEFAULT = 'SWITCH_DEFAULT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_SCREEN_RES = 'UPDATE_SCREEN_RES';
export const UPDATE_VIEWABLE_LIST = 'UPDATE_VIEWABLE_LIST';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: { listIndex: number, item: NamedItem }) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: NamedItem[]) { }
}

export class AddViewableList implements Action {
    readonly type = ADD_VIEWABLE_LIST;

    constructor(public payload: number) { }
}

export class CreateList implements Action {
    readonly type = CREATE_LIST;
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: { listIndex: number, index: number }) { }
}

export class DeleteList implements Action {
    readonly type = DELETE_LIST;

    constructor(public payload: number) { }
}

export class FetchShoppingLists implements Action {
    readonly type = FETCH_SHOPPING_LISTS;
}

export class MaximizeViewableList implements Action {
    readonly type = MAXIMIZE_VIEWABLE_LIST;

    constructor(public payload: number) { }
}

export class MinimizeViewableList implements Action {
    readonly type = MINIMIZE_VIEWABLE_LIST;

    constructor(public payload: number) { }
}

export class SetShoppingLists implements Action {
    readonly type = SET_SHOPPING_LISTS;

    constructor(public payload: {}[]) { }
}

export class StartEditIngredient implements Action {
    readonly type = START_EDIT_INGREDIENT;

    constructor(public payload: { listIndex: number, index: number }) { }
}

export class StartEditList implements Action {
    readonly type = START_EDIT_LIST;

    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class StoreShoppingLists implements Action {
    readonly type = STORE_SHOPPING_LISTS;
}

export class SwitchDefault implements Action {
    readonly type = SWITCH_DEFAULT;

    constructor(public payload: number) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: NamedItem) { }
}

export class UpdateList implements Action {
    readonly type = UPDATE_LIST;

    constructor(public payload: { listIndex: number, updatedList: { title: string, ingredients: NamedItem[], default: boolean } }) { }
}

export class UpdateScreenRes implements Action {
    readonly type = UPDATE_SCREEN_RES;

    constructor(public payload: number) { }
}

export class UpdateViewableList implements Action {
    readonly type = UPDATE_VIEWABLE_LIST;
}

export type ShoppingListActionsTypes =
    AddIngredient |
    AddIngredients |
    AddViewableList |
    CreateList |
    DeleteIngredient |
    DeleteList |
    FetchShoppingLists |
    MaximizeViewableList |
    MinimizeViewableList |
    SetShoppingLists |
    StartEditIngredient |
    StartEditList |
    StopEdit |
    StoreShoppingLists |
    SwitchDefault |
    UpdateIngredient |
    UpdateList |
    UpdateScreenRes |
    UpdateViewableList;