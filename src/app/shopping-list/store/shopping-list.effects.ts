import { Effect, Actions, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';

import * as fromShoppingList from './shopping-list.reducers';
import { NamedItem } from '../../shared/namedItem.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';

@Injectable()
export class ShoppingListEffects {

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromShoppingList.FeatureState>,
        private shoppingListService: ShoppingListService) { }

    @Effect()
    shoppingListFetch = this.actions$
        .pipe(ofType(ShoppingListActions.FETCH_SHOPPING_LISTS),
            switchMap((action: ShoppingListActions.FetchShoppingLists) => {
                let uid = window.localStorage.getItem('uid');
                return this.httpClient.get<{ title: string, ingredients: NamedItem[], default: boolean }[]>('https://angular-testing-a4072.firebaseio.com/' + uid + '/shoppinglists.json');
            }),
            map((shoppingLists) => {
                const newVisibleShoppingLists = [];
                const arrayLength = (shoppingLists.length >= 2) ? 2 : shoppingLists.length;

                for (let i = 0; i <= arrayLength; i++) {
                    newVisibleShoppingLists.push(i);
                }
                this.shoppingListService.viewableListsIndexArray.next(newVisibleShoppingLists);
                return new ShoppingListActions.SetShoppingLists(shoppingLists);
            }
            ));

    @Effect({ dispatch: false })
    shoppingListStore = this.actions$
        .pipe(ofType(ShoppingListActions.STORE_SHOPPING_LISTS),
            withLatestFrom(this.store.select('shoppingLists')),
            switchMap(([action, state]) => {
                let uid = firebase.auth().currentUser.uid;
                return this.httpClient.put('https://angular-testing-a4072.firebaseio.com/' + uid + '/shoppinglists.json', state.shoppingLists);
            }));

}