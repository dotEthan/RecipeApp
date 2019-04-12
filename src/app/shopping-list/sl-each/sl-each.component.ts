import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { NamedItem } from 'src/app/shared/namedItem.model';

@Component({
    selector: 'app-sl-each',
    templateUrl: './sl-each.component.html',
    styleUrls: ['./sl-each.component.sass']
})
export class SlEachComponent implements OnInit {
    @Input() shoppingList: any; //Proper Typing
    @Input() listIndex: number;
    defaultList: number;
    editingListIndex: number;
    editingIngredientIndex: number;

    constructor(private store: Store<fromShoppingList.FeatureState>) { }

    ngOnInit() {

        this.store.select('shoppingLists').subscribe(state => {
            this.defaultList = state.defaultListIndex;
            this.editingIngredientIndex = state.editedIngredientIndex;
            this.editingListIndex = state.editedListIndex;
        });
    }

    onMakeDefault() {
        this.store.dispatch(new ShoppingListActions.SwitchDefault(this.listIndex));
    }

    onAddItem() {
        this.store.dispatch(new ShoppingListActions.AddIngredient({ listIndex: this.listIndex, item: new NamedItem('') }));
        this.store.dispatch(new ShoppingListActions.StartEdit({ listIndex: this.listIndex, index: -1 }));
    }

    onEditItem(index: number) {
        this.store.dispatch(new ShoppingListActions.StartEdit({ listIndex: this.listIndex, index: index }));
    }

    onDeleteItem(index: number) {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient({ listIndex: this.listIndex, index: index }));
    }

    onEditList() {
        console.log("Edit it");
    }

    onDeleteList() {
        this.store.dispatch(new ShoppingListActions.DeleteList(this.listIndex));
    }
}
