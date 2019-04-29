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
      name: "Chipotle Chickpea Burger",
      description: "A tasty Chickpea Burger",
      imagePath: "/assets/image1.jpg",
      url: 'n/a',
      ingredients: [
        {
          title: 'Burger',
          item: [new NamedItem('1 cup Rolled Oats'),
          new NamedItem('2 tbsp Flaxseed'),
          new NamedItem('1 tsp Onion Powder'),
          new NamedItem('2 tsp Chipotle Powder'),
          new NamedItem('1 tsp Salt'),
          new NamedItem('1 tsp Pepper'),
          new NamedItem('1 cup Bread Crumbs'),
          new NamedItem('1 can Chickpeas (19oz)'),
          new NamedItem('4 cloves Minced Garlic'),
          new NamedItem('1/4 Cup Aquafaba')]
        }, {
          title: 'Toppings',
          item: [new NamedItem('Burger Buns'),
          new NamedItem('Sliced Tomato'),
          new NamedItem('Sliced Onion'),
          new NamedItem('Sliced Pickles'),
          new NamedItem('Guacamole')]
        }
      ],
      directions: [
        {
          title: 'Burger',
          item: [new NamedItem('Make a flaxseed egg by mixing the flaxseed and water in a cup then setting aside.'),
          new NamedItem('Add the gluten-free oats to a food processor then process until oat flour.'),
          new NamedItem('Add the chickpeas, minced garlic, onion powder, chipotle powder, salt, pepper, aquafaba and flaxseed egg to the processor.'),
          new NamedItem('Process until well combined and a dough like texture forms.'),
          new NamedItem('Spread out bread crumbs on a plate then make a burger form, cover in bread crumbs then place on a baking sheet lined with parchment paper.'),
          new NamedItem('Bake at 375F for 30 mins flipping halfway.')]
        }
      ],
      keyword: 'Burger',
      tags: ['Beyond Burger', 'Vegan', 'Lunch', 'Supper']
    }, {
      name: "Chocolate Chip Mint Ice cream",
      description: "Delicious and Dairy Free Ice Cream! *Requires Ice Cream Maker*",
      imagePath: "/assets/image2.jpg",
      url: "https://minimalistbaker.com/creamy-vegan-mint-brownie-ice-cream/",
      ingredients: [
        {
          title: 'Ice Cream',
          item: [new NamedItem('1/2 cup Fresh Mint'),
          new NamedItem('1 1/2 cups Raw Cashews (soaked 8hr)'),
          new NamedItem('1 can Full Fat Coconut Milk (14oz)'),
          new NamedItem('1/2 - 3/4 tsp Peppermint Extract'),
          new NamedItem('1/4 cup Cane Sugar'),
          new NamedItem('1/4 cup Agave Nectar or Maple Syrup'),
          new NamedItem('3 tbsp Coconut Oil (melted)'),
          new NamedItem('1 tsp Vanilla Extract')]
        }, {
          title: 'Raw Brownie',
          item: [new NamedItem('1 cup Packed Dates (pitted and soaked)'),
          new NamedItem('1 1/4 cups Raw Walnuts/Almonds)'),
          new NamedItem('1/3 cup Cacao or Cocao Powder')]
        },
      ],
      directions: [
        {
          title: 'Ice Cream',
          item: [new NamedItem('Set your churning bowl in the freezer the night before to chill. Soak your cashews the night before as well, or for at least 4-6 hours before blending.'),
          new NamedItem('OPTIONAL STEP: When ready to prepare ice cream, steep HALF of your fresh mint leaves in the coconut milk. '),
          new NamedItem('Bring the coconut milk to a simmer in a small saucepan and add the mint leaves, then turn to low. Use a wooden spoon or muddler to puncture the mint so it infuses the coconut milk. Keep on low for 15 minutes, then kill heat and let cool. Once cooled, strain out the mint leaves using a fine mesh strainer and pour the coconut milk right into a blender'),
          new NamedItem('Add remaining ingredients, including DRAINED cashews and remaining fresh mint (vanilla extract is optional) and blend until creamy and smooth - about 3-4 minutes, using the "liquify option" if you have it. Taste and adjust sweetness/minty-ness as needed.'),
          new NamedItem('Add mixture to your chilled ice cream maker bowl and churn according to manufacturer’s instructions until thoroughly chilled, about 45 minutes. It should resemble thick soft serve.'),
          new NamedItem('While churning, prepare your raw brownie by processing dates in the food processor until small bits remain - it will likely form into a ball. Remove and set aside.'),
          new NamedItem('Add nuts and process until small bits remain, then add back in dates and cocoa or cacao powder and process until well combined.'),
          new NamedItem('Transfer to a piece of plastic wrap or parchment paper and use hands to form into a "brick" shape. Set in freezer to chill.'),
          new NamedItem('Once ice cream is done churning, break off chunks of your brownie and stir into the ice cream. I used about 3/4 of my brownie.'),
          new NamedItem('Transfer ice cream to a freezer-safe container, cover with plastic wrap and freeze until hard - at least 6 hours, preferably overnight. Will keep in the freezer for up to one week, though best when fresh.'),
          new NamedItem('Before serving, let thaw on the counter for 10-15 minutes to soften.')]
        },
      ],
      keyword: 'Ice Cream',
      tags: ['Ice Cream', 'Mint', 'Chocolate', 'Food of the Gods', 'Vegan', 'Dessert']
    }, {
      name: "Crusty Bread",
      description: "Wonderfully crunchy on the outside, warm and fragrant on the inside.",
      imagePath: "/assets/image3.jpg",
      url: 'http://www.alaskafromscratch.com/2012/07/27/dutch-oven-crusty-bread/',
      ingredients: [
        {
          title: 'Bread',
          item: [new NamedItem('3 cups Unbleached All-Purpose Flour'),
          new NamedItem('1 tsp Yeast'),
          new NamedItem('1 tsp Salt'),
          new NamedItem('1 1/2 cup Warm Water')]
        },
      ],
      directions: [
        {
          title: 'Bread',
          item: [new NamedItem('In a large mixing bowl, whisk together flour, salt and yeast. Add water and stir until a shaggy mixture forms'),
          new NamedItem('Cover bowl with plastic wrap and set aside for 12 - 18 hours (up to 24). Overnight works great.'),
          new NamedItem('Preheat oven to 450. Place a cast iron dutch oven with a lid in the oven and heat the pot for 30 minutes.'),
          new NamedItem('Pour the risen dough onto a heavily floured surface (mixture will be sticky) and lightly shape into a round loaf.'),
          new NamedItem('Remove hot pot from the oven and carefully set in the dough. Cover and return to oven for 30 minutes. '),
          new NamedItem('Remove the lid and bake an additional 10-15 minutes. Carefully remove bread from oven and from pot and place on a cooling rack.')]
        },
      ],
      keyword: 'Bread',
      tags: ['Crusty Bread', 'Fragrant']
    }, {
      name: "Oyster Mushroom Bacon",
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      imagePath: "/assets/image4.jpg",
      url: 'https://www.seriouseats.com/recipes/2014/02/crispy-smoked-mushroom-bacon-bits-vegan-recipe.html',
      ingredients: [
        {
          title: 'Mushrooms',
          item: [new NamedItem('8 Oz Oyster Mushrooms cut lengthwise (1/8th inch)'),
          new NamedItem('3 tbsp Vegetable Oil'),
          new NamedItem('Fresh group Pepper and Coarse Salt'),
          new NamedItem('2 tsp Maple Syrup'),
          new NamedItem('1/8 tsp Garlic Powder'),
          new NamedItem('1/8 tsp Paprika'),
          new NamedItem('1 drop liquid Smoke (if not using real smoke)')]
        },
      ],
      directions: [
        {
          title: 'Mushrooms',
          item: [new NamedItem('Preheat Oven to 350°F'),
          new NamedItem('Lay mushroom slices flat on a lined baking tray. Brush both sides with oil and season with salt and pepper'),
          new NamedItem('Cook for 50 minutes, flipping them one half way. Watch them as cooking times differ by oven type. They quickly go from chewy to burnt.'),
          new NamedItem('Remove from oven and allow to cool on paper towels'),
          new NamedItem('Transfer to a bowl and toss with the rest of the ingredients, if smoking naturally, leave out liquid smoke and smoke them after tossing.')]
        },
      ],
      keyword: 'Facon Bacon',
      tags: ['Bacon', 'Vegan', 'topping', 'Supper', 'Oyster Mushroom']
    }, {
      name: "Homemade Chipotle Sofritas",
      description: "All the flavour and taste of Chipotle, at home!",
      imagePath: "/assets/image5.jpg",
      url: 'https://yupitsvegan.com/copycat-chipotle-sofritas/',
      ingredients: [
        {
          title: 'Main',
          item: [new NamedItem('16 oz Extra-firm Tofu'),
          new NamedItem('2 tbsp High Heat Oil (Grapeseed)')]
        }, {
          title: 'Spice Blend',
          item: [new NamedItem('1 1/4 tsp Cumin seeds'),
          new NamedItem('1 tsp Coriander Seeds'),
          new NamedItem('1/4 tsp Black Peppercorns'),
          new NamedItem('1/2 tbsp Dried Oregano'),
          new NamedItem('1 tsp Coconut Sugar')]
        }, {
          title: 'Spicy Adobo Sauce',
          item: [new NamedItem('1 Medium Poblano Pepper'),
          new NamedItem('2 tbsp Chopped Chipotle Peppers in Adobo Sauce'),
          new NamedItem('2 tbsp additional Adobo Sauce'),
          new NamedItem('1/2 cup low-sodium Broth'),
          new NamedItem('1/2 White or Yellow Onion'),
          new NamedItem('3 cloves Garlic'),
          new NamedItem('1 1/2 tbsp Tomato Paste'),
          new NamedItem('2 tbsp Soy Sauce'),
          new NamedItem('1 tbsp Cider Vinegar'),
          new NamedItem('1 tsp Nutritional Yeast'),
          new NamedItem('1/4 tsp Sale')]
        },
      ],
      directions: [
        {
          title: 'Tofu',
          item: [new NamedItem('Press the tofu using a heavy object & towels, or your tofu press, for at least 5 minutes to remove any excess moisture. Slice the tofu into about 8 slices.'),
          new NamedItem('In a skillet, add 1 tb. or so of grapeseed oil over medium-high heat, until shimmering. Add as many slices of tofu as you can fit without crowding.'),
          new NamedItem('Cook the tofu for 2-3 minutes on each side, or until evenly browned all the way around the outside. Remove from the heat and repeat with remaining slices of tofu. Set aside.'),
          new NamedItem('Once the tofu has cooled, chop it into very small pieces, or to the size desired.')]
        }, {
          title: 'Spice Blend',
          item: [new NamedItem('In a dry skillet over medium heat, toast the cumin seeds, coriander seeds, and peppercorns just until they start to smell fragrant.'),
          new NamedItem('Add them to a spice grinder or mortar & pestle, along with the oregano and sugar. Grind into a fine powder.')]
        }, {
          title: 'Char Poblano Pepper',
          item: [new NamedItem('Using Low Flame, use metal tongs to hold the pepper and rotate it until all sides are charred. It should look like it has collapsed on itself.'),
          new NamedItem('In the oven: Preheat oven to 350°F, place pepper on baking tray and bake until starting to brown and collapsed.'),
          new NamedItem('Remove the skin, stem and seeds.')]
        }, {
          title: 'Combine',
          item: [new NamedItem('In a blender or food processor, combine the poblano pepper, chipotle peppers, adobo sauce, about half of the water or broth, onion, garlic, tomato paste, soy sauce, vinegar, and optional nutritional yeast. Process until completely smooth.'),
          new NamedItem('Add the sauce to a large skillet or saucepan along with the chopped, fried tofu. Bring to a gentle boil and then reduce the heat to medium.'),
          new NamedItem('Add the rest of the water/broth, the salt, and about half of the prepared spice blend. Cover the pan, and cook for 5-7 minutes.'),
          new NamedItem('Adjust seasoning levels. Stir, cover again, and cook until most of the liquid is absorbed and the raw onion and garlic taste is gone.'),
          new NamedItem('Enjoy in a burrito bowl, or anywhere else with Mexican-inspired flavors!')]
        },
      ],
      keyword: 'Sofritas',
      tags: ['Sofritas', 'Chipotle', 'Vegan', 'Tofu']
    }, {
      name: "Barbecued Seitan Ribz (Vegan Ribs)",
      description: "Chewy, full of flavour and perfect for a BBQ.",
      imagePath: "/assets/image6.jpg",
      url: 'https://blog.fatfreevegan.com/2007/05/barbecued-seitan-ribz.html',
      ingredients: [
        {
          title: 'Soup',
          item: [new NamedItem('1 cup Vital Wheat Gluten'),
          new NamedItem('2 tbsp Nutritional Yeast'),
          new NamedItem('2 tsp Smoked Spanish Paprika'),
          new NamedItem('2 tsp Onion Powder'),
          new NamedItem('1 tsp Garlic Powder'),
          new NamedItem('3/4 cup Water'),
          new NamedItem('2 tbsp tahini or other nut butter'),
          new NamedItem('1 tbsp Soy Sauce'),
          new NamedItem('1 tsp Liquid Smoke'),
          new NamedItem('1 cup (approx.) BBQ Sauce')]
        },
      ],
      directions: [
        {
          title: 'Vegan Ribs',
          item: [new NamedItem('Preheat the oven to 350 and lightly spray an 8×8 baking dish with vegetable oil.'),
          new NamedItem('Mix the first 5 ingredients together in a large bowl.'),
          new NamedItem('Mix the water with the nut butter, Liquid Smoke, and soy sauce and add it to the dry ingredients.'),
          new NamedItem('Stir to mix well and then knead lightly in the bowl 15-60 seconds (the less you knead it, the more tender it is; the longer, the chewier).'),
          new NamedItem('Put the dough into the baking dish and flatten it so that it evenly fills the pan. Take a sharp knife and cut it into 8 strips; then turn the pan and cut those strips in half to form 16 pieces:'),
          new NamedItem('Put it in the oven and bake for 25 minutes. While it’s cooking prepare your grill.'),
          new NamedItem('Remove it from the oven and carefully re-cut each strip. Put ribs on the grill and Brush the top of the seitan with more sauce'),
          new NamedItem('Once Browned, flip and do the same to the other side. Once done, remove from grill and pull apart to eat.')]
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
          item: [new NamedItem('One Can Black beans'),
          new NamedItem('One diced Onion'),
          new NamedItem('Two Cups Crimini Mushrooms'),
          new NamedItem('One cup blended oat flour'),
          new NamedItem('One tbsp Montreal Steak Spice'),
          new NamedItem('Four cloves minced Garlic'),
          new NamedItem('Two tsp oregano'),
          new NamedItem('Two tsp Basil'),
          new NamedItem('One tbsp soy sauce'),
          new NamedItem('Oil for Frying')]
        },
      ],
      directions: [
        {
          title: 'Meatballs',
          item: [new NamedItem('drain, rinse and dry beans'),
          new NamedItem('dice mushrooms, saute till water is gone'),
          new NamedItem('dice onion and add remaining ingreidents'),
          new NamedItem('pulse till combined.'),
          new NamedItem('roll and shallow fry or bake (will be drier) till all balls are browned')]
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
    this.testShoppingLists = [
      {
        title: 'Supper',
        ingredients: [new NamedItem('Potatoes'), new NamedItem('Four pounds of Carrots'), new NamedItem('A gallon of Oat Milk')],
        default: true
      },
      {
        title: 'Camping',
        ingredients: [new NamedItem('Tent'), new NamedItem('Soda'), new NamedItem('Burgers'), new NamedItem('Buns'), new NamedItem('Marshmallows')],
        default: false
      },
      {
        title: 'Friday\'s Party',
        ingredients: [new NamedItem('Balloons'), new NamedItem('Cake'), new NamedItem('Friends')],
        default: false
      },
      {
        title: 'Vegas!',
        ingredients: [new NamedItem('Cash'), new NamedItem('Uppers'), new NamedItem('Downers'), new NamedItem('Nipple Tassles')],
        default: false
      },
      {
        title: 'Random',
        ingredients: [new NamedItem('Tape'), new NamedItem('Three screws'), new NamedItem('An Unripe Mango')],
        default: false
      }]

    this.authService.loggedIn.subscribe(isloggedIn => this.loggedIn = isloggedIn);
    this.authService.testMode.subscribe(resp => this.testMode = resp);
  }

  toggleTestMode() {
    if (!this.testMode) {
      window.localStorage.setItem('testMode', 'true');
      this.authService.testMode.next(true);
      this.store.dispatch(new AuthActions.TrySignin({ username: 'test@test.com', password: 'password' }));
      this.shoppingListService.viewableListsIndexArray.next([0, 1, 2]);
    } else {
      // Kept for easy backing up, 
      // this.store.dispatch(new RecipeActions.StoreRecipes());
      // this.store.dispatch(new ShoppingListActions.StoreShoppingLists()); 
      window.localStorage.removeItem('testMode');
      this.authService.testMode.next(false);
      this.store.dispatch(new AuthActions.Logout());
      this.shoppingListService.viewableListsIndexArray.next([]);
    }
  }
}
