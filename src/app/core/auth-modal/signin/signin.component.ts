import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';

import * as fromApp from '../../../store/app-reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) { }
  @Input() authType: string;
  @Input() errorMsg: string;


  ngOnInit() { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    (this.authType === 'register') ? this.store.dispatch(new AuthActions.TrySignup({ username: email, password: password })) : this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));

  }

  onClick(type: string) {
    this.authService.authType.next(type);
  }
}
