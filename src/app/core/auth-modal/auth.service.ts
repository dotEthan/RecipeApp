
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    authType = new Subject();
    errorMsg = new Subject();
    modalOpen = new Subject();
}