import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  imgPath: string;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.imgPath = `url(${this.recipe.imagePath})`;
  }

  itemOverlayHandler() {
    this.recipesService.recipeId.next(this.index);
  }

}
