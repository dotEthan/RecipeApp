import * as ShoppingListActions from './shopping-list.actions';

import { NamedItem } from '../../shared/namedItem.model';

export interface State {
    ingredients: NamedItem[];
    editedIngredient: NamedItem;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [new NamedItem('apples'), new NamedItem('papayas')],
    editedIngredient: null,
    editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const newIngredients = [...state.ingredients];
            newIngredients[state.editedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: newIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.START_EDIT:
            const editedIngredient = state.ingredients[action.payload];
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
            return state;
    }
}