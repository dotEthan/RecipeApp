import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { NamedItem } from '../shared/namedItem.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../app/store/app-reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: NamedItem[] }>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(i: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(i));
  }

}
