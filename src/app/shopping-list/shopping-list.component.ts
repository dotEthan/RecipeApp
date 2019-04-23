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
  viewableListsIndexArray: number[];
  defaultListIndex: number;
  shoppingListLength: number;


  constructor(private store: Store<fromShoppingList.FeatureState>,
    private shoppingListService: ShoppingListService) { }

  ngOnInit() {

    this.shoppingListState = this.store.pipe(select('shoppingLists'));

    this.store.select('shoppingLists').subscribe(state => {
      this.defaultListIndex = state.defaultListIndex;
      this.shoppingListLength = state.shoppingLists.length;
    });

    this.shoppingListService.viewableListsIndexArray.subscribe((indexArray) => {
      this.viewableListsIndexArray = indexArray;
    });

  }

  onAddNewList() {
    this.store.dispatch(new ShoppingListActions.CreateList());
    const newViewableList = [...this.viewableListsIndexArray];
    if (newViewableList.length < 3) newViewableList.push(this.shoppingListLength - 1);
    this.shoppingListService.viewableListsIndexArray.next(newViewableList);
  }
}
