import * as ShoppingListActions from './shopping-list.actions';
import { NamedItem } from '../../shared/namedItem.model';
import * as fromApp from '../../store/app-reducer';

export interface FeatureState extends fromApp.AppState {
    shoppingLists: State
}

export interface State {
    shoppingLists: { title: string, ingredients: NamedItem[], default: boolean }[];
    editedIngredient: NamedItem;
    editedIngredientIndex: number;
    defaultListIndex: number
}

const initialState: State = {
    shoppingLists: [{ title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: true }, { title: 'Camping', ingredients: [new NamedItem('Tent'), new NamedItem('Soda'), new NamedItem('Burgers'), new NamedItem('Buns'), new NamedItem('Marshmallows')], default: false }],
    editedIngredient: null,
    editedIngredientIndex: -1,
    defaultListIndex: 0
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionsTypes) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            const newIngredientsArray = [...state.shoppingLists[state.defaultListIndex].ingredients, new NamedItem(action.payload.name)]
            const newShoppingList = { ...state.shoppingLists[state.defaultListIndex], ingredients: newIngredientsArray }
            const newShoppingLists = [...state.shoppingLists]
            newShoppingLists[state.defaultListIndex] = (newShoppingList);
            return {
                ...state,
                shoppingLists: newShoppingLists
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            const newIngredientsArrayIngredients = [...state.shoppingLists[state.defaultListIndex].ingredients, ...action.payload]
            const newShoppingListIngredients = { ...state.shoppingLists[state.defaultListIndex], ingredients: newIngredientsArrayIngredients }
            const newShoppingListsIngredients = [...state.shoppingLists]
            newShoppingListsIngredients[state.defaultListIndex] = (newShoppingListIngredients);
            return {
                ...state,
                shoppingLists: newShoppingListsIngredients
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