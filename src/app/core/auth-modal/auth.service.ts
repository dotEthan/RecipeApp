
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

}