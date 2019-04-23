import { Action } from '@ngrx/store';

import { NamedItem } from '../../shared/namedItem.model';
import { ShoppingList } from '../shoping-list.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_LIST = 'DELETE_LIST';
export const SET_SHOPPING_LISTS = 'SET_SHOPPING_LISTS';
export const START_EDIT_INGREDIENT = 'START_EDIT_INGREDIENT';
export const START_EDIT_LIST = 'START_EDIT_LIST';
export const STOP_EDIT = 'STOP_EDIT';
export const SWITCH_DEFAULT = 'SWITCH_DEFAULT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const UPDATE_LIST = 'UPDATE_LIST';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: { listIndex: number, item: NamedItem }) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: NamedItem[]) { }
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

export type ShoppingListActionsTypes =
    AddIngredient |
    AddIngredients |
    CreateList |
    DeleteIngredient |
    DeleteList |
    SetShoppingLists |
    StartEditIngredient |
    StartEditList |
    StopEdit |
    SwitchDefault |
    UpdateIngredient |
    UpdateList;