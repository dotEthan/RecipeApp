import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth-modal/auth.service';
import * as fromApp from '../../store/app-reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import * as fromRecipe from '../../recipes/store/recipes.reducer';
import * as AuthActions from '../auth-modal/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipes.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    @ViewChild('headermenu') headermenu: ElementRef;
    authState: Observable<fromAuth.State>;
    testMode: Observable<fromRecipe.State>;

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>,
        private router: Router) {

    }

    ngOnInit() {
        this.authState = this.store.select('auth');

    }

    onSave() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
    }

    onFetch() {
        console.log('header Go!');
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onClick(type: string) {
        this.authService.authType.next(type);
        this.authService.modalOpen.next('true');
    }

    onSelect() {
        this.authService.modalOpen.next('false');
    }

    authLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    menuClick(e) {
        console.log('current', e.currentTarget.children);
        this.headermenu.nativeElement.classList.toggle('active');
        e.currentTarget.children[0].classList.toggle('active');
        const childLength = e.currentTarget.children[0].children.length;
        for (let i = 0; i < childLength; i++) {
            e.currentTarget.children[0].children[i].classList.remove('stopped');
        }
    }

    testModeOff() {
        console.log('off sesame');
        this.store.dispatch(new AuthActions.Logout());
        this.store.dispatch(new AuthActions.toggleTestMode());
        this.router.navigate(['']);
    }
}