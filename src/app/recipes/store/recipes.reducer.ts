import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';
import * as fromApp from '../../store/app-reducer';
// import { Ingredient } from 'src/app/shared/ingredient.model';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipesActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
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
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: oldRecipes
            }
        case (RecipeActions.SET_TEST_RECIPES):
            const testRecipes = [{
                description: "Modern Miracle",
                imagePath: "https://www.seriouseats.com/images/2016/10/20161004-beyond-burger-18.jpg",
                ingredients: [{ name: 'One pack Burger Buns' }, { name: 'Two Beyond Burger patties' }],
                name: "Double Decker Beyond Burger",
                directions: 'BBQ them and then put them in between the buns. Or however you like.',
                url: 'n/a'
            }, {
                description: "A tasty treat that melts in your mouth, in your hand, and even on the pavement if you drop it.",
                ingredients: [{ name: 'One cup chopped Mint' }, { name: 'Two cups full fat Coconut Milk' }, { name: 'One cup Chocolate' }, { name: 'Three plates of spinach' }, { name: 'One big toad' }],
                imagePath: "https://www.seriouseats.com/images/2015/02/20150223-vegan-ice-cream-vicky-wasik-3.jpg",
                name: "Chocolate Chip Mint Ice cream",
                directions: 'I wish I knew, I\'d never eat anything else.',
                url: 'https://lovingitvegan.com/vegan-mint-chocolate-chip-ice-cream/'
            }, {
                description: "Crunchy, chewy, delicious bread!",
                ingredients: [{ name: 'Flour' }, { name: 'water' }, { name: 'yeast' }],
                imagePath: "https://meeshiesmom.files.wordpress.com/2012/07/crusty-bread-iii.jpg",
                name: "Crusty Bread",
                directions: 'Mix together, let it rise and then bake it in a dutch oven.',
                url: 'n/a'
            }, {
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                ingredients: [{ name: 'Oyster Mushroom' }, { name: 'Seasoning' }],
                imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
                name: "Oyster Mushroom Bacon",
                directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.',
                url: 'n/a'
            }, {
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                ingredients: [{ name: 'Oyster Mushroom' }, { name: 'Seasoning' }],
                imagePath: "https://www.elegantphotoart.com/wp-content/gallery/panoramas/GN8_6820-23LN.jpg",
                name: "Oyster Mushroom Bacon",
                directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.',
                url: 'n/a'
            }, {
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                ingredients: [{ name: 'Oyster Mushroom' }, { name: 'Seasoning' }],
                imagePath: "https://cdn.photographylife.com/wp-content/uploads/2016/01/Zabriskie-Point-Panorama-400-MP.jpg",
                name: "Oyster Mushroom Bacon",
                directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.',
                url: 'n/a'
            }, {
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                ingredients: [{ name: 'Oyster Mushroom' }, { name: 'Seasoning' }],
                imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
                name: "Oyster Mushroom Bacon",
                directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.',
                url: 'n/a'
            }, {
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                ingredients: [{ name: 'Oyster Mushroom' }, { name: 'Seasoning' }],
                imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
                name: "Oyster Mushroom Bacon",
                directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.',
                url: 'n/a'
            }]
            return {
                ...state,
                recipes: testRecipes
            }
        default:
            return state;
    }
}