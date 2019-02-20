import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'recipes', component: RecipesComponent, data: { state: 'Recipes', animation: 'RecipePage' } },
    { path: 'shopping-list', component: ShoppingListComponent, data: { state: 'ShoppingList', animation: 'ShoppingListPage' } }
    // { path: '**', component: NotFound } // otherwise
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
