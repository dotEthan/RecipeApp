
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    defaultListId = new BehaviorSubject(0);
    viewableListsIndexArray = new BehaviorSubject([0]);
}