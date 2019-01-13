import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app-reducer';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    authType = new Subject();
    errorMsg = new Subject();
    modalOpen = new Subject();

    constructor(private router: Router, private store: Store<fromApp.AppState>) { }
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                user => {
                    this.store.dispatch(new AuthActions.Signup());
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                    this.signinUser(email, password);
                    this.router.navigate(['/']);
                    this.modalOpen.next(false);
                }
            )
            .catch(error => this.errorMsg.next(error.code));
    }


    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                user => {
                    this.store.dispatch(new AuthActions.Signin());
                    this.router.navigate(['/']);
                    this.modalOpen.next(false);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                }
            ).catch(
                error => {
                    console.log(error);
                    this.errorMsg.next(error.code);
                }
            );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
    }
}