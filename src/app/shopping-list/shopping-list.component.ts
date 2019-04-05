import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { NamedItem } from '../shared/namedItem.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as fromApp from '../../app/store/app-reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.FeatureState>;

  constructor(private store: Store<fromShoppingList.FeatureState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.pipe(select('shoppingLists'));
    console.log(this.shoppingListState)
  }

  onEditItem(i: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(i));
  }

}
