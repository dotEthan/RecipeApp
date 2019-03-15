import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as fromAuth from '../auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  toggleTestMode() {
    const testModeRecipes: Recipe[] = [{
      description: "Modern Miracle",
      imagePath: "https://www.seriouseats.com/images/2016/10/20161004-beyond-burger-18.jpg",
      ingredients: [{ amount: 1, name: 'Bun' }, { amount: 2, name: 'Burgers' }],
      name: "Double Decker Beyond Burger",
      directions: 'BBQ them and then put them in between the buns. Or however you like.'
    }, {
      description: "A tasty treat",
      ingredients: [{ amount: 3, name: 'Mint' }, { amount: 1, name: 'Coconut Milk' }, { amount: 2, name: 'Chocolate' }],
      imagePath: "https://www.seriouseats.com/images/2015/02/20150223-vegan-ice-cream-vicky-wasik-3.jpg",
      name: "Chocolate Chip Mint Ice cream",
      directions: 'I wish I knew, I\'d never eat anything else.'
    }, {
      description: "Crunchy, chewy, delicious bread!",
      ingredients: [{ amount: 2, name: 'Flour' }, { amount: 1, name: 'water' }, { amount: 1, name: 'yeast' }],
      imagePath: "https://meeshiesmom.files.wordpress.com/2012/07/crusty-bread-iii.jpg",
      name: "Crusty Bread",
      directions: 'Mix together, let it rise and then bake it in a dutch oven.'
    }, {
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      ingredients: [{ amount: 6, name: 'Oyster Mushroom' }, { amount: 4, name: 'Seasoning' }],
      imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
      name: "Oyster Mushroom Bacon",
      directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.'
    }, {
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      ingredients: [{ amount: 6, name: 'Oyster Mushroom' }, { amount: 4, name: 'Seasoning' }],
      imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
      name: "Oyster Mushroom Bacon",
      directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.'
    }, {
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      ingredients: [{ amount: 6, name: 'Oyster Mushroom' }, { amount: 4, name: 'Seasoning' }],
      imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
      name: "Oyster Mushroom Bacon",
      directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.'
    }, {
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      ingredients: [{ amount: 6, name: 'Oyster Mushroom' }, { amount: 4, name: 'Seasoning' }],
      imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
      name: "Oyster Mushroom Bacon",
      directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.'
    }, {
      description: "Delicious on burgers, chopped up in salad or just on their own.",
      ingredients: [{ amount: 6, name: 'Oyster Mushroom' }, { amount: 4, name: 'Seasoning' }],
      imagePath: "https://www.seriouseats.com/recipes/assets_c/2015/02/20150204-mushroom-bacon-update-king-oyster-3-thumb-1500xauto-418829.jpg",
      name: "Oyster Mushroom Bacon",
      directions: 'Slice thin, bake at 350 for 50 minutes, flipping once. Then coat in sauce.'
    }];

    this.store.dispatch(new AuthActions.toggleTestMode());
    this.store.dispatch(new RecipeActions.SetRecipes(testModeRecipes));
  }
}
