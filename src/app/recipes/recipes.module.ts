import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule { }
