import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// import { NamedItem } from '../shared/namedItem.model';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
// import { ShoppingListService } from './shopping-list.service';
// import * as fromApp from '../../app/store/app-reducer';
import { WindowResizeService } from '../shared/window-resize.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState$: Observable<fromShoppingList.FeatureState>;
  viewableListsIndexArray: number[];
  defaultListIndex: number;
  shoppingListLength: number;
  windowWidth: any;


  constructor(private store: Store<fromShoppingList.FeatureState>,
    private windowResizeService: WindowResizeService) { }

  ngOnInit() {
    console.log('oninit');

    this.shoppingListState$ = this.store.pipe(select('shoppingLists'));

    this.store.select('shoppingLists').subscribe(state => {
      this.defaultListIndex = state.defaultListIndex;
      this.shoppingListLength = state.shoppingLists.length;
      this.viewableListsIndexArray = state.viewableListIndexes;
    });

    this.windowResizeService.windowWidth.subscribe((width) => {
      this.windowWidth = width;
    });

    console.log('widnow width: ', this.viewableListsIndexArray);
  }


  onAddNewList() {
    this.store.dispatch(new ShoppingListActions.CreateList());
    this.store.dispatch(new ShoppingListActions.AddViewableList());
  }
}
