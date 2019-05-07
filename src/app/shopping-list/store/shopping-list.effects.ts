import { Effect, Actions, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, mergeMap, withLatestFrom, catchError } from 'rxjs/operators';

import * as fromShoppingList from './shopping-list.reducers';
import { NamedItem } from '../../shared/namedItem.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListService } from '../shopping-list.service';
import { EmptyError, empty } from 'rxjs';

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
                console.log('signing in');
                let uid = window.localStorage.getItem('uid');
                return this.httpClient.get<{ title: string, ingredients: NamedItem[], default: boolean }[]>('https://angular-testing-a4072.firebaseio.com/' + uid + '/shoppinglists.json')
                    .pipe(catchError((error) => {
                        console.log('error Fetching: ', error);
                        return empty();
                    }));
            }),
            withLatestFrom(this.store.select('shoppingLists')),
            mergeMap(([shoppingLists, state]) => {
                return [
                    new ShoppingListActions.UpdateViewableList(),
                    new ShoppingListActions.SetShoppingLists(shoppingLists)
                ]
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