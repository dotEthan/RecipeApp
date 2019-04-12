import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../../store/shopping-list.reducers';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import { NamedItem } from '../../../shared/namedItem.model';

@Component({
  selector: 'app-ingredient-input',
  templateUrl: './ingredient-input.component.html',
  styleUrls: ['./ingredient-input.component.sass']
})
export class IngredientInputComponent implements OnInit {
  @Input() inputValue: string;

  constructor(private store: Store<fromShoppingList.FeatureState>) { }

  ngOnInit() {
  }

  saveIngredient(newValue: string) {
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(new NamedItem(newValue)));
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
