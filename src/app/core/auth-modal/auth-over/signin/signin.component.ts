import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../../auth.service';
import * as fromApp from '../../../../store/app-reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit, OnDestroy {
  thisType: string;
  error: string;
  typeSub: Subscription;
  errSub$: Observable<any>;

  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) {
    this.errSub$ = authService.errorMsg;
  }

  //Grab #f form reference, use AuthService to reset at a variety of points. 
  ngOnInit() {
    console.log('now');
    this.typeSub = this.authService.authType.subscribe(
      (type: string) => {
        this.thisType = type;
      }
    );

    this.errSub$.subscribe(
      (msg: string) => {
        switch (msg) {
          case '':
            this.error = '';
            break;
          case 'auth/user-not-found':
            this.error = 'User Email Not Found';
            break;
          case 'auth/wrong-password':
            this.error = 'Incorrect Password';
            break;
          case 'auth/invalid-email':
            this.error = 'Please Enter a Valid Email Address';
            break;
          case 'auth/too-many-requests':
            this.error = 'Too Many Attempts. Please Wait ten (10) Seconds Before Trying Again.';
            break;
          case 'auth/weak-password':
            this.error = 'Passwords must be at least six (6) characters';
            break;
          case 'auth/email-already-in-use':
            this.error = 'Email already in use, use another or sign in below';
            break;
          case 'auth/network-request-failed':
            this.error = 'Network Request Failed. Connection not possible at this time.';
            break;
          default:
            this.error = 'Unknown Error. Code: ' + msg;
        }
      }
    );
  }

  ngOnDestroy() {

    this.typeSub.unsubscribe();
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    (this.thisType === 'register') ? this.store.dispatch(new AuthActions.TrySignup({ username: email, password: password })) : this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));
  }

  onSwitchTypeHandler(type: string) {
    this.authService.authType.next(type);
  }
}
