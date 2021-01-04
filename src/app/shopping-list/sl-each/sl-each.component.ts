import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import * as fromShoppingList from '../store/shopping-list.reducers';
import { NamedItem } from '../../shared/namedItem.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-sl-each',
    templateUrl: './sl-each.component.html',
    styleUrls: ['./sl-each.component.sass']
})

//Proper Typing for shopping lists && refactor out the HTML && default & Edit outline (matching to list)
export class SlEachComponent implements OnInit {
    @Input() listIndex: number;
    @Input() viewableListIndex: number;
    defaultListIndex: number;
    editingIngredientIndex: number;
    editingListIndex: number;
    shoppingListForm: FormGroup;
    viewableListObject: { title: string, ingredients: NamedItem[], default: boolean };
    viewableListArray: number[];

    constructor(private store: Store<fromShoppingList.FeatureState>) { }

    ngOnInit() {

        this.store.select('shoppingLists').subscribe(state => {
            this.defaultListIndex = state.defaultListIndex;
            this.editingIngredientIndex = state.editedIngredientIndex;
            this.editingListIndex = state.editedListIndex;
            this.viewableListObject = state.shoppingLists[this.listIndex];
            this.viewableListArray = state.viewableListIndexes;
        });

        this.initForm();
    }

    onAddItem() {
        this.store.dispatch(new ShoppingListActions.AddIngredient({ listIndex: this.listIndex, item: new NamedItem('') }));
        this.store.dispatch(new ShoppingListActions.StartEditIngredient({ listIndex: this.listIndex, index: -1 }));
    }

    onAddNewList() {
        this.store.dispatch(new ShoppingListActions.CreateList());
        this.store.dispatch(new ShoppingListActions.AddViewableList(this.viewableListIndex));
    }

    onDeleteItem(index: number) {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient({ listIndex: this.listIndex, index: index }));
    }

    onDeleteList() {
        this.store.dispatch(new ShoppingListActions.DeleteList(this.listIndex));
    }

    onEditList() {
        this.store.dispatch(new ShoppingListActions.StartEditList(this.listIndex));
        this.initForm()
    }

    onMakeDefault() {
        this.store.dispatch(new ShoppingListActions.SwitchDefault(this.listIndex));
    }

    onSaveIngredient(newValue: string) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(new NamedItem(newValue)));
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onSaveList() {
        this.store.dispatch(new ShoppingListActions.UpdateList({ listIndex: this.listIndex, updatedList: this.shoppingListForm.value }))
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    onSingleIngredientSave(inputValue: string) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(new NamedItem(inputValue)));
        this.store.dispatch(new ShoppingListActions.StopEdit());
        this.initForm();
    }

    onViewableListClose() {
        this.store.dispatch(new ShoppingListActions.MinimizeViewableList(this.viewableListIndex));
    }

    private initForm() {
        let shoppingListTitle = '';
        let ingredientsArray = new FormArray([]);
        if (this.listIndex > -1) {
            this.store.select('shoppingLists')
                .pipe(take(1))
                .subscribe((state: fromShoppingList.State) => {
                    const shoppingList = state.shoppingLists[this.listIndex];
                    shoppingListTitle = shoppingList.title;

                    if (shoppingList['ingredients']) {
                        shoppingList['ingredients'].map(ingredient => {
                            ingredientsArray.push(new FormGroup({ name: new FormControl(ingredient.name, Validators.required) }));
                        });
                    }
                });
        }

        this.shoppingListForm = new FormGroup({
            'title': new FormControl(shoppingListTitle, Validators.required),
            'ingredients': ingredientsArray
        })
    }

}

