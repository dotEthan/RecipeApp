
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    recipeId = new BehaviorSubject(-1);
}