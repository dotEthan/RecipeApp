import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../../store/shopping-list.reducers';

@Component({
  selector: 'app-ingredient-input',
  templateUrl: './ingredient-input.component.html',
  styleUrls: ['./ingredient-input.component.sass']
})
export class IngredientInputComponent implements OnInit {
  @Input() inputValue: string;
  @Output() savedIngredient = new EventEmitter<string>();
  editingIngredientIndex: number;

  constructor(private store: Store<fromShoppingList.FeatureState>) { }

  ngOnInit() {
    this.store.select('shoppingLists').subscribe(state => {
      this.editingIngredientIndex = state.editedIngredientIndex;
    });
  }

  saveIngredient(newValue: string) {
    console.log(newValue);
    this.savedIngredient.emit(newValue);
  }

}
