import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth-modal/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    onSave() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: Response) => {
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
}