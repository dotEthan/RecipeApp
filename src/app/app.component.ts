import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/animations';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate } from '@angular/animations';

import * as fromApp from './store/app-reducer';
import * as AuthActions from './core/auth-modal/store/auth.actions';
import * as RecipeActions from './recipes/store/recipes.actions';
import { AuthService } from './core/auth-modal/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    slideInAnimation,
    trigger('modalOpen', [
      state('false', style({
        transform: 'scale(0)'
      })),
      state('true', style({
        transform: 'scale(1)'
      })),
      transition('true <=> false', animate(200))
    ])
  ],
})
export class AppComponent implements OnInit {
  modalOpen: boolean;

  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.modalOpen.subscribe(shouldOpen => {
      this.modalOpen = shouldOpen;
    })

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDqrQ1nMg4RIeVIf1yH_10Tn1D1SMFbUm0",
        authDomain: "angular-testing-a4072.firebaseapp.com"
      });
    }

    if (window.localStorage.getItem('token')) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    if (window.localStorage.getItem('testMode') === 'true') {
      // console.log('recipes action load tests');
      this.store.dispatch(new RecipeActions.SetTestRecipes());
      this.authService.testMode.next(true);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
