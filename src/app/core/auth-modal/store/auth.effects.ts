import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap, take, catchError } from 'rxjs/operators';
import { from, pipe, throwError, empty } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import * as fromApp from '../../../store/app-reducer'
import * as RecipeActions from '../../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../../shopping-list/store/shopping-list.actions';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignup = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNUP),
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }) => {
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
                    .pipe(
                        catchError((err) => {
                            this.authService.errorMsg.next(err.code);
                            return empty();
                        }));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('uid', firebase.auth().currentUser.uid);
                return [
                    {
                        type: AuthActions.SIGNUP
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }),
            tap(() => {
                this.store.dispatch(new RecipeActions.FetchRecipes());
                this.authService.modalOpen.next(false);
                this.authService.loggedIn.next(true);
            }));

    @Effect()
    authSignin = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignin) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }) => {
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
                    .pipe(
                        catchError((err) => {
                            this.authService.errorMsg.next(err.code);
                            return empty();
                        }));
            }),
            switchMap(() => {
                return from(firebase.auth().currentUser.getIdToken());
            }),
            mergeMap((token: string) => {
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('uid', firebase.auth().currentUser.uid);
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: token
                    }
                ];
            }),
            tap(() => {
                this.store.dispatch(new RecipeActions.FetchRecipes());
                this.authService.modalOpen.next(false);
                this.authService.loggedIn.next(true);
            }));
    // Using?
    @Effect()
    autoLogin = this.actions$
        .pipe(ofType(AuthActions.AUTO_LOGIN),
            mergeMap(() => {
                return [
                    {
                        type: AuthActions.SIGNIN
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: window.localStorage.getItem('token')
                    }
                ]
            }),
            tap(() => {
                this.store.dispatch(new RecipeActions.FetchRecipes());
                this.authService.loggedIn.next(true);
            }));

    @Effect({ dispatch: false }) // No final state changes
    authLogout = this.actions$
        .pipe(ofType(AuthActions.LOGOUT),
            tap(() => {
                const emptyRecipe: [] = [];
                const emptyShoppingList: {}[] = [];

                window.localStorage.removeItem('token');
                window.localStorage.removeItem('uid');
                window.localStorage.removeItem('testMode');
                this.authService.loggedIn.next(false);
                this.store.dispatch(new RecipeActions.SetRecipes(emptyRecipe));
                this.store.dispatch(new ShoppingListActions.SetShoppingLists(emptyShoppingList));
                this.router.navigate(['/']);
            }));

    constructor(private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private store: Store<fromApp.AppState>) {

    }
}