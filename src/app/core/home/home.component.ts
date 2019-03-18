import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app-reducer';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as fromAuth from '../auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import { Recipe } from '../../recipes/recipe.model';
import { AuthService } from '../auth-modal/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  testMode: boolean;
  loggedIn: boolean;

  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(isloggedIn => {
      this.loggedIn = isloggedIn;
    });
    this.authService.testMode.subscribe(resp => this.testMode = resp);
  }

  toggleTestMode() {

    if (!this.testMode) {
      window.localStorage.setItem('testMode', 'true');
      this.authService.testMode.next(true);
      this.store.dispatch(new RecipeActions.SetTestRecipes());
    } else {
      window.localStorage.removeItem('testMode');
      this.authService.testMode.next(false);
      this.store.dispatch(new AuthActions.Logout());
    }
  }
}
