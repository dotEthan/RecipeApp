
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    errorMsg = new BehaviorSubject('');
    modalOpen = new BehaviorSubject(false);
    authType = new BehaviorSubject('register');
    testMode = new BehaviorSubject(false);
    loggedIn = new BehaviorSubject(false);

    loginSuccess(userData: { token: string, uid: string }) {
        window.localStorage.setItem('token', userData.token);
        window.localStorage.setItem('uid', userData.uid);
        this.modalOpen.next(false);
        this.loggedIn.next(true);
    }
}