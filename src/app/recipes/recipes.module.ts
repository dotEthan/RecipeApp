import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RecipesComponent } from './recipes.component';
import { ItemListComponent } from './recipe-detail/item-list/item-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { recipeReducer } from './store/recipes.reducer';
import { RecipeEffects } from './store/recipes.effects';
import { EditIngredientListComponent } from './recipe-edit/edit-ingredient-list/edit-ingredient-list.component';
import { CloseWindowDirective } from './recipe-detail/close-window.directive';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    AddRecipeComponent,
    ItemListComponent,
    EditIngredientListComponent,
    CloseWindowDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects])
  ]
})
export class RecipesModule { }
