import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromAuth from '../auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../auth-modal/auth.service';
import { ShoppingList } from 'src/app/shopping-list/shoping-list.model';
import { NamedItem } from '../../shared/namedItem.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  testMode: boolean;
  loggedIn: boolean;
  testRecipes: Recipe[];
  testShoppingLists: {}[]

  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {

    this.testRecipes = [{
      name: "Double Decker Beyond Burger",
      description: "Modern Miracle",
      imagePath: "/assets/image1.jpg",
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
      imagePath: "/assets/image2.jpg",
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
      imagePath: "/assets/image3.jpg",
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
      imagePath: "/assets/image4.jpg",
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
      imagePath: "/assets/image5.jpg",
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
      imagePath: "/assets/image6.jpg",
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
      imagePath: "/assets/image7.jpg",
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
      imagePath: "/assets/image8.jpg",
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
    }];
    this.testShoppingLists = [{ title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: true }, { title: 'Camping', ingredients: [new NamedItem('Tent'), new NamedItem('Soda'), new NamedItem('Burgers'), new NamedItem('Buns'), new NamedItem('Marshmallows')], default: false }, { title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: false }, { title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: false }, { title: 'Default', ingredients: [new NamedItem('apples'), new NamedItem('papayas')], default: false }]

    this.authService.loggedIn.subscribe(isloggedIn => {
      this.loggedIn = isloggedIn;
    });
    this.authService.testMode.subscribe(resp => this.testMode = resp);
  }

  toggleTestMode() {

    if (!this.testMode) {
      window.localStorage.setItem('testMode', 'true');
      this.authService.testMode.next(true);
      this.store.dispatch(new RecipeActions.SetRecipes(this.testRecipes));
      this.store.dispatch(new ShoppingListActions.SetShoppingLists(this.testShoppingLists));
      this.shoppingListService.viewableListsIndexArray.next([0, 1, 2]);
    } else {
      window.localStorage.removeItem('testMode');
      this.authService.testMode.next(false);
      this.store.dispatch(new AuthActions.Logout());
      this.shoppingListService.viewableListsIndexArray.next([]);
    }
  }
}
