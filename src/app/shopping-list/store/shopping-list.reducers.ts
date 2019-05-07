import * as ShoppingListActions from './shopping-list.actions';
import { NamedItem } from '../../shared/namedItem.model';
import * as fromApp from '../../store/app-reducer';
import { ShoppingList } from '../shoping-list.model';
import { debug } from 'util';

export interface FeatureState extends fromApp.AppState {
    shoppingLists: State
}

export interface State {
    shoppingLists: { title: string, ingredients: NamedItem[], default: boolean }[];
    editedListIndex: number;
    editedIngredientIndex: number;
    defaultListIndex: number;
    viewableListIndexes: number[];
    wantedViewableListLength: number;
}

const initialState: State = {
    shoppingLists: [{ title: '', ingredients: [new NamedItem('')], default: true }],
    editedListIndex: -1,
    editedIngredientIndex: -1,
    defaultListIndex: 0,
    viewableListIndexes: [0],
    wantedViewableListLength: 1,
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            let properListIndex = action.payload.listIndex;
            if (properListIndex === -1) {
                properListIndex = state.defaultListIndex;
            }
            const newIngredientIngredientsArray = [...state.shoppingLists[properListIndex].ingredients, action.payload.item];
            const newIngredientShoppingList = { ...state.shoppingLists[properListIndex], ingredients: newIngredientIngredientsArray };
            const newIngredientShoppingLists = [...state.shoppingLists];
            newIngredientShoppingLists[properListIndex] = (newIngredientShoppingList);
            return {
                ...state,
                shoppingLists: newIngredientShoppingLists
            }

        case ShoppingListActions.ADD_INGREDIENTS:
            const newIngredientsIngredientsArray = [...state.shoppingLists[state.defaultListIndex].ingredients, ...action.payload];
            const newIngredientsShoppingList = { ...state.shoppingLists[state.defaultListIndex], ingredients: newIngredientsIngredientsArray };
            const newIngredientsShoppingLists = [...state.shoppingLists];
            newIngredientsShoppingLists[state.defaultListIndex] = (newIngredientsShoppingList);
            return {
                ...state,
                shoppingLists: newIngredientsShoppingLists
            }

        case ShoppingListActions.ADD_VIEWABLE_LIST:
            let newAddListIndexes: number[] = [...state.viewableListIndexes];
            newAddListIndexes.splice(action.payload, 1, state.shoppingLists.length - 1)

            return {
                ...state,
                viewableListIndexes: newAddListIndexes
            }

        case ShoppingListActions.CREATE_LIST:
            const newList = { default: false, ingredients: [new NamedItem('Default Ingredient')], title: 'Default Title' };
            const newLists = [...state.shoppingLists, newList];
            return {
                ...state,
                shoppingLists: newLists
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

        case ShoppingListActions.DELETE_LIST:
            const oldDeleteLists = [...state.shoppingLists]
            const indexToRemove = state.viewableListIndexes.indexOf(action.payload);
            const oldViewableList = [...state.viewableListIndexes];

            oldDeleteLists.splice(action.payload, 1);
            oldViewableList.splice(indexToRemove, 1, -1);
            const nonDeletedViewableListIndexes = oldViewableList.map((thisIndex) => (thisIndex > action.payload) ? thisIndex - 1 : thisIndex);
            console.log(oldDeleteLists);
            console.log(nonDeletedViewableListIndexes);
            return {
                ...state,
                shoppingLists: oldDeleteLists,
                viewableListIndexes: nonDeletedViewableListIndexes
            }

        case ShoppingListActions.MAXIMIZE_VIEWABLE_LIST:
            let newMaxedViewableListIndexes: number[] = [...state.viewableListIndexes];
            const firstOpenIndexMax = newMaxedViewableListIndexes.indexOf(-1);

            newMaxedViewableListIndexes.splice(firstOpenIndexMax, 1, action.payload);

            return {
                ...state,
                viewableListIndexes: newMaxedViewableListIndexes
            }

        case ShoppingListActions.MINIMIZE_VIEWABLE_LIST:
            let newMinedViewableListIndexes: number[] = [...state.viewableListIndexes];

            newMinedViewableListIndexes.splice(action.payload, 1, -1);

            return {
                ...state,
                viewableListIndexes: newMinedViewableListIndexes
            }

        case ShoppingListActions.SET_SHOPPING_LISTS:
            return {
                ...state,
                shoppingLists: action.payload
            }

        case ShoppingListActions.START_EDIT_INGREDIENT:
            let properIngredientIndex = action.payload.index
            if (properIngredientIndex === -1) properIngredientIndex = state.shoppingLists[action.payload.listIndex].ingredients.length - 1;
            return {
                ...state,
                editedListIndex: action.payload.listIndex,
                editedIngredientIndex: properIngredientIndex
            }

        case ShoppingListActions.START_EDIT_LIST:

            return {
                ...state,
                editedListIndex: action.payload
            }

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedListIndex: -1,
                editedIngredientIndex: -1
            }

        case ShoppingListActions.SWITCH_DEFAULT:
            return {
                ...state,
                defaultListIndex: action.payload
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

        case ShoppingListActions.UPDATE_LIST:
            let updatedListSL = [...state.shoppingLists];
            updatedListSL[action.payload.listIndex] = action.payload.updatedList;
            return {
                ...state,
                shoppingLists: updatedListSL
            }

        case ShoppingListActions.UPDATE_SCREEN_RES:
            let newWantedLength: number;

            if (action.payload < 768) newWantedLength = 1;
            if (action.payload > 768 && action.payload < 1024) newWantedLength = 2;
            if (action.payload > 1024) newWantedLength = 4;

            return {
                ...state,
                wantedViewableListLength: newWantedLength
            }

        case ShoppingListActions.UPDATE_VIEWABLE_LIST:
            const newViewableListIndexesArray = [];
            const currentIndexArray = [...state.viewableListIndexes];

            for (let i = 0; i < state.wantedViewableListLength; i++) {
                (currentIndexArray[i] !== undefined) ? newViewableListIndexesArray.push(currentIndexArray[i]) : newViewableListIndexesArray.push(-1)
            }

            return {
                ...state,
                viewableListIndexes: newViewableListIndexesArray
            }

        default:
            return state;
    }
}