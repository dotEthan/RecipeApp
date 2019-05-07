
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as AuthActions from './store/auth.actions';
import { NamedItem } from '../../shared/namedItem.model';
import { Recipe } from 'src/app/recipes/recipe.model';

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
    // isRegistration = new BehaviorSubject(false);

    constructor(private store: Store<fromApp.AppState>,
        private router: Router, ) { }

    signinActions(userData: { token: string, uid: string }) {
        console.log('signing in', userData);
        window.localStorage.setItem('token', userData.token);
        window.localStorage.setItem('uid', userData.uid);
        this.modalOpen.next(false);
        this.loggedIn.next(true);
        this.store.dispatch(new AuthActions.Signin({ token: userData.token, uid: userData.uid }));
        this.checkIfRegistration();
    }

    checkIfRegistration() {
        let isRegistration: boolean
        this.store.select('auth').subscribe((state) => {
            isRegistration = state.registration;
        });
        if (isRegistration) {
            this.store.dispatch(new RecipeActions.StoreRecipes());
            this.store.dispatch(new ShoppingListActions.StoreShoppingLists());
            this.store.dispatch(new AuthActions.SetIsRegistration(false));
        } else {
            // console.log('signing in');
            this.store.dispatch(new RecipeActions.FetchRecipes());
            this.store.dispatch(new ShoppingListActions.FetchShoppingLists());
        }
    }

    logoutActions() {
        const emptyRecipe: Recipe[] = [{
            name: '',
            description: '',
            imagePath: '',
            ingredients: [{ title: '', item: [new NamedItem('')] }],
            directions: [{ title: '', item: [new NamedItem('')] }],
            url: '',
            keyword: '',
            tags: ['']
        }];
        const emptyShoppingList: {}[] = [{ title: '', ingredients: [new NamedItem('')], default: true }];

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