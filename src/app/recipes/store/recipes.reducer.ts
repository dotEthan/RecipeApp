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
    recipes: []
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
            let testRecipes: Recipe[];

            testRecipes = [{
                name: "Double Decker Beyond Burger",
                description: "Modern Miracle",
                imagePath: "https://www.seriouseats.com/images/2016/10/20161004-beyond-burger-18.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Burger',
                        item: [new NamedItem('Seasonings'), new NamedItem('Two Beyond Burger patties')]
                    }, {
                        title: 'Buns',
                        item: [new NamedItem('Flour'), new NamedItem('Water'), new NamedItem('Yeast')]
                    }, {
                        title: 'Sauce',
                        item: [new NamedItem('A dollop of Mayo'), new NamedItem('A splash of Hot Sauce'), new NamedItem('A mound of Nutritional Yeast')]
                    }
                ],
                directions: [
                    {
                        title: 'Burger',
                        item: [new NamedItem('BBQ them'), new NamedItem('Stop BBQing before burned')]
                    },
                    {
                        title: 'Buns',
                        item: [new NamedItem('Mix dry ingredients, then mix wet ingredients'), new NamedItem('Bake at 350 degrees till finished')]
                    },
                    {
                        title: 'Sauce',
                        item: [new NamedItem('Mix together till combined')]
                    }
                ],
                keyword: 'Burger',
                tags: ['Beyond Burger', 'Vegan', 'Lunch', 'Supper']
            }, {
                name: "Chocolate Chip Mint Ice cream",
                description: "A tasty treat that melts in your mouth, in your hand, and even on the pavement if you drop it.",
                imagePath: "https://www.seriouseats.com/images/2015/02/20150223-vegan-ice-cream-vicky-wasik-3.jpg",
                url: "https://lovingitvegan.com/vegan-mint-chocolate-chip-ice-cream/",
                ingredients: [
                    {
                        title: 'Ice Cream',
                        item: [new NamedItem('One Cup Chopped Mint'), new NamedItem('Two cups full fat coconut milk'), new NamedItem('One cup Chocolate')]
                    },
                ],
                directions: [
                    {
                        title: 'Ice Cream',
                        item: [new NamedItem('No idea'), new NamedItem('If you know tell me')]
                    },
                ],
                keyword: 'Ice Cream',
                tags: ['Ice Cream', 'Mint', 'Chocolate', 'Food of the Gods', 'Vegan', 'Dessert']
            }, {
                name: "Crusty Bread",
                description: "Wonderfully crunchy on the outside, warm and fragrant on the inside.",
                imagePath: "https://meeshiesmom.files.wordpress.com/2012/07/crusty-bread-iii.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Bread',
                        item: [new NamedItem('Flour'), new NamedItem('Water'), new NamedItem('Yeast'), new NamedItem('Oil')]
                    },
                ],
                directions: [
                    {
                        title: 'Bread',
                        item: [new NamedItem('Mix the dry'), new NamedItem('Mix the wet'), new NamedItem('Combine and let rise'), new NamedItem('Oil dutch oven'), new NamedItem('Bake at 350 degrees in a dutch oven till done')]
                    },
                ],
                keyword: 'Bread',
                tags: ['Crusty Bread', 'Fragrant']
            }, {
                name: "Oyster Mushroom Bacon",
                description: "Delicious on burgers, chopped up in salad or just on their own.",
                imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Oyster Mushrooms'), new NamedItem('Oil'), new NamedItem('Liquid Smoke'), new NamedItem('Maple Syrup')]
                    },
                ],
                directions: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Slice thin'), new NamedItem('bake at 350 for 50 minutes, flip once'), new NamedItem('Then coat in sauce.')]
                    },
                ],
                keyword: 'Facon Bacon',
                tags: ['Bacon', 'Vegan', 'topping', 'Supper', 'Oyster Mushroom']
            }, {
                name: "Panorama Test",
                description: "Testing image behaviour if image is horizontal",
                imagePath: "https://www.elegantphotoart.com/wp-content/gallery/panoramas/GN8_6820-23LN.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Oyster Mushrooms'), new NamedItem('Oil'), new NamedItem('Liquid Smoke'), new NamedItem('Maple Syrup')]
                    },
                ],
                directions: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Slice thin'), new NamedItem('bake at 350 for 50 minutes, flip once'), new NamedItem('Then coat in sauce.')]
                    },
                ],
                keyword: 'Test',
                tags: ['Test', 'Panorama', 'Horizontal']
            }, {
                name: "Vertically Long Test",
                description: "Testing image behaviour if image is vertical",
                imagePath: "https://cdn.photographylife.com/wp-content/uploads/2016/01/Zabriskie-Point-Panorama-400-MP.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Oyster Mushrooms'), new NamedItem('Oil'), new NamedItem('Liquid Smoke'), new NamedItem('Maple Syrup')]
                    },
                ],
                directions: [
                    {
                        title: 'Mushrooms',
                        item: [new NamedItem('Slice thin'), new NamedItem('bake at 350 for 50 minutes, flip once'), new NamedItem('Then coat in sauce.')]
                    },
                ],
                keyword: 'Test',
                tags: ['Test', 'Vertical']
            }, {
                name: "Black Bean & Mushroom 'meatballs'",
                description: "Testing image behaviour if image is vertical",
                imagePath: "/assets/image4.jpg",
                url: 'n/a',
                ingredients: [
                    {
                        title: 'Meatballs',
                        item: [new NamedItem('One Can Black beans'), new NamedItem('One diced Onion'), new NamedItem('Two Cups Crimini Mushrooms'), new NamedItem('One cup blended oat flour'), new NamedItem('One tbsp Montreal Steak Spice'), new NamedItem('Four cloves minced Garlic'), new NamedItem('Two tsp oregano'), new NamedItem('Two tsp Basil'), new NamedItem('One tbsp soy sauce'), new NamedItem('Oil for Frying')]
                    },
                ],
                directions: [
                    {
                        title: 'Meatballs',
                        item: [new NamedItem('drain, rinse and dry beans'), new NamedItem('dice mushrooms, saute till water is gone'), new NamedItem('dice onion and add remaining ingreidents'), new NamedItem('pulse till combined.'), new NamedItem('roll and shallow fry or bake (will be drier) till all balls are browned')]
                    },
                ],
                keyword: 'Meatballs',
                tags: ['black bean', 'Mushroom', 'Meat Balls', 'Supper']
            }, {
                name: "Instant Pot Timings For Beans",
                description: "Saved timings so I can remember later.",
                imagePath: "/assets/image4.jpg",
                url: 'n/a',
                ingredients: [
                ],
                directions: [
                    {
                        title: 'Timing',
                        item: [new NamedItem('Soaked Kidney Beans - 20 mins')]
                    },
                ],
                keyword: 'Instant Pot',
                tags: ['Instant Pot', 'Timings', 'Beans']
            }]
            return {
                ...state,
                recipes: testRecipes
            }
        default:
            return state;
    }
}