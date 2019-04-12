import { Action } from '@ngrx/store';
import { NamedItem } from '../../shared/namedItem.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const SWITCH_DEFAULT = 'SWITCH_DEFAULT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: { listIndex: number, item: NamedItem }) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: NamedItem[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: NamedItem) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;

    constructor(public payload: { listIndex: number, index: number }) { }
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: { listIndex: number, index: number }) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class CreateList implements Action {
    readonly type = CREATE_LIST;
}

export class DeleteList implements Action {
    readonly type = DELETE_LIST;

    constructor(public payload: number) { }
}

export class SwitchDefault implements Action {
    readonly type = SWITCH_DEFAULT;

    constructor(public payload: number) { }
}

export type ShoppingListActionsTypes =
    AddIngredient |
    AddIngredients |
    UpdateIngredient |
    DeleteIngredient |
    StartEdit |
    StopEdit |
    CreateList |
    DeleteList |
    SwitchDefault;