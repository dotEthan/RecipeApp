import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    token: string;
    authType = new Subject();
    errorMsg = new Subject();
    modalOpen = new Subject();

    constructor(private router: Router) { }
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response => {
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
                response => {
                    this.router.navigate(['/']);
                    this.modalOpen.next(false);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token) => this.token = token
                        )
                }
            ).catch(
                error => {
                    this.errorMsg.next(error.code);
                }
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token) => this.token = token
            );
        return this.token;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    isAuthenticated() {
        return this.token != null;
    }
}