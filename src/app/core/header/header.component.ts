import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth-modal/auth.service';
import * as fromApp from '../../store/app-reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';
import * as AuthActions from '../auth-modal/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    @ViewChild('headermenu') headerMenu: ElementRef;
    @ViewChild('beyondburger') beyondBurger: ElementRef;
    authState: Observable<fromAuth.State>;
    testMode: boolean;

    constructor(private authService: AuthService,
        private store: Store<fromApp.AppState>,
        private router: Router) {

    }

    ngOnInit() {
        this.authState = this.store.select('auth');
        this.authService.testMode.subscribe(resp => this.testMode = resp);

    }

    onSave() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
        this.store.dispatch(new ShoppingListActions.StoreShoppingLists());
    }

    onFetch() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onModalOpen(type: string) {
        this.authService.authType.next(type);
        this.authService.modalOpen.next(true);
        this.authService.errorMsg.next({ code: '', message: '' });
    }

    onPageChange() {
        this.authService.modalOpen.next(false);
        if (this.headerMenu.nativeElement.classList.contains('active')) this.onMobileMenuClick();
    }

    authLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    onMobileMenuClick() {
        this.headerMenu.nativeElement.classList.toggle('active');
        this.beyondBurger.nativeElement.children[0].classList.toggle('active');
        const childLength = this.beyondBurger.nativeElement.children[0].children.length;
        for (let i = 0; i < childLength; i++) {
            this.beyondBurger.nativeElement.children[0].children[i].classList.remove('stopped');
        }
    }

    testModeOff() {
        // this.store.dispatch(new ShoppingListActions.StoreShoppingLists());
        this.store.dispatch(new AuthActions.Logout());
        this.authService.testMode.next(false);
        this.router.navigate(['']);
    }
}