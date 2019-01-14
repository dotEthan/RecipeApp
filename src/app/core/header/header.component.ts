import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth-modal/auth.service';
import * as fromApp from '../../store/app-reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipes.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSave() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetch() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onClick(type: string) {
        this.authService.authType.next(type);
    }

    onSelect() {
        this.authService.modalOpen.next(false);
    }

    authLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}