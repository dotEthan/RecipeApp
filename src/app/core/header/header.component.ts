import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../auth-modal/auth.service';
import * as fromApp from '../../store/app-reducer';
import * as fromAuth from '../../core/auth-modal/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSave() {
        this.dataStorageService.storeRecipes()
            .subscribe((response) => {
                console.log(response);
            });
    }

    onFetch() {
        this.dataStorageService.fetchRecipes();
    }

    onClick(type: string) {
        this.authService.authType.next(type);
    }

    onSelect() {
        this.authService.modalOpen.next(false);
    }

    authLogout() {
        this.authService.logout();
    }
}