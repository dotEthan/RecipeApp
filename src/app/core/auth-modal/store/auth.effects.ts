import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { from, pipe, throwError, empty, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import * as fromApp from '../../../store/app-reducer'
import * as RecipeActions from '../../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../../shopping-list/store/shopping-list.actions';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>) {

    }

    @Effect({ dispatch: false })
    authSignup = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNUP),
            map((action: AuthActions.TrySignup) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }) => {
                // console.log('auth signup actions', authData);
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
                    .catch((err) => {
                        this.authService.errorMsg.next(err.code);
                        return empty();
                    }));
            }),
            map(() => {
                new AuthActions.SetIsRegistration(true);
            })
        );

    @Effect({ dispatch: false })
    authSignin = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignin) => {
                return action.payload;
            }),
            switchMap((authData: { username: string, password: string }, index: number) => {
                return from(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(() => {
                        firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
                            .catch((err) => {
                                this.authService.errorMsg.next(err);
                            });
                    }));
            }));

    // Using?
    // @Effect()
    // autoLogin = this.actions$
    //     .pipe(ofType(AuthActions.AUTO_LOGIN),
    //         mergeMap(() => {
    //             const token = window.localStorage.getItem('token');
    //             const uid = window.localStorage.getItem('uid');
    //             this.authService.signinActions({ token: token, uid: uid });
    //             return [
    //                 new AuthActions.Signin({ token: token, uid: uid }),
    //                 new RecipeActions.FetchRecipes,
    //                 new ShoppingListActions.FetchShoppingLists
    //             ]
    //         }));

    @Effect({ dispatch: false }) // No final state changes
    authLogout = this.actions$
        .pipe(ofType(AuthActions.LOGOUT),
            tap(() => {
                firebase.auth().signOut().then(() => { }).catch((err) => console.log("sign out error: ", err));
            }));
}