
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, AsyncSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    errorMsg = new BehaviorSubject('');
    modalOpen = new Subject();
    authType = new BehaviorSubject('register');
}