import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/animations';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as fromApp from './store/app-reducer';
import * as AuthActions from './core/auth-modal/store/auth.actions';
import * as RecipeActions from './recipes/store/recipes.actions';
import * as ShoppingListActions from './shopping-list/store/shopping-list.actions';
import { AuthService } from './core/auth-modal/auth.service';
import { WindowResizeService } from './shared/window-resize.service';

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
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  modalOpen: boolean;

  constructor(private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private windowResizeService: WindowResizeService) { }

  ngOnInit() {
    this.store.dispatch(new ShoppingListActions.UpdateScreenRes(window.innerWidth));

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.store.dispatch(new ShoppingListActions.UpdateScreenRes(event.target['innerWidth']));
      });

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDqrQ1nMg4RIeVIf1yH_10Tn1D1SMFbUm0",
        authDomain: "angular-testing-a4072.firebaseapp.com"
      });
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log("state changed");
      if (user) {
        console.log('state: ', user);
        (localStorage.getItem('testMode')) ? this.authService.testMode.next(true) : this.authService.testMode.next(false);
        const userToken = await firebase.auth().currentUser.getIdToken();
        this.authService.signinActions({ token: userToken, uid: user.uid });
      } else {
        this.authService.logoutActions();
      }
    });

    this.authService.modalOpen.subscribe(shouldOpen => {
      this.modalOpen = shouldOpen;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
