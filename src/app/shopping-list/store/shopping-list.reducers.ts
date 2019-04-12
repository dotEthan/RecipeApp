import * as ShoppingListActions from './shopping-list.actions';
import { NamedItem } from '../../shared/namedItem.model';
import * as fromApp from '../../store/app-reducer';
import { StateObservable } from '@ngrx/store';

export interface FeatureState extends fromApp.AppState {
    shoppingLists: State
}

export interface State {
    shoppingLists: { title: string, ingredients: NamedItem[], default: boolean }[];
    editedListIndex: number
    editedIngredientIndex: number
    defaultListIndex: number
}

const initialState: State = {
    shoppingLists: [{ title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: true }, { title: 'Camping', ingredients: [new NamedItem('Tent'), new NamedItem('Soda'), new NamedItem('Burgers'), new NamedItem('Buns'), new NamedItem('Marshmallows')], default: false }],
    editedListIndex: -1,
    editedIngredientIndex: -1,
    defaultListIndex: 0
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            let properListIndex = action.payload.listIndex;
            if (properListIndex === -1) {
                properListIndex = state.defaultListIndex;
            }
            const newIngredientsArray = [...state.shoppingLists[properListIndex].ingredients, action.payload.item];
            const newShoppingList = { ...state.shoppingLists[properListIndex], ingredients: newIngredientsArray };
            const newShoppingLists = [...state.shoppingLists];
            newShoppingLists[properListIndex] = (newShoppingList);
            return {
                ...state,
                shoppingLists: newShoppingLists
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            const newIngredientsArrayIngredients = [...state.shoppingLists[state.defaultListIndex].ingredients, ...action.payload];
            const newShoppingListIngredients = { ...state.shoppingLists[state.defaultListIndex], ingredients: newIngredientsArrayIngredients };
            const newShoppingListsIngredients = [...state.shoppingLists];
            newShoppingListsIngredients[state.defaultListIndex] = (newShoppingListIngredients);
            return {
                ...state,
                shoppingLists: newShoppingListsIngredients
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updatedIngredient = action.payload;
            const updatedIngredientsArray = [...state.shoppingLists[state.editedListIndex].ingredients];
            updatedIngredientsArray[state.editedIngredientIndex] = updatedIngredient;
            const updatedShoppingList = { ...state.shoppingLists[state.editedListIndex], ingredients: updatedIngredientsArray };
            const updatedShoppingLists = [...state.shoppingLists];
            updatedShoppingLists[state.editedListIndex] = updatedShoppingList;
            return {
                ...state,
                shoppingLists: updatedShoppingLists
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            const newDeleteList = [];
            const oldItemArray = [...state.shoppingLists[action.payload.listIndex].ingredients];
            oldItemArray.splice(action.payload.index, 1);
            state.shoppingLists.forEach((list, i) => {
                if (i === action.payload.listIndex) {
                    newDeleteList.push({ title: list.title, ingredients: oldItemArray, default: list.default });
                } else {
                    newDeleteList.push(list);
                }
            });

            return {
                ...state,
                shoppingLists: newDeleteList
            }
        case ShoppingListActions.START_EDIT:
            let properIngredientIndex = action.payload.index
            if (properIngredientIndex === -1) properIngredientIndex = state.shoppingLists[action.payload.listIndex].ingredients.length - 1;
            console.log(properIngredientIndex);
            return {
                ...state,
                editedListIndex: action.payload.listIndex,
                editedIngredientIndex: properIngredientIndex
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedListIndex: -1,
                editedIngredientIndex: -1
            }
        case ShoppingListActions.CREATE_LIST:
            const newList = { title: '', ingredients: [], default: false };
            const newLists = [...state.shoppingLists, newList];
            return {
                ...state,
                shoppingLists: newLists
            }
        case ShoppingListActions.DELETE_LIST:
            const oldDeleteLists = [...state.shoppingLists]
            oldDeleteLists.splice(action.payload, 1);
            return {
                ...state,
                shoppingLists: oldDeleteLists
            }
        case ShoppingListActions.SWITCH_DEFAULT:
            return {
                ...state,
                defaultListIndex: action.payload
            }
        default:
            return state;
    }
}