import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRecipe from '../store/recipes.reducer';
import { RecipesService } from '../recipes.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  recipeId: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>,
    private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipeState = this.store.pipe(select('recipes'));

    this.recipesService.recipeId.subscribe((id: number) => {
      console.log(id);
      this.recipeId = id;
    })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
