import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';
import { NamedItem } from 'src/app/shared/namedItem.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );

    this.recipeState = this.store.select('recipes');
    // console.log('recipe detail ingredients: ', this.recipeState);
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        console.log('adding to list: ', recipeState.recipes[this.id].ingredients);
        for (let ingredientType of recipeState.recipes[this.id].ingredients) {
          this.store.dispatch(new ShoppingListActions.AddIngredients(ingredientType['item']));
        }
      });
  }

  onEditRecipe() {
    // console.log('now');
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

  onClose() {
    this.router.navigate(['/recipes']);
  }
}
