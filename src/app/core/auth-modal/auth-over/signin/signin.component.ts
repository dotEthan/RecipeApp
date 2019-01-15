import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

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
  errorSub: Subscription;
  typeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) {
  }

  ngOnInit() {

    this.typeSub = this.authService.authType.subscribe(
      (type: string) => {
        this.thisType = type;
      }
    );

    this.errorSub = this.authService.errorMsg.subscribe(
      (msg: string) => {
        this.error = msg;
      }
    );
  }

  ngOnDestroy() {
    this.typeSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    (this.thisType === 'register') ? this.store.dispatch(new AuthActions.TrySignup({ username: email, password: password })) : this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));

  }

  onClick(type: string) {
    this.authService.authType.next(type);
  }
}
