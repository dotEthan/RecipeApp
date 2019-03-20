import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    console.log('recipe edit submit', this.recipeForm.value);
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({ index: this.id, updatedRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredient': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeDirections = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          recipeDirections = recipe.directions;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              console.log('edit recipe ingredient: ', ingredient);
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                })
              );
            }
          }
        });
    }
    console.log(recipeIngredients.length);
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'directions': new FormControl(recipeDirections, Validators.required)
    })
  }

}
