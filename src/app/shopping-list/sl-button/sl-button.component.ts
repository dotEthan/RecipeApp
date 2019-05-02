import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-sl-button',
  templateUrl: './sl-button.component.html',
  styleUrls: ['./sl-button.component.sass']
})
export class SlButtonComponent implements OnInit {
  @Input() shoppingListTitle: any;
  @Input() listIndex: number;
  @Input() isDefault: boolean;
  viewableList: number[];
  isDisabled: boolean;

  constructor(private store: Store<fromShoppingList.FeatureState>,
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.store.select('shoppingLists').subscribe(state => {
      this.viewableList = state.viewableListIndexes;
      console.log("buttons", this.viewableList);
      (this.viewableList.includes(this.listIndex)) ? this.isDisabled = true : this.isDisabled = false;
    });

  }

  onSlButtonClick(listIndex) {
    this.store.dispatch(new ShoppingListActions.UpdateViewableList(listIndex));
  }

}
