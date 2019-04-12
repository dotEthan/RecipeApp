import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// import { NamedItem } from '../shared/namedItem.model';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import { ShoppingListService } from './shopping-list.service';
// import * as fromApp from '../../app/store/app-reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.FeatureState>;
  defaultListIndex: number;

  constructor(private store: Store<fromShoppingList.FeatureState>,
    private ShoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListState = this.store.pipe(select('shoppingLists'));

    this.store.select('shoppingLists').subscribe(state => {
      this.defaultListIndex = state.defaultListIndex;
    });
    // this.ShoppingListService.defaultListId.subscribe(index => {
    //   this.defaultListIndex = index;
    // })
  }

  onAddNewList() {
    this.store.dispatch(new ShoppingListActions.CreateList());
  }
}
