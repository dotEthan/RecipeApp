import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app-reducer';
import { NamedItem } from 'src/app/shared/namedItem.model';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [{
        name: '',
        description: '',
        imagePath: '',
        ingredients: [{ title: '', item: [new NamedItem('')] }],
        directions: [{ title: '', item: [new NamedItem('')] }],
        url: '',
        keyword: '',
        tags: ['']
    }]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipesActions) {
    switch (action.type) {
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: oldRecipes
            }
        case (RecipeActions.SET_RECIPES):
            console.log('setting recipes');
            return {
                ...state,
                recipes: [...action.payload]
            }
        case (RecipeActions.UPDATE_RECIPE):
            const theRecipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...theRecipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            }
        default:
            return state;
    }
}