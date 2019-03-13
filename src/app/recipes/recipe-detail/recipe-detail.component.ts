import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { RecipesService } from '../recipes.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {
  // Getting Error about Ingredients on reload only. Fix. 

  recipeState: Observable<fromRecipe.State>;
  id: number;
  recipeStateArray: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>,
    private recipeService: RecipesService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log('params', params);
          this.id = +params['id'];
          console.log(this.id);
        }
      );
    this.recipeState = this.store.select('recipes');
    this.recipeStateArray = Object.entries(this.recipeState);
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
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
