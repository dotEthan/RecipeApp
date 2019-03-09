import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as fromAuth from '../auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import * as fromRecipe from '../../recipes/store/recipes.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  toggleTestMode() {
    this.store.dispatch(new AuthActions.toggleTestMode());
  }
}
