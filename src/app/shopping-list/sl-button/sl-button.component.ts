import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';
// import { ShoppingListService } from '../shopping-list.service';

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
    this.shoppingListService.viewableListsIndexArray.subscribe((listIndexArray) => {
      this.viewableList = listIndexArray;
      (this.viewableList.includes(this.listIndex)) ? this.isDisabled = true : this.isDisabled = false;
    });

  }

  onSlButtonClick() {
    const updatedViewableList = [...this.viewableList];

    if (this.viewableList.length > 3) {
      updatedViewableList.pop();
      updatedViewableList.push(this.listIndex);
    } else {
      updatedViewableList.push(this.listIndex);
    }

    this.shoppingListService.viewableListsIndexArray.next(updatedViewableList);
  }

}
