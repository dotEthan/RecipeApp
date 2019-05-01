import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// import { NamedItem } from '../shared/namedItem.model';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import { ShoppingListService } from './shopping-list.service';
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
    private shoppingListService: ShoppingListService,
    private windowResizeService: WindowResizeService) { }

  ngOnInit() {

    this.shoppingListState$ = this.store.pipe(select('shoppingLists'));

    this.store.select('shoppingLists').subscribe(state => {
      this.defaultListIndex = state.defaultListIndex;
      this.shoppingListLength = state.shoppingLists.length;
    });

    this.windowResizeService.windowWidth.subscribe((width) => {
      this.windowWidth = width;
      this.resizeCheck(width);
    });

    this.resizeCheck(this.windowWidth);
    // this.shoppingListService.viewableListsIndexArray.subscribe((indexArray) => {
    //   if (this.windowWidth < 768) {
    //     console.log('oninit', this.defaultListIndex);
    //     this.viewableListsIndexArray = [this.defaultListIndex];
    //   } else {
    //     console.log('oninit else', this.defaultListIndex);
    //     this.viewableListsIndexArray = indexArray;
    //   }
    // });
    console.log('widnow width: ', this.viewableListsIndexArray);
  }

  resizeCheck(number) {
    this.shoppingListService.viewableListsIndexArray.subscribe((indexArray) => {
      if (number < 768) {
        console.log('oninit', this.defaultListIndex);
        this.viewableListsIndexArray = [this.defaultListIndex];
      } else {
        console.log('oninit else', this.defaultListIndex);
        this.viewableListsIndexArray = indexArray;
      }
    });
  }

  onAddNewList() {
    this.store.dispatch(new ShoppingListActions.CreateList());
    let newViewableList = [];

    if (this.windowWidth < 768) {
      console.log('now');
      newViewableList.push(this.shoppingListLength - 1);
      this.shoppingListService.viewableListsIndexArray.next(newViewableList);
    } else if (this.viewableListsIndexArray.length < 4) {
      newViewableList = [...this.viewableListsIndexArray];
      newViewableList.push(this.shoppingListLength - 1);
      this.shoppingListService.viewableListsIndexArray.next(newViewableList);
    }
  }
}
