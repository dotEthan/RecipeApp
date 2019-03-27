import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  titleArray = [];
  ingredientFormArray;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        }
      );
    this.initForm();
    this.ingredientFormArray = (<FormArray>this.recipeForm.get('ingredients')).controls;
    console.log('initform first: ', (<FormArray>this.recipeForm.get('ingredients')).controls);

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

  getControls(i: number) {
    console.log('get controls index: ', i);
    // console.log('get controls: ', (<FormArray>this.recipeForm.get('ingredients')).controls[i]);
    return (<FormArray>this.recipeForm.get('ingredients')).controls[i].value;
  }

  onAddIngredient(i) {
    const ingredientArrayObj = (<FormArray>this.recipeForm.get('ingredients')).controls[i]
    console.log('adding', ingredientArrayObj);
    ingredientArrayObj.push(new FormGroup({ 'name': new FormControl('', Validators.required) }));
    // this.initForm();
    // console.log('adding after: ', this.recipeForm.get('ingredients'));
    // this.getControls(i);
  }

  onAddIngredientType() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormArray([new FormGroup({ 'name': new FormControl(null, Validators.required) })])
    );
    this.titleArray.push('');
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
    let ingredientsArray = [];

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
            console.log('init form: ', recipe['ingredients'])
            let x = 0;
            for (ingredientsArray of recipe.ingredients) {
              let tempIngredientArray = new FormArray([]);
              for (let i = 0; i < ingredientsArray.length; i++) {
                if (i === 0) {
                  this.titleArray.push(ingredientsArray[i]);
                  x = x + 1;
                } else {
                  for (let ingredient of ingredientsArray[i]) {
                    tempIngredientArray.push(
                      new FormGroup({
                        'name': new FormControl(ingredient.name, Validators.required),
                      })
                    );
                  }

                }
              }
              // console.log('init form after: ', recipeIngredients)
              recipeIngredients.push(tempIngredientArray);
            }
          }
        });
    }
    console.log("after all: ", recipeIngredients);
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'directions': new FormControl(recipeDirections, Validators.required)
    })
  }

}
