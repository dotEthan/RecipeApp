
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as AuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    errorMsg = new BehaviorSubject({ code: '', message: '' });
    modalOpen = new BehaviorSubject(false);
    authType = new BehaviorSubject('register');
    testMode = new BehaviorSubject(false);
    loggedIn = new BehaviorSubject(false);
    authFormReset = new BehaviorSubject(false);

    constructor(private store: Store<fromApp.AppState>,
        private router: Router, ) { }

    signinActions(userData: { token: string, uid: string }) {
        console.log('signing in', userData);
        window.localStorage.setItem('token', userData.token);
        window.localStorage.setItem('uid', userData.uid);
        this.modalOpen.next(false);
        this.loggedIn.next(true);
        this.store.dispatch(new AuthActions.Signin({ token: userData.token, uid: userData.uid }));
        this.store.dispatch(new RecipeActions.FetchRecipes());
        this.store.dispatch(new ShoppingListActions.FetchShoppingLists());
    }

    logoutActions() {
        const emptyRecipe: [] = [];
        const emptyShoppingList: {}[] = [];

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('uid');
        window.localStorage.removeItem('testMode');
        this.loggedIn.next(false);
        this.testMode.next(false);
        this.store.dispatch(new RecipeActions.SetRecipes(emptyRecipe));
        this.store.dispatch(new ShoppingListActions.SetShoppingLists(emptyShoppingList));
        this.router.navigate(['/']);
    }
}