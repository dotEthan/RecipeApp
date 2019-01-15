
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    errorMsg = new Subject();
    modalOpen = new Subject();
    authType = new BehaviorSubject('register');
}