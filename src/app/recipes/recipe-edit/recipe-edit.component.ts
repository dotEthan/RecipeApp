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
  ingredientTypeArray;
  ingredientListArray = [];
  directionsTypeArray;
  directionListArray = [];
  directionsArray = new FormArray([]);

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
    this.ingredientTypeArray = (<FormArray>this.recipeForm.get('ingredients')).controls;
    this.directionsTypeArray = (<FormArray>this.recipeForm.get('directions')).controls;

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

  onAddItem(type: string, index) {
    const itemArrayObj = (type === 'ingredient') ?
      (<FormArray>this.recipeForm.get('ingredients')).controls[index] :
      (<FormArray>this.recipeForm.get('directions')).controls[index];
    itemArrayObj['controls'].item.push(
      new FormGroup({ name: new FormControl('', Validators.required) })
    );
    (type === 'ingredient') ?
      this.ingredientListArray[index].push(['']) :
      this.directionListArray[index].push(['']);
  }

  onAddItemType(type: string) {
    const itemTypeArray = (type === 'ingredient') ?
      (<FormArray>this.recipeForm.get('ingredients')) :
      (<FormArray>this.recipeForm.get('directions'));
    let emptyitemArray = new FormArray([]);

    emptyitemArray.push(new FormGroup({ name: new FormControl('', Validators.required) }));

    itemTypeArray.push(
      new FormGroup({ title: new FormControl('', Validators.required), item: emptyitemArray })
    );

    (type === 'ingredient') ?
      this.ingredientListArray.push(['']) :
      this.directionListArray.push(['']);
  }

  onDeleteItem(type: string, index: number, arrayIndex: number) {
    const itemArray = (type === 'ingredient') ?
      (<FormArray>this.recipeForm.get('ingredients')).controls[arrayIndex] :
      (<FormArray>this.recipeForm.get('directions')).controls[arrayIndex];

    itemArray['controls'].item.removeAt(index);

    (type === 'ingredient') ?
      this.ingredientListArray[arrayIndex].splice(index, 1) :
      this.directionListArray[arrayIndex].splice(index, 1);
  }

  onDeleteItemType(type: string, index: number) {
    const itemTypeArray = (type === 'ingredient') ?
      (<FormArray>this.recipeForm.get('ingredients')) :
      (<FormArray>this.recipeForm.get('directions'));

    itemTypeArray.removeAt(index);

    (type === 'ingredient') ?
      this.ingredientListArray.splice(index, 1) :
      this.directionListArray.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onOverlayShadowClick(e) {
    if (e.target === e.currentTarget) {
      this.router.navigate(['/recipes']);
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredientsArray = new FormArray([]);
    let ingredientArray: FormArray;
    let directionsArray = new FormArray([]);
    let directionArray: FormArray;

    if (this.editMode) {
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          let directionsGroup: FormGroup;
          let ingredientsGroup: FormGroup;
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;

          // DRY these two and put HTML into own component
          if (recipe['directions']) {
            recipe['directions'].forEach((directionType, i) => {
              directionArray = new FormArray([]);
              const dirArray = [];

              directionType['item'].forEach((dir) => {
                dirArray.push(dir.name);
                directionArray.push(new FormGroup({ name: new FormControl(dir.name, Validators.required) }));
              });

              this.directionListArray.push(dirArray);

              directionsGroup = new FormGroup({
                title: new FormControl(directionType['title']),
                item: directionArray
              })
              directionsArray.push(directionsGroup);
            });
          }

          if (recipe['ingredients']) {
            recipe['ingredients'].forEach((ingreType, i) => {
              ingredientArray = new FormArray([]);
              const ingreArray = [];

              ingreType['item'].forEach((ingre) => {
                ingreArray.push(ingre.name);
                ingredientArray.push(new FormGroup({ name: new FormControl(ingre.name, Validators.required) }));
              });

              this.ingredientListArray.push(ingreArray);

              ingredientsGroup = new FormGroup({
                title: new FormControl(ingreType['title']),
                item: ingredientArray
              })
              ingredientsArray.push(ingredientsGroup);
            })
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': ingredientsArray,
      'directions': directionsArray
    })
  }

}
