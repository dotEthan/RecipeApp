import * as ShoppingListActions from './shopping-list.actions';
import { NamedItem } from '../../shared/namedItem.model';
import * as fromApp from '../../store/app-reducer';
import { ShoppingList } from '../shoping-list.model';

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
            const stateViewableIndexesLength = state.viewableListIndexes.length;

            if (state.wantedViewableListLength === 1) {
                newAddListIndexes = [state.shoppingLists.length - 1];
            } else {
                if (stateViewableIndexesLength === state.wantedViewableListLength) {
                    newAddListIndexes.splice(-1, 1)
                    newAddListIndexes.push(state.shoppingLists.length - 1);
                } else {
                    newAddListIndexes.push(state.shoppingLists.length - 1);
                }
            }

            return {
                ...state,
                viewableListIndexes: newAddListIndexes
            }

        case ShoppingListActions.CREATE_LIST:
            const newList = { title: 'List', ingredients: [new NamedItem('ingredient')], default: false };
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
            oldDeleteLists.splice(action.payload, 1);
            console.log(oldDeleteLists);
            return {
                ...state,
                shoppingLists: oldDeleteLists
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
            let newViewableListIndexes: number[] = [...state.viewableListIndexes];

            if (action.payload < 0) {
                const realIndex = Math.abs(action.payload + 1);
                const indexToRemove = state.viewableListIndexes.indexOf(realIndex);

                const oldIndexArray = state.viewableListIndexes.reduce((acc, nextIndex, i) => {

                    if (i < indexToRemove) {
                        acc.push(nextIndex);
                    }

                    if (i > indexToRemove) {
                        acc.push(nextIndex - 1);
                    }

                    return acc;

                }, []);
                console.log(oldIndexArray);
                newViewableListIndexes = [...oldIndexArray];

            } else if (state.viewableListIndexes.indexOf(action.payload) === -1) {
                if (state.viewableListIndexes.length === state.wantedViewableListLength) {
                    newViewableListIndexes.splice(-1, 1)
                    newViewableListIndexes.push(action.payload);
                } else {
                    newViewableListIndexes.push(action.payload);
                }
            }

            return {
                ...state,
                viewableListIndexes: newViewableListIndexes
            }
        default:
            return state;
    }
}