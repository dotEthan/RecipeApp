import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../core/auth-modal/auth-guard.service';

const recipesRoutes: Routes = [
    {
        path: '', component: RecipesComponent, children: [
            { path: '', component: AddRecipeComponent },
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class RecipesRoutingModule {

}