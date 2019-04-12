import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NamedItem } from 'src/app/shared/namedItem.model';
import * as fromRecipe from '../../store/recipes.reducer';
import * as ShoppingListActions from '../../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
    @Input() itemsObject: { string: NamedItem[] };
    @Input() itemType: string;
    itemTitle: string;
    items: NamedItem[];

    constructor(private store: Store<fromRecipe.FeatureState>) { }

    ngOnInit() {
        this.itemTitle = this.itemsObject['title'];
        this.items = this.itemsObject['item'];
        console.log(this.itemType);
    }

    onAddIngredientToList(ingredient: NamedItem) {
        // console.log(ingredient);
        this.store.dispatch(new ShoppingListActions.AddIngredient({ item: ingredient, listIndex: -1 }));
    }


}
